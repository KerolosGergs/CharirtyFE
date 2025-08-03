import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { Advicereques, GetRequests } from '../../../../../../../../Core/Services/advicereques';
import { AuthServ } from '../../../../../../../../Auth/Services/auth-serv';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCalendar, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './appointments.html',
  styleUrls: ['./appointments.scss'],
  providers: [DatePipe],
})
export class Appointments implements OnInit {
  @Input() advisorId!: number;
  private adviceService = inject(Advicereques);
  private authServ = inject(AuthServ);

  adviceRequests: (GetRequests & { showActions?: boolean })[] = [];
  filteredRequests: (GetRequests & { showActions?: boolean })[] = [];
  paginatedUpcoming: (GetRequests & { showActions?: boolean })[] = [];

  // For calendar
  calendarDate: Date | null = null; // bound to mat-calendar
  selectedDate: string = ''; // yyyy-MM-dd used in filtering

  // Filters
  searchTerm: string = '';
  selectedType: string = '';
  // advisorId!: number;

  // Pagination (only for upcoming)
  pageSize = 5;
  currentPage = 1;

  constructor() {}

  ngOnInit(): void {
    // this.advisorId = this.authServ.getId();
    // if (!this.advisorId) {
    //   console.error('advisorId not found');
    //   return;
    // }
    this.fetchAdvisorRequests(this.advisorId);
  }

  fetchAdvisorRequests(advisorId: number): void {
    this.adviceService.getRequestsForAdvisor(advisorId).subscribe({
      next: (res) => {
        this.adviceRequests = (res?.data || []).map(r => ({ ...r, showActions: false }));
        this.applyFilters();
      },
      error: (err) => {
        console.error('Failed to fetch advisor requests:', err);
      }
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
        error: (err) => {
          console.error('فشل في حذف الاستشارة:', err);
        }
      });
    }
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase().trim();

    this.filteredRequests = this.adviceRequests.filter(r => {
      const matchesNote =
        (r.notes?.toLowerCase().includes(term) || false) ||
        (r.userFullName?.toLowerCase().includes(term) || false);

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
    this.updateUpcomingPagination();
  }

  formatDateToString(d: Date): string {
    const yyyy = d.getFullYear();
    const mm = `${d.getMonth() + 1}`.padStart(2, '0');
    const dd = `${d.getDate()}`.padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  isPastAppointment(r: GetRequests): boolean {
    if (!r.date) return false;
    const today = new Date();
    const target = new Date(r.date);
    // strip time by comparing yyyy-mm-dd
    const todayStr = this.formatDateToString(today);
    const targetStr = this.formatDateToString(target);
    return targetStr < todayStr;
  }

  get pastAppointments(): (GetRequests & { showActions?: boolean })[] {
    return this.filteredRequests.filter(r => this.isPastAppointment(r));
  }

  get upcomingAppointments(): (GetRequests & { showActions?: boolean })[] {
    return this.filteredRequests.filter(r => !this.isPastAppointment(r));
  }

  updateUpcomingPagination(): void {
    const upcoming = this.upcomingAppointments;
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedUpcoming = upcoming.slice(start, end);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updateUpcomingPagination();
  }

  getPageNumbers(): number[] {
    return Array.from({ length: Math.ceil(this.upcomingAppointments.length / this.pageSize) }, (_, i) => i + 1);
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onTypeChange(): void {
    this.applyFilters();
  }

  onDateChange(dateOrEvent?: any): void {
    if (dateOrEvent instanceof Date) {
      this.calendarDate = dateOrEvent;
      this.selectedDate = this.formatDateToString(dateOrEvent);
    } else if (dateOrEvent && dateOrEvent.target) {
      this.selectedDate = dateOrEvent.target.value;
      this.calendarDate = this.selectedDate ? new Date(this.selectedDate) : null;
    }
    this.applyFilters();
  }

  // highlight days that have appointments
  dateClass: MatCalendarCellClassFunction<Date> = (date: Date) => {
    const dateStr = this.formatDateToString(date);
    const has = this.adviceRequests.some(r => r.date?.slice(0, 10) === dateStr);
    return has ? 'has-appointment' : '';
  };

  filterDates = (date: Date | null): boolean => {
    return true;
  };
}
