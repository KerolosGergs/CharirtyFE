export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
  errors: any[];
}
export enum ConsultationType {
  Online = 0,
  InPerson = 1,
  Both = 2
}

export interface AdvisorAvailabilityDTOO {
  id: number;
  advisorId: number;
  advisorName: string | null;
  date: string; // ISO string format
  time: string; // "HH:mm:ss"
  duration: string; // "HH:mm:ss"
  consultationType: ConsultationType;
  isBooked: boolean;
  notes: string | null;
  createdAt: string;
  updatedAt: string | null;
}
