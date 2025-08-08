import { Component, OnInit, inject, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  MatCalendar,
  MatCalendarCellClassFunction,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { Advicereques, GetRequests } from '../../../../../../../../Core/Services/advicereques';
import { AuthServ } from '../../../../../../../../Auth/Services/auth-serv';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCalendar,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './appointments.html',
  styleUrls: ['./appointments.scss'],
  providers: [DatePipe],
})
export class Appointments implements OnInit, AfterViewInit {
  private adviceService = inject(Advicereques);
  private authServ = inject(AuthServ);
  private _router = inject(ActivatedRoute);

  @ViewChild(MatCalendar) calendarComponent!: MatCalendar<Date>;

  adviceRequests: (GetRequests & { showActions?: boolean })[] = [];
  filteredRequests: (GetRequests & { showActions?: boolean })[] = [];
  paginatedUpcoming: (GetRequests & { showActions?: boolean })[] = [];

  // For calendar
  calendarDate: Date | null = null; // bound to mat-calendar
  selectedDate: string = ''; // yyyy-MM-dd used in filtering
  showCalendar = false; // toggle to rebuild calendar after loading data

  // Filters
  searchTerm: string = '';
  selectedType: string = '';
  advisorId!: number;

  // Pagination (only for upcoming)
  pageSize = 5;
  currentPage = 1;

  constructor() {}

  ngOnInit(): void {
    this.getparam();
  }

  ngAfterViewInit(): void {
    // no-op; calendar toggled when data arrives
  }

  getparam() {
    this._router.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        const id = +idParam;
        this.advisorId = id;
        this.fetchAdvisorRequests(id);
      } else {
        console.error('Invalid advisor ID in route');
      }
    });
  }

  fetchAdvisorRequests(advisorId: number): void {
    this.adviceService.getRequestsForAdvisor(advisorId).subscribe({
      next: (res) => {
        this.adviceRequests = (res?.data || []).map((r) => ({
          ...r,
          showActions: false,
        }));
        this.applyFilters();

        // Force re-creation of calendar so filters/classes are fresh
        this.showCalendar = false;
        setTimeout(() => {
          // auto-select first available date if none selected
          if (!this.selectedDate) {
            const anyDateStr = this.adviceRequests.find((r) => r.date)?.date;
            if (anyDateStr) {
              const d = new Date(anyDateStr);
              this.calendarDate = d;
              this.selectedDate = this.formatDateToString(d);
              this.applyFilters();
            }
          }

          this.showCalendar = true;

          // small timeout to let calendar initialize, then nudge its activeDate to refresh internal view
          setTimeout(() => {
            if (this.calendarComponent) {
              this.calendarComponent.activeDate = new Date(this.calendarComponent.activeDate);
            }
          }, 0);
        }, 0);
      },
      error: (err) => {
        console.error('Failed to fetch advisor requests:', err);
      },
    });
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase().trim();

    this.filteredRequests = this.adviceRequests.filter((r) => {
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

    if (
      this.selectedDate &&
      !this.filteredRequests.some((r) => r.date?.slice(0, 10) === this.selectedDate)
    ) {
      this.calendarDate = null;
      this.selectedDate = '';
    }

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
    const todayStr = this.formatDateToString(today);
    const targetStr = this.formatDateToString(target);
    return targetStr < todayStr;
  }

  get pastAppointments(): (GetRequests & { showActions?: boolean })[] {
    return this.filteredRequests.filter((r) => this.isPastAppointment(r));
  }

  get upcomingAppointments(): (GetRequests & { showActions?: boolean })[] {
    return this.filteredRequests.filter((r) => !this.isPastAppointment(r));
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
    const total = Math.ceil(this.upcomingAppointments.length / this.pageSize);
    return total > 0 ? Array.from({ length: total }, (_, i) => i + 1) : [];
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

  dateClass: MatCalendarCellClassFunction<Date> = (date: Date) => {
    const dateStr = this.formatDateToString(date);
    const has = this.adviceRequests.some((r) => r.date?.slice(0, 10) === dateStr);
    return has ? 'has-appointment' : '';
  };

  filterDates = (date: Date | null): boolean => {
    if (!date) return false;
    const dateStr = this.formatDateToString(date);
    return this.adviceRequests.some((r) => r.date?.slice(0, 10) === dateStr);
  };
}
