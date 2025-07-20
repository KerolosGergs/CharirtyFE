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
  const baseDate = new Date(today);
  baseDate.setHours(0, 0, 0, 0);

  const appointments: Appointment[] = [
    {
      id: 'apt-1',
      title: 'استشارة صباحية',
      description: 'استشارة خاصة في العمل',
      startTime: new Date(baseDate.setHours(2, 0)), // 2:00 AM
      endTime: new Date(baseDate.setHours(3, 30)), // 3:30 AM
      type: 'online',
      color: 'blue'
    },
    {
      id: 'apt-2',
      title: 'لقاء داخلي',
      description: 'لقاء مع فريق العمل',
      startTime: new Date(baseDate.setHours(9, 15)), // 9:15 AM
      endTime: new Date(baseDate.setHours(10, 0)),  // 10:00 AM
      type: 'inPerson',
      color: 'green'
    },
    {
      id: 'apt-3',
      title: 'جلسة استشارية',
      description: 'جلسة توجيهية مع العميل',
      startTime: new Date(baseDate.setHours(14, 0)), // 2:00 PM
      endTime: new Date(baseDate.setHours(15, 30)), // 3:30 PM
      type: 'online',
      color: 'purple'
    },
    {
      id: 'apt-4',
      title: 'استشارة ليلية',
      description: 'اجتماع متأخر للمراجعة',
      startTime: new Date(baseDate.setHours(22, 0)), // 10:00 PM
      endTime: new Date(baseDate.setHours(23, 0)),   // 11:00 PM
      type: 'inPerson',
      color: 'yellow'
    },
    // Added 5 more with allowed colors only
    {
      id: 'apt-5',
      title: 'اجتماع فريق',
      description: 'مناقشة التقدم الأسبوعي',
      startTime: new Date(baseDate.getTime() + 24 * 60 * 60 * 1000 + 8 * 60 * 60000), // tomorrow 8:00 AM
      endTime: new Date(baseDate.getTime() + 24 * 60 * 60 * 1000 + 9 * 60 * 60000), // 9:00 AM
      type: 'inPerson',
      color: 'green'
    },
    {
      id: 'apt-6',
      title: 'جلسة تدريب',
      description: 'تدريب داخلي للموظفين الجدد',
      startTime: new Date(baseDate.getTime() + 2 * 24 * 60 * 60 * 1000 + 13 * 60 * 60000), // +2 days 13:00
      endTime: new Date(baseDate.getTime() + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60000), // 14:00
      type: 'online',
      color: 'blue'
    },
    {
      id: 'apt-7',
      title: 'مقابلة عمل',
      description: 'مقابلة مع مرشح جديد',
      startTime: new Date(baseDate.getTime() + 3 * 24 * 60 * 60 * 1000 + 16 * 60 * 60000), // +3 days 16:00
      endTime: new Date(baseDate.getTime() + 3 * 24 * 60 * 60 * 1000 + 17 * 60 * 60000), // 17:00
      type: 'inPerson',
      color: 'yellow'
    },
    {
      id: 'apt-8',
      title: 'مكالمة مع العميل',
      description: 'مراجعة المشروع الحالي',
      startTime: new Date(baseDate.getTime() + 4 * 24 * 60 * 60 * 1000 + 11 * 60 * 60000), // +4 days 11:00
      endTime: new Date(baseDate.getTime() + 4 * 24 * 60 * 60 * 1000 + 12 * 60 * 60000), // 12:00
      type: 'online',
      color: 'purple'
    },
    {
      id: 'apt-9',
      title: 'مراجعة الميزانية',
      description: 'جلسة مراجعة الميزانية الفصلية',
      startTime: new Date(baseDate.getTime() + 5 * 24 * 60 * 60 * 1000 + 15 * 60 * 60000), // +5 days 15:00
      endTime: new Date(baseDate.getTime() + 5 * 24 * 60 * 60 * 1000 + 16 * 60 * 60000), // 16:00
      type: 'inPerson',
      color: 'green'
    }
  ];

  return appointments;
}


}

