import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import {
  Appointment,
  AppointmentPosition,
  CalendarState,
  DayInfo,
  TimeSlot
} from '../../../../Core/Services/test';
import { CalendarService } from '../../../../Core/Services/calendar.service';

@Component({
  selector: 'app-dashboard-date',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-date.html',
  styleUrls: ['./dashboard-date.scss']
})
export class DashboardDate implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private currentTimeInterval?: number;

  calendarState: CalendarState = {
    currentDate: new Date(),
    appointments: [],
    filteredAppointments: [],
    selectedMeetingType: 'all',
    searchQuery: ''
  };

  searchQuery: string = '';
  selectedMeetingType: 'inPerson' | 'online' | 'all' = 'all';
  weekDays: DayInfo[] = [];
  timeSlots: TimeSlot[] = [];
  filteredAppointments: Appointment[] = [];

  showCurrentTimeLine: boolean = false;
  currentTimePosition: number = 0;
  currentTimeText: string = '';

  constructor(
    private calendarService: CalendarService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initializeTimeSlots();
  }

  ngOnInit(): void {
    this.calendarService.state$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.calendarState = state;
        this.filteredAppointments = state.filteredAppointments;
        this.searchQuery = state.searchQuery;
        this.selectedMeetingType = state.selectedMeetingType;
        this.updateWeekDays();
        this.cdr.detectChanges();
      });

    if (isPlatformBrowser(this.platformId)) {
      this.updateCurrentTimeLine();
      this.startCurrentTimeUpdater();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (isPlatformBrowser(this.platformId) && this.currentTimeInterval) {
      clearInterval(this.currentTimeInterval);
    }
  }

  navigateWeek(offset: number): void {
    const newDate = new Date(this.calendarState.currentDate);
    newDate.setDate(newDate.getDate() + offset * 6);
    this.calendarService.updateCurrentDate(newDate);
    this.updateWeekDays();
  }

  private updateWeekDays(): void {
    const startOfWeek = this.getStartOfWeek(this.calendarState.currentDate);
    const dayNames = this.calendarService.getDayNames();

    this.weekDays = [];
    for (let i = 0; i < 6; i++) {
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(startOfWeek.getDate() + i);

      const dayNameIndex = dayDate.getDay();
      this.weekDays.push({
        name: dayNames[dayNameIndex],
        number: dayDate.getDate(),
        date: new Date(dayDate)
      });
    }
  }

  private getStartOfWeek(date: Date): Date {
    const result = new Date(date);
    const day = result.getDay();
    const diff = result.getDate() - day + (day === 0 ? -6 : 1);
    result.setDate(diff);
    return result;
  }

  private initializeTimeSlots(): void {
    this.timeSlots = [];
    for (let hour = 1; hour <= 24; hour++) {
      const label = hour < 10 ? `0${hour}:00` : `${hour}:00`;
      this.timeSlots.push({ hour, label });
    }
  }

  getAppointmentPosition(appointment: Appointment): AppointmentPosition {
    const calendarStartHour = 1;

    const startHour = appointment.startTime.getHours() + appointment.startTime.getMinutes() / 60;
    const endHour = appointment.endTime.getHours() + appointment.endTime.getMinutes() / 60;

    const top = (startHour - calendarStartHour) * 60;
    const height = Math.max(15, (endHour - startHour) * 60);

    const index = this.weekDays.findIndex(day => {
      return day.date.toDateString() === appointment.startTime.toDateString();
    });

    const left = index >= 0 ? index * (100 / 6) : 0;
    const width = 100 / 6;

    return { top, height, left, width };
  }

  onFilterClick(): void {
    console.log('Filter clicked');
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.calendarService.updateSearchQuery(target.value);
  }

  onMeetingTypeChange(): void {
    this.calendarService.updateMeetingType(this.selectedMeetingType);
  }

  onAppointmentClick(appointment: Appointment): void {
    this.router.navigate(['/advisor-dashboard/date-details', appointment.id]);
  }

  getCurrentMonthYear(): string {
    const monthNames = this.calendarService.getMonthNames();
    const month = monthNames[this.calendarState.currentDate.getMonth()];
    const year = this.calendarState.currentDate.getFullYear();
    return `${month} ${year}`;
  }

  private updateCurrentTimeLine(): void {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const hoursSinceStart = currentHour - 1 + currentMinute / 60;
    this.currentTimePosition = Math.max(0, hoursSinceStart * 60);

    this.currentTimeText = now.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    this.showCurrentTimeLine = currentHour >= 1 && currentHour <= 24;
  }

  private startCurrentTimeUpdater(): void {
    this.currentTimeInterval = window.setInterval(() => {
      this.updateCurrentTimeLine();
      this.cdr.detectChanges();
    }, 60000);
  }

  addAppointment(appointment: Omit<Appointment, 'id'>): void {
    this.calendarService.addAppointment(appointment);
  }

  removeAppointment(id: string): void {
    this.calendarService.removeAppointment(id);
  }

  getAppointments(): Appointment[] {
    return this.calendarState.appointments;
  }

  trackByDay(index: number, day: DayInfo): string {
    return `${day.date.getTime()}`;
  }

  trackByTimeSlot(index: number, timeSlot: TimeSlot): number {
    return timeSlot.hour;
  }

  trackByAppointment(index: number, appointment: Appointment): string {
    return appointment.id;
  }
}
