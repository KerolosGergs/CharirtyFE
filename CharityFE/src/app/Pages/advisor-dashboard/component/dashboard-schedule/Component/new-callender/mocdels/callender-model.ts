export interface BookedAppointment {
  id: number;
  userId: string;
  userFullName: string;
  userEmail: string;
  advisorId: number;
  advisorFullName: string;
  consultationId: number;
  consultationName: string;
  date: string;
  time: string;
  duration: string;
  notes: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

export interface AvailableSlot {
  id: number;
  advisorId: number;
  advisorName: string | null;
  date: string;
  time: string;
  duration: string;
  consultationType: number;
  isBooked: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string | null;
}
export interface AddAvailableSlot {
  advisorId: number
  date: string
  time: string
  duration: string
  consultationType: number
  notes: string
}


export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  statusCode: number;
  errors: any[];
}

export interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  appointments: BookedAppointment[];
  availableSlots: AvailableSlot[];
}

export interface NewAppointment {
  date: string;
  time: string;
  duration: string;
  notes: string;
  consultationType?: number;
}