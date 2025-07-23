import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpRequest } from '../../models/help-request.model';
import { HelpRequestService } from '../../services/help-request.service';
import {  FormsModule } from '@angular/forms';
import { TostarServ } from '../../../../../../Shared/tostar-serv';

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
    private tostarServ: TostarServ
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
}