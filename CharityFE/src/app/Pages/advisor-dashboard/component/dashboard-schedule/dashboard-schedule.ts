import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { IBulkAvailability, IConsultationType, ICreateAvailability } from '../../../../Core/Interfaces/iavailability';
import { Availability } from '../../../../Core/Services/availability';

export interface TimeSlot {
  time: string;
  duration: string;
  consultationType: IConsultationType;
  notes?: string;
}

export interface DayData {
  date: Date;
  dayNumber: number;
  isSelected: boolean;
  timeSlots: TimeSlot[];
  isCurrentMonth: boolean;
}

@Component({
  selector: 'app-dashboard-schedule',
  standalone: true,
  templateUrl: './dashboard-schedule.html',
  styleUrls: ['./dashboard-schedule.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class DashboardSchedule implements OnInit {
  advisorId: number = 1; // Replace with actual advisor ID
  currentDate: Date = new Date();
  currentMonth: number = this.currentDate.getMonth();
  currentYear: number = this.currentDate.getFullYear();

  calendarDays: DayData[] = [];
  availableTimesData: { [key: string]: TimeSlot[] } = {};

  weekDays: string[] = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  monthNames: string[] = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  constructor(private toastr: ToastrService, private availabilityService: Availability) {}

  ngOnInit(): void {
    this.generateCalendar();
  }

  private convertTo24Hour(time: string): string {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) return time; // return as-is if format doesn't match

  let [_, hours, minutes, period] = match;
  let hr = parseInt(hours, 10);

  if (period?.toUpperCase() === 'PM' && hr < 12) {
    hr += 12;
  } else if (period?.toUpperCase() === 'AM' && hr === 12) {
    hr = 0;
  }

  return `${hr.toString().padStart(2, '0')}:${minutes}`;
}

convertToTimeSpan(timeStr: string): string {
  // Accepts inputs like "9:00 AM", "13:30", "30" (minutes), or "00:30"
  if (!timeStr) return '00:00:00';

  // If it's a number representing minutes (like '30'), convert to '00:30:00'
  if (/^\d+$/.test(timeStr)) {
    const minutes = parseInt(timeStr, 10);
    return `00:${minutes.toString().padStart(2, '0')}:00`;
  }

  // If format includes ":" (e.g., "13:30" or "00:30")
  if (timeStr.includes(':')) {
    // If it's HH:mm or mm:ss, add missing parts to HH:mm:ss
    const parts = timeStr.split(':');
    if (parts.length === 2) {
      // Assume HH:mm, add seconds
      return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}:00`;
    }
    if (parts.length === 3) {
      return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}:${parts[2].padStart(2, '0')}`;
    }
  }

  // Otherwise, try to parse AM/PM time (e.g., "9:00 AM")
  const date = new Date(`1970-01-01T${timeStr}`);
  if (!isNaN(date.getTime())) {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:00`;
  }

  // Fallback
  return '00:00:00';
}



  getCurrentMonthName(): string {
    return this.monthNames[this.currentMonth];
  }

  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.calendarDays = [];

    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    const firstDayIndex = firstDayOfMonth.getDay();

    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const prevDate = new Date(this.currentYear, this.currentMonth, -i);
      this.calendarDays.push({
        date: prevDate,
        dayNumber: prevDate.getDate(),
        isSelected: false,
        timeSlots: [],
        isCurrentMonth: false
      });
    }

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(this.currentYear, this.currentMonth, day);
      const dateKey = this.getDateKey(date);
      this.calendarDays.push({
        date,
        dayNumber: day,
        isSelected: false,
        timeSlots: this.availableTimesData[dateKey] || [],
        isCurrentMonth: true
      });
    }

    while (this.calendarDays.length < 42) {
      const nextDate = new Date(this.currentYear, this.currentMonth, this.calendarDays.length - firstDayIndex + 1);
      this.calendarDays.push({
        date: nextDate,
        dayNumber: nextDate.getDate(),
        isSelected: false,
        timeSlots: [],
        isCurrentMonth: false
      });
    }
  }

  getDateKey(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  selectDay(day: DayData): void {
    if (!day.isCurrentMonth) return;
    this.calendarDays.forEach(d => d.isSelected = false);
    day.isSelected = true;
  }

  addNewTimeSlot(day: DayData): void {
    day.timeSlots.push({
      time: '',
      duration: '',
      consultationType: IConsultationType.Online,
      notes: ''
    });
    this.availableTimesData[this.getDateKey(day.date)] = day.timeSlots;
  }

  removeTimeSlot(day: DayData, index: number): void {
    day.timeSlots.splice(index, 1);
    this.availableTimesData[this.getDateKey(day.date)] = day.timeSlots;
  }

  updateTimeSlot(day: DayData, index: number, field: keyof TimeSlot, value: string): void {
    (day.timeSlots[index] as any)[field] = value;
    this.availableTimesData[this.getDateKey(day.date)] = day.timeSlots;
  }

  getAllAvailableTimesData(): { [key: string]: TimeSlot[] } {
    return this.availableTimesData;
  }

 submitSingleAvailability(day: DayData): void {
  if (!day.timeSlots.length) {
    this.toastr.warning('يرجى إضافة وقت واحد على الأقل');
    return;
  }

  const dateStr = day.date.toISOString().split('T')[0]; // yyyy-mm-dd

  for (const slot of day.timeSlots) {
    if (!slot.time || !slot.duration) {
      this.toastr.error('يرجى ملء الوقت والمدة');
      return;
    }

    // Assuming time is already in 24-hour HH:mm format
    const availability: ICreateAvailability = {
  advisorId: this.advisorId,
  date: dateStr,
  time: this.convertToTimeSpan(slot.time),        // Convert time
  duration: this.convertToTimeSpan(slot.duration), // Convert duration
  consultationType: slot.consultationType,
  notes: slot.notes || ''
};



    this.availabilityService.createAvailability(availability).subscribe({
      next: (res) => {
        console.log(res);
        
        this.toastr.success(`تم حفظ الموعد بنجاح: ${slot.time}`);
      },
      error: (err) => {
        console.error('Validation errors:', err.error?.errors);
        this.toastr.error('حدث خطأ أثناء حفظ الموعد');
      }
    });
  }
}

  submitAllAvailabilities(): void {
  const availabilities: ICreateAvailability[] = [];

  for (const [key, slots] of Object.entries(this.availableTimesData)) {
    const [year, month, day] = key.split('-').map(Number);
    const dateStr = new Date(year, month, day).toISOString().split('T')[0];

    for (const slot of slots) {
      if (!slot.time || !slot.duration) continue;

      availabilities.push({
        advisorId: this.advisorId,
        date: dateStr,
        time: this.convertToTimeSpan(slot.time),      // convert time
        duration: this.convertToTimeSpan(slot.duration),  // convert duration
        consultationType: slot.consultationType,
        notes: slot.notes || ''
      });
    }
  }

  if (!availabilities.length) {
    this.toastr.warning('لا توجد مواعيد صالحة للحفظ');
    return;
  }

  const bulk: IBulkAvailability = { availabilities };

  this.availabilityService.createBulkAvailability(bulk).subscribe({
    next: (res) => {
      console.log(res);
      this.toastr.success('تم حفظ جميع المواعيد بنجاح');
    },
    error: (err) => {
      console.log(err);
      this.toastr.error('فشل حفظ المواعيد');
    }
  });
}

}
