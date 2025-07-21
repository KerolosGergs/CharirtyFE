// consultation.model.ts
export interface IConsultationDTO {
  id: number;
  consultationName: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  advisorCount: number;
  requestCount: number;
  lectureCount: number;
}

export interface IUpdateConsultationDTO {
  consultationName: string;
  description?: string;
  isActive?: boolean;
}

export interface IConsultationWithAdvisorsDTO extends IConsultationDTO {
  advisors: IAdvisorSummaryDTO[];
}

export interface IAdvisorSummaryDTO {
  id: number;
  fullName: string;
  specialty: string;
  description: string;
  isAvailable: boolean;
  activeRequestCount: number;
}

// API Response wrapper
export interface IApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
  statusCode?: number;
}
export interface ConsultationAppointment {
  id: number;
  consultationName: string;
  description: string;
  isActive: boolean;
  createdAt: string;      // ISO date string
  updatedAt: string | null;
  advisorCount: number;
  requestCount: number;
  lectureCount: number;
}
