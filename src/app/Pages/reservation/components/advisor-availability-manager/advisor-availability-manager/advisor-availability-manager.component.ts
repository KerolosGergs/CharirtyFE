import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatCalendar, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { CommonModule, formatDate } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Advisor } from '../../../../../Core/Services/advisor';

import { Availbity, AvailbityResponse } from '../../../../../Core/Interfaces/iappointment';

@Component({
  selector: 'app-advisor-availability-manager',
  standalone: true,
  imports: [CommonModule, MatCalendar, MatDatepickerModule,RouterModule ],
  templateUrl: './advisor-availability-manager.component.html',
  styleUrl: './advisor-availability-manager.component.scss'
})
export class AdvisorAvailabilityManagerComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private advisorService: Advisor,
    private RouterLink: Router
  ) {}

  isLoading: boolean = true;
  error: string | null = null;
  initialDate: Date | null = null;
  advisorId: number = 0;

  allowedDates: string[] = []; // Dates that have available times
  availability: { [date: string]: { id: number, time: string, Type: string }[] } = {}; // Available times per date

  selectedDate: Date | null = null;
  allHours: { time: string, id: number, Type: string }[] = []; // Hours for selected date

  selectedTimeId: number = 0;
  selectedTimeLabel: string | null = null; // Store translated label for selected time

  saveSuccess = false;
  saveError = '';

  // (احذف جميع المتغيرات والدوال المتعلقة بالتعديل: editingTimeId, editForm, startEdit, cancelEdit, saveEdit, convertTo24Hour)

  @Output() appointmentChange = new EventEmitter<{ timeId: number }>();

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.advisorId = parseInt(params['id']);

      if (this.advisorId) {
        this.advisorService.getAvailableAppointments(this.advisorId).subscribe({
          next: (response: AvailbityResponse) => {
            if (response.success && response.data) {
              this.processAppointments(response.data);
            } else {
              this.error = 'لا توجد مواعيد متاحة حاليًا';
            }
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error loading appointments:', err);
            this.error = 'حدث خطأ في تحميل المواعيد';
            this.isLoading = false;
          }
        });
      } else {
        this.RouterLink.navigate(['/all-consultants']);
        this.error = 'لم يتم تحديد المستشار';
        this.isLoading = false;
      }
    });
  }

  // Process the appointments into the format needed
  processAppointments(appointments: Availbity[]): void {
    appointments.forEach(appointment => {
      const date = formatDate(appointment.date, 'yyyy-MM-dd', 'en-US');
      const time = this.formatTo12Hour(appointment.time);

      if (!this.allowedDates.includes(date)) {
        this.allowedDates.push(date);
      }

      if (!this.availability[date]) {
        this.availability[date] = [];
      }

      this.availability[date].push({
        id: appointment.id,
        time: time,
        Type: appointment.consultationType == 1 ? 'حضور' : 'أونلاين'
      });
    });

    if (this.allowedDates.length > 0) {
      this.initialDate = new Date(this.allowedDates[0]);
    }
  }

  // Format 24-hour time string to 12-hour with AM/PM
  formatTo12Hour(time: string): string {
    const [hour, minute] = time.split(':');
    const date = new Date();
    date.setHours(+hour, +minute);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  // Translate a 12-hour time string like "10:00 AM" → "١٠:٠٠ صباحًا"
  toArabicTimeLabel(time: string): string {
    const amPm = time.includes('AM') ? 'صباحًا' : 'مساءً';
    const cleanTime = time.replace(/(AM|PM)/, '').trim();
    const arabicDigits = cleanTime.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[+d]);
    return `${arabicDigits} ${amPm}`;
  }

  // Used in mat-calendar date filtering
  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    const dateStr = this.formatDate(date);
    return this.allowedDates.includes(dateStr);
  };

  // When the user selects a date from the calendar
  onDateChange(date: Date | null) {
    this.selectedDate = date;
    this.selectedTimeId = 0;
    this.selectedTimeLabel = null; // ✅ reset label
    this.emitAppointment();

    if (date) {
      const key = this.formatDate(date);
      this.allHours = this.availability[key] || [];
    } else {
      this.allHours = [];
    }
  }

  // When the user selects a time slot
  selectTime(timeId: number) {
    this.selectedTimeId = timeId;
    const selected = this.allHours.find(h => h.id === timeId);
    this.selectedTimeLabel = selected ? this.toArabicTimeLabel(selected.time) + ' (' + selected.Type + ')' : null; // ✅ translated label
    this.emitAppointment();
  }

  // Emit selected appointment info to parent
  emitAppointment() {
    if (this.selectedTimeId != null) {
      this.appointmentChange.emit({
        timeId: this.selectedTimeId
      });
    }
  }

  // Format date to yyyy-MM-dd string
  private formatDate(date: Date): string {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }
}