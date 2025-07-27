import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { IAdvisorAvailability, IConsultationType } from '../../../../../Core/Interfaces/iavailability';
import { Availability } from '../../../../../Core/Services/availability';
import { Advicereques, GetRequests } from '../../../../../Core/Services/advicereques';
import { AuthServ } from '../../../../../Auth/Services/auth-serv';

// Interface for time slot data
export interface TimeSlot {
  time: string; // Time in HH:mm format
  duration: string; // Duration (e.g., "30" for minutes)
  consultationType: IConsultationType; // Type of consultation (Online, InPerson, Both)
  notes?: string; // Optional notes for the time slot
  type?: string; // Type of slot: 'availability', 'Confirmed', or 'Pending'
}

// Interface for day data in the calendar
export interface DayData {
  date: Date; // Date object for the day
  dayNumber: number; // Day number (1-31)
  isSelected: boolean; // Whether the day is selected
  timeSlots: TimeSlot[]; // Array of time slots for the day
  isCurrentMonth: boolean; // Whether the day belongs to the current month
  showTimeSlots: boolean; // Whether to display time slots (for toggle)
  hasTimeSlots: boolean; // Whether the day has any time slots
}

@Component({
  selector: 'app-dashboard-schedule',
  standalone: true,
  templateUrl: './updated-dashboard-schedule.html',
  styleUrls: ['./updated-dashboard-schedule.scss'],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class DashboardSchedule implements OnInit {
  // Inject services
  private authServ = inject(AuthServ);
  private toastr = inject(ToastrService);
  private availabilityService = inject(Availability);
  private adviceService = inject(Advicereques);

  // Advisor ID from authentication service
  advisorId: number = +this.authServ.getId()!;

  // Current date and calendar state
  currentDate: Date = new Date();
  currentMonth: number = this.currentDate.getMonth();
  currentYear: number = this.currentDate.getFullYear();

  // Calendar data
  calendarDays: DayData[] = []; // Array of days in the calendar

  // Weekday and month names in Arabic
  weekDays: string[] = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  monthNames: string[] = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  // Data from services
  adviceRequests: GetRequests[] = []; // Advisor requests
  IAdvisorAvailability: IAdvisorAvailability[] = []; // Advisor availability data

  // Initialize component
  async ngOnInit(): Promise<void> {
    // Fetch advisor requests and availability, then generate calendar
    await this.fetchAdvisorRequests(this.advisorId);
    await this.fetchAvialbly(this.advisorId);
    this.generateCalendar();
  }

  // Convert time to 24-hour format (e.g., "9:00 AM" to "09:00")
  private convertTo24Hour(time: string): string {
    if (!time) return '00:00';
    const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
    if (!match) return time;

    let [_, hours, minutes, period] = match;
    let hr = parseInt(hours, 10);

    if (period?.toUpperCase() === 'PM' && hr < 12) {
      hr += 12;
    } else if (period?.toUpperCase() === 'AM' && hr === 12) {
      hr = 0;
    }

    return `${hr.toString().padStart(2, '0')}:${minutes}`;
  }

  // Get the current month's name
  getCurrentMonthName(): string {
    return this.monthNames[this.currentMonth];
  }

  // Navigate to the previous month
  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  // Navigate to the next month
  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  // Generate the calendar for the current month
  generateCalendar(): void {
    this.calendarDays = [];

    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    const firstDayIndex = firstDayOfMonth.getDay();

    // Map availability data by date
    const advisorSlotsByDate = this.IAdvisorAvailability.reduce((acc, slot) => {
      const dateKey = this.getDateKey(new Date(slot.date));
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push({
        time: this.convertTo24Hour(slot.time), // Ensure consistent time format
        duration: slot.duration,
        consultationType: slot.consultationType,
        notes: slot.notes,
        type: 'availability' // Set type for availability
      });
      return acc;
    }, {} as { [dateKey: string]: TimeSlot[] });

    // Map request data by date
    const requestSlotsByDate = this.adviceRequests.reduce((acc, req) => {
      const dateKey = this.getDateKey(new Date(req.date));
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push({
        time: this.convertTo24Hour(req.time), // Ensure consistent time format
        duration: req.duration,
        consultationType: req.consultationId,
        notes: req.notes,
        type: req.status?.toLowerCase() // Normalize status to lowercase
      });
      return acc;
    }, {} as { [dateKey: string]: TimeSlot[] });

    // Add days from the previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const prevDate = new Date(this.currentYear, this.currentMonth, -i);
      this.calendarDays.push({
        date: prevDate,
        dayNumber: prevDate.getDate(),
        isSelected: false,
        timeSlots: [],
        isCurrentMonth: false,
        showTimeSlots: false,
        hasTimeSlots: false
      });
    }

    // Add days for the current month
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(this.currentYear, this.currentMonth, day);
      const dateKey = this.getDateKey(date);
      const allSlots = [
        ...(advisorSlotsByDate[dateKey] ?? []),
        ...(requestSlotsByDate[dateKey] ?? [])
      ];
      this.calendarDays.push({
        date,
        dayNumber: day,
        isSelected: false,
        timeSlots: allSlots,
        isCurrentMonth: true,
        showTimeSlots: false,
        hasTimeSlots: allSlots.length > 0 // Set flag for days with time slots
      });
    }

    // Add days from the next month to fill the grid
    while (this.calendarDays.length < 42) {
      const nextDate = new Date(this.currentYear, this.currentMonth, this.calendarDays.length - firstDayIndex + 1);
      this.calendarDays.push({
        date: nextDate,
        dayNumber: nextDate.getDate(),
        isSelected: false,
        timeSlots: [],
        isCurrentMonth: false,
        showTimeSlots: false,
        hasTimeSlots: false
      });
    }

    // Debug: Log calendar days to verify hasTimeSlots
    console.log('Calendar Days:', this.calendarDays.map(d => ({
      dayNumber: d.dayNumber,
      hasTimeSlots: d.hasTimeSlots,
      timeSlots: d.timeSlots
    })));
  }

  // Get a string key for a date (YYYY-MM-DD)
  getDateKey(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  // Toggle time slot visibility for a day
  toggleTimeSlots(day: DayData): void {
    if (!day.isCurrentMonth) return;
    this.calendarDays.forEach(d => {
      d.isSelected = false;
      d.showTimeSlots = false;
    });
    day.isSelected = true;
    day.showTimeSlots = !day.showTimeSlots;
  }

  // Convert consultation type number to text
  consultationTypeToText(type: number): string {
    return type === 0 ? 'أونلاين' : type === 1 ? 'حضوري' : 'كلاهما';
  }

  // Fetch advisor requests from the server
  fetchAdvisorRequests(advisorId: number): Promise<GetRequests[]> {
    return new Promise((resolve, reject) => {
      this.adviceService.getRequestsForAdvisor(advisorId).subscribe({
        next: (res) => {
          this.adviceRequests = (res?.data || []).map(r => ({ ...r, showActions: false }));
          console.log('Advisor Requests:', this.adviceRequests); // Debug: Log requests
          resolve(this.adviceRequests);
        },
        error: (err) => {
          console.error('Failed to fetch advisor requests:', err);
          // this.toastr.error('فشل في جلب طلبات المستشار');
          resolve([]); // Resolve with empty array to continue flow
        }
      });
    });
  }

  // Fetch advisor availability from the server
  fetchAvialbly(advisorId: number): Promise<IAdvisorAvailability[]> {
    return new Promise((resolve, reject) => {
      this.availabilityService.getAllAvailability(advisorId).subscribe({
        next: (res) => {
          this.IAdvisorAvailability = res?.data || [];
          console.log('Advisor Availability:', this.IAdvisorAvailability); // Debug: Log availability
          resolve(this.IAdvisorAvailability);
        },
        error: (err) => {
          console.error('Failed to fetch availability:', err);
          // this.toastr.error('فشل في جلب التوفر');
          resolve([]); // Resolve with empty array to continue flow
        }
      });
    });
  }
}