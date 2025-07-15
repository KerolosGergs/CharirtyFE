// calendar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment, CalendarState } from './test';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private readonly monthNames: string[] = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  private readonly dayNames: string[] = [
    'السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'
  ];

  private stateSubject = new BehaviorSubject<CalendarState>({
    currentDate: new Date(),
    appointments: this.generateSampleAppointments(),
    filteredAppointments: [],
    selectedMeetingType: 'all',
    searchQuery: ''
  });

  public state$: Observable<CalendarState> = this.stateSubject.asObservable();

  constructor() {
    this.filterAppointments();
  }

  getMonthNames(): string[] {
    return this.monthNames;
  }

  getDayNames(): string[] {
    return this.dayNames;
  }

  getCurrentState(): CalendarState {
    return this.stateSubject.value;
  }

  updateCurrentDate(date: Date): void {
    const currentState = this.getCurrentState();
    this.stateSubject.next({
      ...currentState,
      currentDate: date
    });
    this.filterAppointments();
  }

  updateMeetingType(type: 'inPerson' | 'online' | 'all'): void {
    const currentState = this.getCurrentState();
    this.stateSubject.next({
      ...currentState,
      selectedMeetingType: type
    });
    this.filterAppointments();
  }

  updateSearchQuery(query: string): void {
    const currentState = this.getCurrentState();
    this.stateSubject.next({
      ...currentState,
      searchQuery: query.toLowerCase()
    });
    this.filterAppointments();
  }

  addAppointment(appointment: Omit<Appointment, 'id'>): void {
    const currentState = this.getCurrentState();
    const newAppointment: Appointment = {
      ...appointment,
      id: `apt-${Date.now()}`
    };
    
    this.stateSubject.next({
      ...currentState,
      appointments: [...currentState.appointments, newAppointment]
    });
    this.filterAppointments();
  }

  removeAppointment(id: string): void {
    const currentState = this.getCurrentState();
    this.stateSubject.next({
      ...currentState,
      appointments: currentState.appointments.filter(apt => apt.id !== id)
    });
    this.filterAppointments();
  }

  private filterAppointments(): void {
    const currentState = this.getCurrentState();
    let filtered = currentState.appointments;

    // Filter by meeting type
    if (currentState.selectedMeetingType !== 'all') {
      filtered = filtered.filter(apt => apt.type === currentState.selectedMeetingType);
    }

    // Filter by search query
    if (currentState.searchQuery) {
      filtered = filtered.filter(apt => 
        apt.title.toLowerCase().includes(currentState.searchQuery) ||
        apt.description.toLowerCase().includes(currentState.searchQuery)
      );
    }

    this.stateSubject.next({
      ...currentState,
      filteredAppointments: filtered
    });
  }

  private generateSampleAppointments(): Appointment[] {
    const today = new Date();
    const appointments: Appointment[] = [];
    
    // Generate sample appointments for the current week
    for (let i = 0; i < 7; i++) {
      const appointmentDate = new Date(today);
      appointmentDate.setDate(today.getDate() + i);
      
      // Add 1-2 appointments per day
      const appointmentsPerDay = Math.floor(Math.random() * 2) + 1;
      
      for (let j = 0; j < appointmentsPerDay; j++) {
        const startHour = 8 + Math.floor(Math.random() * 8); // 8 AM to 4 PM
        const startMinute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45
        const duration = (Math.floor(Math.random() * 3) + 1) * 0.5; // 0.5, 1, 1.5 hours
        
        const startTime = new Date(appointmentDate);
        startTime.setHours(startHour, startMinute, 0, 0);
        
        const endTime = new Date(startTime);
        endTime.setTime(endTime.getTime() + (duration * 60 * 60 * 1000));
        
        const colors: ('blue' | 'green' | 'purple' | 'yellow')[] = ['blue', 'green', 'purple', 'yellow'];
        const types: ('inPerson' | 'online')[] = ['inPerson', 'online'];
        
        appointments.push({
          id: `apt-${i}-${j}`,
          title: 'اسم المستخدم',
          description: 'احتاج استشارة في مجال احتاج استشارة في مجال احتاج...',
          startTime,
          endTime,
          type: types[Math.floor(Math.random() * types.length)],
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    }
    
    return appointments;
  }
}

