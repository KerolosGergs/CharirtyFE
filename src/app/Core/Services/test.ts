// appointment.interface.ts
export interface Appointment {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  type: 'inPerson' | 'online';
  color: 'blue' | 'green' | 'purple' | 'yellow';
}

export interface CalendarState {
  currentDate: Date;
  appointments: Appointment[];
  filteredAppointments: Appointment[];
  selectedMeetingType: 'inPerson' | 'online' | 'all';
  searchQuery: string;
}

export interface DayInfo {
  name: string;
  number: number;
  date: Date;
}

export interface TimeSlot {
  hour: number;
  label: string;
}

export interface AppointmentPosition {
  top: number;
  height: number;
  left: number;
  width: number;
}
