import { Component, LOCALE_ID } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCalendar, MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { NativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';

interface Appointment {
  userName: string;
  date: string; // ISO date
  time: string; // e.g. "21:30"
  duration: number; // in minutes
  consultationType: 'اونلاين' | 'حضوري';
  description: string;
}
@Component({
  selector: 'app-appointments',
  imports: [DatePipe, MatCalendar, MatDatepickerModule, NativeDateModule, ReactiveFormsModule],
  templateUrl: './appointments.html',
  styleUrl: './appointments.scss',
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'ar' }]
})
export class Appointments {
  selectedDate = new Date();
  availableDates: string[] = []; // yyyy-mm-dd
  appointments: Appointment[] = [];
  selectedAppointments: Appointment[] = [];



 dateClass: MatCalendarCellClassFunction<Date> = (cellDate: Date, view: string) => {
    if (view === 'month') {
      const dateStr = cellDate.toISOString().split('T')[0];
      return this.availableDates.includes(dateStr) ? 'available-date' : '';
    }
    return '';
  };
  constructor(private datePipe: DatePipe) {
    this.onDateChange(this.selectedDate);
  }
  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    // Simulate fetching from API
    this.appointments = [
      {
        userName: 'اسم المستخدم',
        date: '2025-07-01',
        time: '21:30',
        duration: 30,
        consultationType: 'اونلاين',
        description: 'احتاج استشارة في مجال العلاج'
      },
      {
        userName: 'اسم المستخدم',
        date: '2025-07-01',
        time: '23:00',
        duration: 30,
        consultationType: 'حضوري',
        description: 'احتاج استشارة في مجال العلاج'
      }, {
        userName: 'اسم المستخدم',
        date: '2025-07-03',
        time: '23:00',
        duration: 30,
        consultationType: 'حضوري',
        description: 'احتاج استشارة في مجال العلاج'
      }
    ];

    // Extract unique available dates
    this.availableDates = [...new Set(this.appointments.map(a => a.date))];
  }

  getAppointmentsForSelectedDate(): Appointment[] {
    const selected = this.selectedDate.toISOString().split('T')[0];
    return this.appointments.filter(a => a.date === selected);
  }

   // Enable only available dates
  filterDates = (date: Date | null): boolean => {
    if (!date) return false;
    const formatted = this.datePipe.transform(date, 'yyyy-MM-dd');
    return this.appointments.some(a => a.date === formatted);
  };
    onDateChange(date: Date): void {
    const formatted = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.selectedAppointments = this.appointments.filter(a => a.date === formatted);
  }
}