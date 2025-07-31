import { Component, Inject, NgModule, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HelpRequest } from '../../models/help-request.model';
import { HelpRequestService } from '../../services/help-request.service';
import {  FormsModule } from '@angular/forms';
import { TostarServ } from '../../../../../../Shared/tostar-serv';
import { AmiriFontBase64 } from '../../../../../../Core/Services/textEncode/AmiriFontBase64';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-help-requests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './help-requests.html',
  styleUrl: './help-requests.scss'
})
export class HelpRequestsComponent implements OnInit {
  helpRequests: HelpRequest[] = [];
  filteredRequests: HelpRequest[] = [];
  paginatedRequests: HelpRequest[] = [];

  searchTerm: string = '';
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private helpRequestService: HelpRequestService,
    private tostarServ: TostarServ,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadHelpRequests();
  }

  loadHelpRequests() {
    this.helpRequestService.getHelpRequests().subscribe({
      next: (requests) => {
        this.helpRequests = requests;
        this.applyFilters();
      },
      error: () => {
        // this.tostarServ.showError('فشل تحميل الطلبات');
      }
    });
  }

  onSearchChange() {
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters() {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredRequests = this.helpRequests.filter(req =>
      req.name.toLowerCase().includes(term) ||
      req.helpTypeName.toLowerCase().includes(term)
    );
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredRequests.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedRequests = this.filteredRequests.slice(start, end);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getStartIndex(): number {
    return this.filteredRequests.length === 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredRequests.length);
  }

  deleteRequest(id: number): void {
    if (confirm('هل أنت متأكد أنك تريد حذف هذا الطلب؟')) {
      this.helpRequestService.deleteHelpRequest(id).subscribe({
        next: () => {
          this.helpRequests = this.helpRequests.filter(r => r.id !== id);
          this.applyFilters();
          this.tostarServ.showSuccess('تم حذف الطلب بنجاح');
        },
        error: () => {
          this.tostarServ.showError('حدث خطأ أثناء حذف الطلب');
        }
      });
    }
  }
  exportToHelpRequestsPdf(): void {
  if (!isPlatformBrowser(this.platformId)) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  // Use Amiri font for full Arabic support
  doc.addFileToVFS('Amiri-Regular.ttf', AmiriFontBase64);
  doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
  doc.setFont('Amiri');
  doc.setFontSize(14);

  // Format date in Arabic format
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, '0')}/${
      (date.getMonth() + 1).toString().padStart(2, '0')
    }/${date.getFullYear()}`;
  };

  // Build the body without a header row
  const body = this.paginatedRequests?.map((request) => [
    request.helpTypeName,
    request.phoneNumber,
    request.email,
    `${request.name}`,
    
  ]) ?? [];

  autoTable(doc, {
    body,
    styles: {
      font: 'Amiri',
      fontSize: 12,
      halign: 'right',
    },
    columnStyles: {
      0: { halign: 'right' },
      1: { halign: 'right' },
      2: { halign: 'right' },
      3: { halign: 'right' },
      4: { halign: 'right' },
    },
    margin: { top: 60 },
    didDrawPage: () => {
      doc.setFont('Amiri');
      doc.setFontSize(16);
      doc.text('قائمة طلبات المساعدة', doc.internal.pageSize.getWidth() - 40, 30, {
        align: 'right',
      });
    },
  });

  doc.save('قائمة-طلبات-المساعدة.pdf');
}

}