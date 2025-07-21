// appointment.interface.ts
export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked?: boolean;
  clientName?: string;
  clientEmail?: string;
  notes?: string;
}

export interface CalendarDay {
  date: number;
  dayName: string;
  fullDate: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isAvailable: boolean;
  timeSlots: TimeSlot[];
  isWeekend?: boolean;
  isPastDate?: boolean;
}

export interface CalendarWeek {
  weekNumber: number;
  days: CalendarDay[];
}

export interface AppointmentSettings {
  isGenerallyAvailable: boolean;
  appointmentType: 'online' | 'inperson';
  defaultTimeSlotDuration: number; // in minutes
  bufferTime: number; // in minutes between appointments
  workingHours: {
    start: string;
    end: string;
  };
  workingDays: number[]; // 0 = Sunday, 1 = Monday, etc.
}

export interface AppointmentCalendarData {
  currentMonth: number;
  currentYear: number;
  settings: AppointmentSettings;
  calendarWeeks: CalendarWeek[];
}

export interface TimeSlotFormData {
  startTime: string;
  endTime: string;
}

export interface AppointmentEvent {
  type: 'day-availability-changed' | 'time-slot-added' | 'time-slot-removed' | 'settings-changed';
  data: any;
  timestamp: Date;
}

