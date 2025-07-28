import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CallenderService } from './service/callender-service';
import { BookedAppointment, AvailableSlot, CalendarDay, NewAppointment } from './mocdels/callender-model';

@Component({
  selector: 'app-new-callender',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './new-callender.html',
  styleUrl: './new-callender.scss'
})
export class NewCallender {
 currentDate = new Date();
  calendarDays: CalendarDay[] = [];
  weekDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  months = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];
  
  selectedDay: CalendarDay | null = null;
  showModal = false;
  showAddSlotModal = false;
  newSlotForm: FormGroup;

  private bookedAppointments: BookedAppointment[] = [];
  private availableSlots: AvailableSlot[] = [];
  private CallenderServic =inject(CallenderService);
  constructor(
    private fb: FormBuilder
  ) {
    this.newSlotForm = this.fb.group({
      time: ['', Validators.required],
      duration: ['01:00:00', Validators.required],
      notes: ['', Validators.required],
      consultationType: [0]
    });
  }

  ngOnInit(): void {
    this.loadAppointments();
    this.generateCalendar();
  }

  private loadAppointments(): void {
    this.CallenderServic.getBookedAppointments().subscribe(response => {
      if (response.success) {
        this.bookedAppointments = response.data;
        this.generateCalendar();
      }
    });

    this.CallenderServic.getAvailableSlots().subscribe(response => {
      if (response.success) {
        this.availableSlots = response.data;
        this.generateCalendar();
      }
    });
  }

  private generateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));
    
    this.calendarDays = [];
    const currentIterDate = new Date(startDate);
    
    while (currentIterDate <= endDate) {
      const dayData: CalendarDay = {
        date: new Date(currentIterDate),
        dayNumber: currentIterDate.getDate(),
        isCurrentMonth: currentIterDate.getMonth() === month,
        isToday: this.isToday(currentIterDate),
        appointments: this.getAppointmentsForDate(currentIterDate),
        availableSlots: this.getAvailableSlotsForDate(currentIterDate)
      };
      
      this.calendarDays.push(dayData);
      currentIterDate.setDate(currentIterDate.getDate() + 1);
    }
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  private getAppointmentsForDate(date: Date): BookedAppointment[] {
  const dateString = date.toLocaleDateString('en-CA'); // 'YYYY-MM-DD'
  return this.bookedAppointments.filter(appointment =>
    appointment.date.split('T')[0] === dateString
  );
}

private getAvailableSlotsForDate(date: Date): AvailableSlot[] {
  const dateString = date.toLocaleDateString('en-CA');
  return this.availableSlots.filter(slot =>
    slot.date.split('T')[0] === dateString && !slot.isBooked
  );
}


  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }

  selectDay(day: CalendarDay): void {
    if (day.isCurrentMonth) {
      this.selectedDay = day;
      this.showModal = true;
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedDay = null;
  }

  openAddSlotModal(day: CalendarDay): void {
    this.selectedDay = day;
    this.showAddSlotModal = true;
  }

  closeAddSlotModal(): void {
    this.showAddSlotModal = false;
    this.selectedDay = null;
    this.newSlotForm.reset({
      duration: '01:00:00',
      consultationType: 0
    });
  }

  addNewSlot(): void {
    
    if (this.newSlotForm.valid && this.selectedDay) {
      const formValue = this.newSlotForm.value;
       // ✅ Clone and add 1 day to the selected date
    const adjustedDate = new Date(this.selectedDay.date);
    adjustedDate.setDate(adjustedDate.getDate() + 1);

    // Format as "YYYY-MM-DDT00:00:00"
    const dateOnlyString = adjustedDate.toISOString().split('T')[0];
    const finalDate = `${dateOnlyString}T00:00:00`;
      const newSlot: NewAppointment = {
        date: finalDate,
        time: formValue.time + ':00',
        duration: formValue.duration,
        notes: formValue.notes,
        consultationType: +formValue.consultationType
      };

      this.CallenderServic.addNewSlot(newSlot).subscribe(success => {
        if (success) {
          this.loadAppointments();
          this.closeAddSlotModal();
        }
      });
    }
  }

  formatTime(time: string): string {
    return time.substring(0, 5);
  }

  formatDuration(duration: string): string {
    const parts = duration.split(':');
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    
    if (hours > 0 && minutes > 0) {
      return `${hours}س ${minutes}د`;
    } else if (hours > 0) {
      return `${hours}س`;
    } else {
      return `${minutes}د`;
    }
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'status-confirmed';
      case 'pending': return 'status-pending';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-default';
    }
  }
    getStatusName(status: string): string {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'تم الموافقة';
      case 'pending': return 'في انتظار الرد';
      case 'cancelled': return 'تم الألغاء';
      default: return 'status-default';
    }
  }

  getConsultationTypeText(type: number): string {
    switch (type) {
      case 0: return 'استشارة عامة';
      case 1: return 'استشارة طبية';
      case 2: return 'استشارة نفسية';
      default: return 'استشارة';
    }
  }
  removeSlot(slotId: number): void {
    
    this.CallenderServic.removeSlot(slotId).subscribe(success => {
      if (success) {
        this.loadAppointments();
                  this.closeAddSlotModal();

      }
    });
  }
}