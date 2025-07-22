import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IConsultantData, RequstedData } from '../../../../../../Core/Interfaces/consultant';
import { ConsultationServ } from '../../../../../../Core/Services/ConcloutionMangement/consultation-serv';
import { TostarServ } from '../../../../../../Shared/tostar-serv';
import { CommonModule } from '@angular/common';

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
}