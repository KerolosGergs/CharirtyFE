import { AdvisorAvailabilityService, CreateAvailabilityDTO} from '../../../../Core/Services/makingrequest';
import { Component, Input, Output, EventEmitter, inject, Inject, PLATFORM_ID } from '@angular/core';
import { AppointmentSettings, TimeSlot } from '../../../../Core/Interfaces/itest';
import { AppointmentEvent, CalendarDay, CalendarWeek, TimeSlotFormData } from '../../../../Core/Interfaces/itest';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard-schedule',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard-schedule.html',
  styleUrl: './dashboard-schedule.scss'
})
export class DashboardSchedule {
   @Input() initialSettings?: AppointmentSettings;
  @Output() appointmentEvent = new EventEmitter<AppointmentEvent>();
  @Output() dataChanged = new EventEmitter<CalendarDay[]>();

  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();

  isGenerallyAvailable = true;
  appointmentType: 'online' | 'inperson' = 'online';
  isLoading = false;
  showTimeSlotModal = false;

  calendarWeeks: CalendarWeek[] = [];
  daysOfWeek = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  monthNames = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  timeSlotForm: FormGroup;
  selectedDay: CalendarDay | null = null;

  private subscriptions = new Subscription();

  // 👇 Inject the service
  private availabilityService = inject(AdvisorAvailabilityService);
  availability: any;

  constructor(private formBuilder: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object) {
    this.timeSlotForm = this.createTimeSlotForm();
  }

  ngOnInit(): void {
    this.initializeSettings();
    this.generateCalendar();
    this.setupFormValidation();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  
  // ===== INITIALIZATION =====
  private initializeSettings(): void {
    if (this.initialSettings) {
      this.isGenerallyAvailable = this.initialSettings.isGenerallyAvailable;
      this.appointmentType = this.initialSettings.appointmentType;
    }
    
    console.log('🚀 Appointment Calendar initialized');
    console.log('📅 Current month:', this.currentMonthYear);
    console.log('⚙️ Settings:', {
      available: this.isGenerallyAvailable,
      type: this.appointmentType
    });
  }
  
  private createTimeSlotForm(): FormGroup {
    return this.formBuilder.group({
      startTime: ['09:00', [Validators.required]],
      endTime: ['10:00', [Validators.required]]
    });
  }
  
  private setupFormValidation(): void {
    const formSubscription = this.timeSlotForm.valueChanges.subscribe((value: TimeSlotFormData) => {
      this.validateTimeSlot(value);
    });
    
    this.subscriptions.add(formSubscription);
  }
  
  // ===== CALENDAR GENERATION =====
  generateCalendar(): void {
    console.log(`📅 Generating calendar for ${this.monthNames[this.currentMonth]} ${this.currentYear}`);
    
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();
    
    // Calculate previous month days to show
    const prevMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
    const prevYear = this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
    
    // Calculate next month days to show
    const nextMonth = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
    const nextYear = this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
    
    const weeks: CalendarWeek[] = [];
    let currentWeek: CalendarDay[] = [];
    let weekNumber = 1;
    
    // Add previous month days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = daysInPrevMonth - i;
      const day = this.createCalendarDay(date, prevMonth, prevYear, false);
      currentWeek.push(day);
    }
    
    // Add current month days
    for (let date = 1; date <= daysInMonth; date++) {
      const day = this.createCalendarDay(date, this.currentMonth, this.currentYear, true);
      currentWeek.push(day);
      
      if (currentWeek.length === 7) {
        weeks.push({ weekNumber, days: [...currentWeek] });
        currentWeek = [];
        weekNumber++;
      }
    }
    
    // Add next month days to complete the last week
    let nextMonthDate = 1;
    while (currentWeek.length < 7) {
      const day = this.createCalendarDay(nextMonthDate, nextMonth, nextYear, false);
      currentWeek.push(day);
      nextMonthDate++;
    }
    
    if (currentWeek.length > 0) {
      weeks.push({ weekNumber, days: currentWeek });
    }
    
    this.calendarWeeks = weeks;
    console.log(`✅ Calendar generated with ${weeks.length} weeks`);
    
    // Generate sample data for demonstration
    this.generateSampleData();
  }
  
  private createCalendarDay(date: number, month: number, year: number, isCurrentMonth: boolean): CalendarDay {
    const fullDate = new Date(year, month, date);
    const today = new Date();
    const isToday = fullDate.toDateString() === today.toDateString();
    const isPastDate = fullDate < today && !isToday;
    const isWeekend = fullDate.getDay() === 5 || fullDate.getDay() === 6; // Friday & Saturday
    
    const dayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    
    return {
      date,
      dayName: dayNames[fullDate.getDay()],
      fullDate,
      isCurrentMonth,
      isToday,
      isAvailable: isCurrentMonth && !isPastDate && !isWeekend,
      timeSlots: [],
      isWeekend,
      isPastDate
    };
  }
  
  // ===== SAMPLE DATA GENERATION =====
  private generateSampleData(): void {
    console.log('🎯 Generating sample appointment data...');
    
    const sampleTimeSlots: TimeSlot[] = [
      { id: '1', startTime: '09:00', endTime: '10:00' },
      { id: '2', startTime: '10:30', endTime: '11:30' },
      { id: '3', startTime: '14:00', endTime: '15:00' },
      { id: '4', startTime: '15:30', endTime: '16:30' },
      { id: '5', startTime: '17:00', endTime: '18:00' }
    ];
    
    // Add sample data to some days
    this.calendarWeeks.forEach(week => {
      week.days.forEach(day => {
        if (day.isCurrentMonth && day.isAvailable && Math.random() > 0.6) {
          // Randomly assign 1-3 time slots to available days
          const numSlots = Math.floor(Math.random() * 3) + 1;
          const shuffled = [...sampleTimeSlots].sort(() => 0.5 - Math.random());
          day.timeSlots = shuffled.slice(0, numSlots).map(slot => ({
            ...slot,
            id: `${day.date}-${slot.id}`,
            isBooked: Math.random() > 0.8
          }));
        }
      });
    });
    
    console.log('✅ Sample data generated');
  }
  
  // ===== COMPUTED PROPERTIES =====
  get currentMonthYear(): string {
    return `${this.monthNames[this.currentMonth]} ${this.currentYear}`;
  }
  
  get totalAvailableDays(): number {
    return this.calendarWeeks
      .flatMap(week => week.days)
      .filter(day => day.isCurrentMonth && day.isAvailable)
      .length;
  }
  
  get totalTimeSlots(): number {
    return this.calendarWeeks
      .flatMap(week => week.days)
      .filter(day => day.isCurrentMonth)
      .reduce((total, day) => total + day.timeSlots.length, 0);
  }
  
  // ===== NAVIGATION =====
  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    
    this.generateCalendar();
    this.emitEvent('settings-changed', { month: this.currentMonth, year: this.currentYear });
    console.log(`⬅️ Navigated to ${this.currentMonthYear}`);
  }
  
  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    
    this.generateCalendar();
    this.emitEvent('settings-changed', { month: this.currentMonth, year: this.currentYear });
    console.log(`➡️ Navigated to ${this.currentMonthYear}`);
  }
  
  // ===== AVAILABILITY MANAGEMENT =====
  toggleGeneralAvailability(): void {
    this.isGenerallyAvailable = !this.isGenerallyAvailable;
    
    console.log(`🔄 General availability toggled: ${this.isGenerallyAvailable ? 'Available' : 'Unavailable'}`);
    
    // Update all days based on general availability
    if (!this.isGenerallyAvailable) {
      this.calendarWeeks.forEach(week => {
        week.days.forEach(day => {
          if (day.isCurrentMonth) {
            day.isAvailable = false;
            day.timeSlots = [];
          }
        });
      });
    } else {
      this.calendarWeeks.forEach(week => {
        week.days.forEach(day => {
          if (day.isCurrentMonth && !day.isPastDate && !day.isWeekend) {
            day.isAvailable = true;
          }
        });
      });
    }
    
    this.emitEvent('settings-changed', { isGenerallyAvailable: this.isGenerallyAvailable });
    this.emitDataChanged();
  }
  
  toggleDayAvailability(day: CalendarDay): void {
    if (!day.isCurrentMonth || day.isPastDate) return;
    
    day.isAvailable = !day.isAvailable;
    
    if (!day.isAvailable) {
      day.timeSlots = [];
    }
    
    console.log(`📅 Day ${day.date} availability: ${day.isAvailable ? 'Available' : 'Unavailable'}`);
    
    this.emitEvent('day-availability-changed', { day, isAvailable: day.isAvailable });
    this.emitDataChanged();
  }
  
  // ===== APPOINTMENT TYPE =====
  setAppointmentType(type: 'online' | 'inperson'): void {
    this.appointmentType = type;
    console.log(`💻 Appointment type changed to: ${type}`);
    this.emitEvent('settings-changed', { appointmentType: type });
  }
  
 // ===== TIME SLOT MANAGEMENT =====
addTimeSlot(day: CalendarDay): void {
  console.log(`🔄 Attempting to add time slot for day ${day.date}`);
  
  if (!day.isCurrentMonth) {
    console.warn('⚠️ Cannot add time slot: Day is not in current month');
    return;
  }
  
  if (!day.isAvailable) {
    console.warn('⚠️ Cannot add time slot: Day is not available');
    alert('لا يمكن إضافة وقت لهذا اليوم. يرجى تفعيل توفر اليوم أولاً.');
    return;
  }
  
  this.selectedDay = day;
  this.showTimeSlotModal = true;
  
  // Reset form with default values
  this.timeSlotForm.patchValue({
    startTime: '09:00',
    endTime: '10:00'
  });
  
  // Mark form as untouched to avoid showing validation errors immediately
  this.timeSlotForm.markAsUntouched();
  
  console.log(`✅ Opening time slot modal for day ${day.date}`);
  console.log('📝 Form initial values:', this.timeSlotForm.value);
}
  
  removeTimeSlot(day: CalendarDay, timeSlot: TimeSlot): void {
    const index = day.timeSlots.findIndex(slot => slot.id === timeSlot.id);
    if (index > -1) {
      day.timeSlots.splice(index, 1);
      console.log(`🗑️ Removed time slot: ${timeSlot.startTime}-${timeSlot.endTime} from day ${day.date}`);
      
      this.emitEvent('time-slot-removed', { day, timeSlot });
      this.emitDataChanged();
    }
  }
  
saveTimeSlot(): void {
  console.log('💾 Attempting to save time slot...');
  console.log('📝 Form valid:', this.timeSlotForm.valid);
  console.log('📝 Form value:', this.timeSlotForm.value);
  console.log('📝 Selected day:', this.selectedDay?.date);
  
  if (!this.selectedDay) {
    console.error('❌ No day selected');
    alert('خطأ: لم يتم تحديد يوم');
    return;
  }
  
  // Mark form as touched to show validation errors
  this.timeSlotForm.markAllAsTouched();
  
  if (!this.timeSlotForm.valid) {
    console.warn('⚠️ Form is invalid');
    alert('يرجى ملء جميع الحقول المطلوبة');
    return;
  }
  
  const formValue = this.timeSlotForm.value as TimeSlotFormData;
  
  if (!this.isValidTimeSlot(formValue)) {
    console.warn('⚠️ Invalid time slot: End time must be after start time');
    alert('وقت النهاية يجب أن يكون بعد وقت البداية');
    return;
  }
  
  // Check for time conflicts
  const hasConflict = this.selectedDay.timeSlots.some(existingSlot => {
    return this.hasTimeConflict(formValue, existingSlot);
  });
  
  if (hasConflict) {
    console.warn('⚠️ Time conflict detected');
    alert('يوجد تداخل مع وقت موجود. يرجى اختيار وقت آخر.');
    return;
  }
  
  const newTimeSlot: TimeSlot = {
    id: `${this.selectedDay.date}-${Date.now()}`,
    startTime: formValue.startTime,
    endTime: formValue.endTime,
    isBooked: false
  };
  
  this.selectedDay.timeSlots.push(newTimeSlot);
  
  // Sort time slots by start time
  this.selectedDay.timeSlots.sort((a, b) => a.startTime.localeCompare(b.startTime));
  
  console.log(`✅ Added time slot: ${newTimeSlot.startTime}-${newTimeSlot.endTime} to day ${this.selectedDay.date}`);
  console.log('📊 Total time slots for this day:', this.selectedDay.timeSlots.length);
  
  this.emitEvent('time-slot-added', { day: this.selectedDay, timeSlot: newTimeSlot });
  this.emitDataChanged();
  this.closeTimeSlotModal();
  
  // Show success message
  alert(`تم إضافة الوقت ${newTimeSlot.startTime} - ${newTimeSlot.endTime} بنجاح!`);
}

closeTimeSlotModal(): void {
  console.log('🔒 Closing time slot modal');
  this.showTimeSlotModal = false;
  this.selectedDay = null;
  this.timeSlotForm.reset({
    startTime: '09:00',
    endTime: '10:00'
  });
  this.timeSlotForm.markAsUntouched();
}

  // ===== VALIDATION =====
  private validateTimeSlot(timeSlot: TimeSlotFormData): boolean {
    return this.isValidTimeSlot(timeSlot);
  }
  
  private isValidTimeSlot(timeSlot: TimeSlotFormData): boolean {
    if (!timeSlot.startTime || !timeSlot.endTime) {
      return false;
    }
    
    const start = new Date(`2000-01-01T${timeSlot.startTime}:00`);
    const end = new Date(`2000-01-01T${timeSlot.endTime}:00`);
    return end > start;
  }
  
  private hasTimeConflict(newTimeSlot: TimeSlotFormData, existingTimeSlot: TimeSlot): boolean {
    const newStart = new Date(`2000-01-01T${newTimeSlot.startTime}:00`);
    const newEnd = new Date(`2000-01-01T${newTimeSlot.endTime}:00`);
    const existingStart = new Date(`2000-01-01T${existingTimeSlot.startTime}:00`);
    const existingEnd = new Date(`2000-01-01T${existingTimeSlot.endTime}:00`);
    
    // Check if there's any overlap
    return (newStart < existingEnd && newEnd > existingStart);
  }
  
  // ===== BULK OPERATIONS =====
  selectAvailableDays(): void {
    console.log('📋 Opening available days selection...');
    // This would typically open a modal or sidebar for bulk day selection
    // For now, we'll just log the action
    alert('ميزة تحديد الأيام المتاحة ستكون متاحة قريباً');
  }
  
  // ===== CHANGES MADE HERE IN saveChanges() =====
 saveChanges(): void {
  this.isLoading = true;

  console.log('💾 Saving changes...');
  console.log('📊 Summary:', {
    totalAvailableDays: this.totalAvailableDays,
    totalTimeSlots: this.totalTimeSlots,
    appointmentType: this.appointmentType,
    isGenerallyAvailable: this.isGenerallyAvailable
  });

  const allAvailableDays = this.calendarWeeks
    .flatMap(week => week.days)
    .filter(day => day.isCurrentMonth && day.isAvailable);

  if (allAvailableDays.length === 0) {
    alert('لا توجد أيام متاحة للحفظ.');
    this.isLoading = false;
    return;
  }

  const availabilityPayload: CreateAvailabilityDTO[] = [];

  // Safely read advisorId if we're in browser context
  const advisorId = isPlatformBrowser(this.platformId)
    ? Number(localStorage.getItem('advisorId')) || 0
    : 0;

  allAvailableDays.forEach(day => {
    day.timeSlots.forEach(slot => {
      const duration = this.calculateDuration(slot.startTime, slot.endTime);
      availabilityPayload.push({
        advisorId: advisorId,
        date: day.fullDate.toISOString().split('T')[0], // e.g., "2025-07-21"
        time: slot.startTime,
        duration: this.minutesToHHMMSS(duration),
        consultationType: this.appointmentType === 'online' ? 0 : 1,
        notes: ''
      });
    });
  });

  this.availabilityService.createBulkAvailability({ availabilities: availabilityPayload }).subscribe({
    next: response => {
      this.isLoading = false;
      alert('تم حفظ التغييرات بنجاح!');
      console.log('✅ Changes saved to backend', response);
      this.emitEvent('settings-changed', { action: 'save' });
    },
    error: err => {
      this.isLoading = false;
      alert('حدث خطأ أثناء الحفظ. حاول مرة أخرى.');
      console.error('❌ Failed to save availability:', err);
    }
  });
}

// Add this helper method to calculate duration in minutes
private calculateDuration(startTime: string, endTime: string): number {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  return (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
}

// Helper to convert minutes to "HH:mm:ss" string
private minutesToHHMMSS(minutes: number): string {
  const h = Math.floor(minutes / 60).toString().padStart(2, '0');
  const m = (minutes % 60).toString().padStart(2, '0');
  return `${h}:${m}:00`;
}
  
  // ===== EVENT EMISSION =====
  private emitEvent(type: AppointmentEvent['type'], data: any): void {
    const event: AppointmentEvent = {
      type,
      data,
      timestamp: new Date()
    };
    
    this.appointmentEvent.emit(event);
  }
  
  private emitDataChanged(): void {
    const allDays = this.calendarWeeks.flatMap(week => week.days);
    this.dataChanged.emit(allDays);
  }
  
  // ===== TRACK BY FUNCTIONS (for performance) =====
  trackByWeek(index: number, week: CalendarWeek): number {
    return week.weekNumber;
  }
  
  trackByDay(index: number, day: CalendarDay): string {
    return `${day.fullDate.getTime()}-${day.isAvailable}`;
  }
  
  trackByTimeSlot(index: number, timeSlot: TimeSlot): string {
    return timeSlot.id;
  }
  
  // ===== UTILITY METHODS =====
  getDayClasses(day: CalendarDay): string[] {
    const classes: string[] = [];
    
    if (day.isAvailable) classes.push('available');
    if (day.timeSlots.length > 0) classes.push('has-appointments');
    if (!day.isCurrentMonth) classes.push('other-month');
    if (day.isToday) classes.push('today');
    if (day.isPastDate) classes.push('past-date');
    if (day.isWeekend) classes.push('weekend');
    
    return classes;
  }
  
  getTimeSlotStatus(timeSlot: TimeSlot): string {
    return timeSlot.isBooked ? 'محجوز' : 'متاح';
  }
  
  // ===== DEBUG METHODS =====
  logCalendarState(): void {
    console.group('📊 Calendar State Debug');
    console.log('Current Month/Year:', this.currentMonthYear);
    console.log('General Availability:', this.isGenerallyAvailable);
    console.log('Appointment Type:', this.appointmentType);
    console.log('Total Weeks:', this.calendarWeeks.length);
    console.log('Available Days:', this.totalAvailableDays);
    console.log('Total Time Slots:', this.totalTimeSlots);
    console.table(
      this.calendarWeeks.flatMap(week => week.days)
        .filter(day => day.isCurrentMonth && day.timeSlots.length > 0)
        .map(day => ({
          date: day.date,
          dayName: day.dayName,
          available: day.isAvailable,
          timeSlots: day.timeSlots.length
        }))
    );
    console.groupEnd();
  }
}
