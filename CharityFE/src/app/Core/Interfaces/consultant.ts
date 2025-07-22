export interface IConsultant {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: Date;
  avatar: string;
  selected: boolean;
}
export interface ConsultationType {
  id: number;
  name: string;
  showActions: boolean;
}

export interface ConsultationAppointment {
  id: number;
  consultant: string;
  userName: string;
  email: string;
  consultationType: string;
  date: string;
  time: string;
  showActions: boolean;
}

export interface AllConsultantResponse {
  success: boolean
  message: string
  data: IConsultantData[]
  statusCode: number
  errors: any[]
}

export interface IConsultantData {
  id: number
  consultationName: string
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: any
  advisorCount: number
  requestCount: number
  lectureCount: number
}
export interface AllRequestResponse {
  success: boolean
  message: string
  data: RequstedData[]
  statusCode: number
  errors: any[]
}

export interface RequstedData {
  id: number
  userId: string
  userName: any
  advisorId: number
  advisorName: any
  consultationId: number
  consultationName: any
  title: string
  description: string
  status: string
  priority: string
  requestDate: string
  confirmedDate: any
  completedDate: any
  response: string
  rating: any
  review: any
  consultationType: number
}