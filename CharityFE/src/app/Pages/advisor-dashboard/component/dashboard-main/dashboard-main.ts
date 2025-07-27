import { AuthServ } from './../../../../Auth/Services/auth-serv';
import { Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule, NgClass, NgStyle, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Advicereques, GetRequests, IAdviceRequestDTO } from '../../../../Core/Services/advicereques';

@Component({
  selector: 'app-dashboard-main',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule],
  templateUrl: './dashboard-main.html',
  styleUrl: './dashboard-main.scss'
})
export class DashboardMain implements OnInit {private authServ = inject(AuthServ);
 adviceRequests: (GetRequests & { showActions?: boolean })[] = [];
  filteredRequests: (GetRequests & { showActions?: boolean })[] = [];

  searchTerm: string = '';
  selectedType: string = '';
  selectedDate: string = '';
  advisorId!: number;

  // Pagination
  pageSize = 5;
  currentPage = 1;
  paginatedRequests: (GetRequests & { showActions?: boolean })[] = [];

  cards = [
    { name: 'عدد الاستشارات', number: '600,532', icon: 'bi-mic', bgColor: '#FFF5EB' },
    { name: 'عدد الخدمات', number: '600,532', icon: 'bi-grid', bgColor: '#EDF8ED' },
    { name: 'عدد المستشارين', number: '600,532', icon: 'bi-people', bgColor: '#EDF4FA' }
  ];
  AuthServ = inject(AuthServ);
  constructor(
    private adviceService: Advicereques,

  
  ) {}

  ngOnInit(): void {
    this.advisorId = this.authServ.getId();
    if (!this.advisorId) {
      console.error('advisorId not found');
      return;
    }
    this.fetchAdvisorRequests(this.advisorId);
  }

  fetchAdvisorRequests(advisorId: number): void {
    this.adviceService.getRequestsForAdvisor(advisorId).subscribe({
      next: (res) => {
        this.adviceRequests = (res?.data || []).map(r => ({ ...r, showActions: false }));
        this.applyFilters();
      },
      error: (err) => console.error('Failed to fetch advisor requests:', err)
    });
  }

  confirmRequest(requestId: number): void {
    if (confirm('هل أنت متأكد من تأكيد هذه الاستشارة؟')) {
      this.adviceService.confirmRequest(requestId).subscribe({
        next: () => {
          this.fetchAdvisorRequests(this.advisorId);
        },
        error: (err) => {
          console.error('فشل في تأكيد الاستشارة:', err);
          alert('حدث خطأ أثناء تأكيد الاستشارة.');
        }
      });
    }
  }

  deleteRequest(requestId: number): void {
    if (confirm('هل أنت متأكد من حذف هذه الاستشارة؟')) {
      this.adviceService.cancelRequest(requestId).subscribe({
        next: () => {
          this.adviceRequests = this.adviceRequests.filter(r => r.id !== requestId);
          this.applyFilters();
        },
        error: (err) => console.error('فشل في حذف الاستشارة:', err)
      });
    }
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase().trim();

    this.filteredRequests = this.adviceRequests.filter(r => {
      const matchesNote =
        r.notes?.toLowerCase().includes(term) ||
        r.userFullName?.toLowerCase().includes(term);

      const matchesType =
        this.selectedType !== ''
          ? (this.selectedType === '0' && r.consultationId === 0) ||
            (this.selectedType === '1' && r.consultationId === 1)
          : true;

      const matchesDate = this.selectedDate
        ? r.date?.slice(0, 10) === this.selectedDate
        : true;

      return matchesNote && matchesType && matchesDate;
    });

    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedRequests = this.filteredRequests.slice(start, end);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  getPageNumbers(): number[] {
    return Array.from({ length: Math.ceil(this.filteredRequests.length / this.pageSize) }, (_, i) => i + 1);
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onTypeChange(): void {
    this.applyFilters();
  }

  onDateChange(): void {
    this.applyFilters();
  }
}