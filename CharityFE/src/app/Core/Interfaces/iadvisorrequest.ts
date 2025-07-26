export enum ConsultationType {
  Online = 0,
  Offline = 1
}

export interface AdviceRequestDTO {
  id: number;
  userId: string;
  userName: string;
  advisorId?: number;
  advisorName: string;
  consultationId: number;
  consultationName: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  requestDate: Date;
  confirmedDate?: Date;
  completedDate?: Date;
  response?: string;
  rating?: number;
  review?: string;
  consultationType: ConsultationType;
}

export interface CreateAdviceRequestDTO {
  consultationId: number;
  title: string;
  description: string;
  priority: string;
  consultationType?: ConsultationType;
  advisorAvailabilityId: number;
}

export interface UpdateAdviceRequestDTO {
  title?: string;
  description?: string;
  priority?: string;
  consultationType?: ConsultationType;
}

export interface CompleteRequestDTO {
  response: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
  statusCode: number;
}


export interface AdvisorRequest {
  id: number;
  userId: string;
  userFullName: string;
  userEmail: string;
  advisorId: number;
  advisorFullName: string | null;
  consultationId: number;
  consultationName: string | null;
  appointmentTime: string; // ISO string
  notes: string | null;
  status: string; // or 'Pending' | 'Approved' | 'Rejected'
}

export interface AdvisorRequestApiResponse {
  success: boolean;
  message: string;
  data: AdvisorRequest[];
  statusCode: number;
  errors: any[];
}
