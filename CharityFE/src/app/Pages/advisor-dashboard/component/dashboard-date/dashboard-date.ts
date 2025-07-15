import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppointmentPosition, CalendarState, DayInfo, TimeSlot, Appointment } from '../../../../Core/Services/test';
import { Subject, takeUntil } from 'rxjs';
import { CalendarService } from '../../../../Core/Services/calendar.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-date',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './dashboard-date.html',
  styleUrl: './dashboard-date.scss'
})
export class DashboardDate implements OnInit {
  private destroy$ = new Subject<void>();
  private currentTimeInterval?: number;

  // Component state
  calendarState: CalendarState = {
    currentDate: new Date(),
    appointments: [],
    filteredAppointments: [],
    selectedMeetingType: 'all',
    searchQuery: ''
  };

  // Template properties
  searchQuery: string = '';
  selectedMeetingType: 'inPerson' | 'online' | 'all' = 'all';
  weekDays: DayInfo[] = [];
  timeSlots: TimeSlot[] = [];
  filteredAppointments: Appointment[] = [];
  selectedAppointment: Appointment | null = null;
  
  // Current time line properties
  showCurrentTimeLine: boolean = false;
  currentTimePosition: number = 0;
  currentTimeText: string = '';

  constructor(
    private calendarService: CalendarService,
    private cdr: ChangeDetectorRef
  ) {
    this.initializeTimeSlots();
  }

  ngOnInit(): void {
    // Subscribe to calendar state changes
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

    // Initialize current time line
    this.updateCurrentTimeLine();
    this.startCurrentTimeUpdater();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    
    if (this.currentTimeInterval) {
      clearInterval(this.currentTimeInterval);
    }
  }

  // Event handlers
  onFilterClick(): void {
    // Implement filter modal functionality
    console.log('Filter clicked');
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.calendarService.updateSearchQuery(target.value);
  }

  onMeetingTypeChange(): void {
    this.calendarService.updateMeetingType(this.selectedMeetingType);
  }

  navigateMonth(direction: number): void {
    const newDate = new Date(this.calendarState.currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    this.calendarService.updateCurrentDate(newDate);
  }

  onAppointmentClick(appointment: Appointment): void {
    this.selectedAppointment = appointment;
  }

  closeAppointmentModal(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.selectedAppointment = null;
  }

  editAppointment(appointment: Appointment): void {
    // Implement edit functionality
    console.log('Edit appointment:', appointment);
    this.closeAppointmentModal();
  }

  // Template helper methods
  getCurrentMonthYear(): string {
    const monthNames = this.calendarService.getMonthNames();
    const month = monthNames[this.calendarState.currentDate.getMonth()];
    const year = this.calendarState.currentDate.getFullYear();
    return `${month} ${year}`;
  }

  getAppointmentPosition(appointment: Appointment): AppointmentPosition {
    const startHour = appointment.startTime.getHours() + (appointment.startTime.getMinutes() / 60);
    const endHour = appointment.endTime.getHours() + (appointment.endTime.getMinutes() / 60);
    
    const top = (startHour - 8) * 60; // 8 AM is the start
    const height = (endHour - startHour) * 60;
    
    // Calculate day position (assuming current week view)
    const dayOfWeek = appointment.startTime.getDay();
    const left = dayOfWeek * 16.66; // 100% / 6 days
    const width = 16.66;
    
    return { top, height, left, width };
  }

  // TrackBy functions for performance
  trackByDay(index: number, day: DayInfo): string {
    return `${day.date.getTime()}`;
  }

  trackByTimeSlot(index: number, timeSlot: TimeSlot): number {
    return timeSlot.hour;
  }

  trackByAppointment(index: number, appointment: Appointment): string {
    return appointment.id;
  }

  // Private methods
  private initializeTimeSlots(): void {
    this.timeSlots = [
      { hour: 8, label: '08:00' },
      { hour: 9, label: '09:00' },
      { hour: 10, label: '10:00' },
      { hour: 11, label: '11:00' },
      { hour: 12, label: '12:00' }
    ];
  }

  private updateWeekDays(): void {
    const startOfWeek = this.getStartOfWeek(this.calendarState.currentDate);
    const dayNames = this.calendarService.getDayNames();
    
    this.weekDays = [];
    for (let i = 0; i < 6; i++) { // Show 6 days
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(startOfWeek.getDate() + i);
      
      this.weekDays.push({
        name: dayNames[i],
        number: dayDate.getDate(),
        date: dayDate
      });
    }
  }

  private getStartOfWeek(date: Date): Date {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
    startOfWeek.setDate(diff);
    return startOfWeek;
  }

  private updateCurrentTimeLine(): void {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Calculate position (8 AM = 0, each hour = 60px)
    const hoursSince8AM = currentHour - 8 + (currentMinute / 60);
    this.currentTimePosition = Math.max(0, hoursSince8AM * 60);
    
    // Format time
    this.currentTimeText = now.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    // Show/hide based on business hours
    this.showCurrentTimeLine = currentHour >= 8 && currentHour <= 17;
  }

  private startCurrentTimeUpdater(): void {
    this.currentTimeInterval = window.setInterval(() => {
      this.updateCurrentTimeLine();
      this.cdr.detectChanges();
    }, 60000); // Update every minute
  }

  // Public methods for external access
  addAppointment(appointment: Omit<Appointment, 'id'>): void {
    this.calendarService.addAppointment(appointment);
  }

  removeAppointment(id: string): void {
    this.calendarService.removeAppointment(id);
  }

  getAppointments(): Appointment[] {
    return this.calendarState.appointments;
  }
}
