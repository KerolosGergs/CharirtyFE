import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IConsultantData, RequstedData } from '../../../../../../Core/Interfaces/consultant';
import { ConsultationServ } from '../../../../../../Core/Services/ConcloutionMangement/consultation-serv';
import { TostarServ } from '../../../../../../Shared/tostar-serv';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AmiriFontBase64 } from '../../../../../../Core/Services/textEncode/AmiriFontBase64';

enum ConsultationType {
  Online = 0,
  InPerson = 1,
  Both = 2,
}

interface FilterOptions {
  searchTerm: string;
  typeFilter: 'all' | number;
  statusFilter: 'all' | string;
}

interface PaginationInfo {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

@Component({
  selector: 'app-requested-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './requested-component.html',
  styleUrl: './requested-component.scss'
})
export class RequestedComponent implements OnInit {
  private concloutionServ = inject(ConsultationServ);
  private tostarServ = inject(TostarServ);

  appointments: RequstedData[] = [];
  filteredAppointments: RequstedData[] = [];
  loading = false;

  filter: FilterOptions = {
    searchTerm: '',
    typeFilter: 'all',
    statusFilter: 'all'
  };

  pagination: PaginationInfo = {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 0,
    totalPages: 0
  };
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    this.concloutionServ.getAllRequests().subscribe({
      next: (res) => {
        if (res.success) {
          this.appointments = res.data.map((item: RequstedData) => ({
            ...item
          }));
          this.applyFilters();
          this.loading = false;
        }
      },
      error: (error) => {
        // this.tostarServ.showError('فشل في تحميل المواعيد');
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.appointments];

    // Search filter
    if (this.filter.searchTerm) {
      const searchTerm = this.filter.searchTerm.toLowerCase();
      filtered = filtered.filter(app =>
        (app.userName?.toLowerCase().includes(searchTerm) ||
         app.advisorName?.toLowerCase().includes(searchTerm) ||
         app.consultationName?.toLowerCase().includes(searchTerm) ||
         app.title?.toLowerCase().includes(searchTerm) ||
         app.description?.toLowerCase().includes(searchTerm))
      );
    }

    // Type filter
    if (this.filter.typeFilter !== 'all') {
      filtered = filtered.filter(app => app.consultationType === this.filter.typeFilter);
    }

    // Status filter
    if (this.filter.statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status?.toLowerCase() === this.filter.statusFilter.toLowerCase());
    }

    this.filteredAppointments = filtered;
    this.updatePagination();
  }

  updatePagination(): void {
    this.pagination.totalItems = this.filteredAppointments.length;
    this.pagination.totalPages = Math.ceil(this.pagination.totalItems / this.pagination.itemsPerPage);

    if (this.pagination.currentPage > this.pagination.totalPages) {
      this.pagination.currentPage = 1;
    }
  }

  getPaginatedAppointments(): RequstedData[] {
    const startIndex = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
    const endIndex = startIndex + this.pagination.itemsPerPage;
    return this.filteredAppointments.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.pagination.totalPages) {
      this.pagination.currentPage = page;
    }
  }

  onFilterChange(): void {
    this.pagination.currentPage = 1;
    this.applyFilters();
  }

  viewAppointment(appointment: RequstedData): void {
    this.tostarServ.showInfo(`عرض تفاصيل الموعد لـ ${appointment.userName}`);
  }

  exportData(): void {
    this.tostarServ.showSuccess('تم تصدير المواعيد بنجاح (تجريبي)');
  }

  getTypeLabel(type: number): string {
    switch (type) {
      case ConsultationType.Online: return 'عن بُعد';
      case ConsultationType.InPerson: return 'حضوري';
      case ConsultationType.Both: return 'النوعين';
      default: return 'غير معروف';
    }
  }

  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'pending': return 'badge bg-warning text-dark';
      case 'completed': return 'badge bg-success';
      case 'rejected': return 'badge bg-danger';
      case 'inprogress': return 'badge bg-info text-dark';
      default: return 'badge bg-secondary';
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.pagination.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
  exportToAppointmentsPdf(): void {
  if (!isPlatformBrowser(this.platformId)) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  // Register Amiri font for Arabic
  doc.addFileToVFS('Amiri-Regular.ttf', AmiriFontBase64);
  doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
  doc.setFont('Amiri');
  doc.setFontSize(14);

  // Format date helper
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, '0')}/${
      (date.getMonth() + 1).toString().padStart(2, '0')
    }/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  // Create body from paginated appointment data
  const body = this.getPaginatedAppointments()?.map((item: any) => [
    formatDate(item.requestDate),
    item.priority,
    item.status,
    item.description,
    this.getTypeLabel(item.consultationType),
    item.advisorName,
    item.userName,
  ]) ?? [];

  // Generate PDF table
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
      5: { halign: 'right' },
      6: { halign: 'right' },
    },
    margin: { top: 60 },
    didDrawPage: () => {
      doc.setFont('Amiri');
      doc.setFontSize(16);
      doc.text('قائمة المواعيد', doc.internal.pageSize.getWidth() - 40, 30, {
        align: 'right',
      });
    },
  });

  doc.save('قائمة-المواعيد.pdf');
}

}