export interface IAdvisor {
    id: number;
    name: string;
    description: string;
    status: string;
}

export interface ICategory {
    id: number;
    consultationName: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string | null;
    advisorCount: number;
    requestCount: number;
    lectureCount: number;
}

export interface ICategoryResponse {
    success: boolean;
    message: string;
    data: ICategory[];
    statusCode: number;
    errors: string[];
}

export interface IAdvisorResponse {
  success: boolean
  message: string
  data: advisor[]
  statusCode: number
  errors: string[]
}

export interface getAdvisorByIdResponse {
  success: boolean
  message: string
  data: advisor
  statusCode: number
  errors: string[]
}

export interface advisor {
  id: number
  userId: string
  userName: string
  fullName:string
  firstName: string
  lastName: string
  specialty: string
  description: string
  zoomRoomUrl: string
  phoneNumber: string
  email: string
  isActive: boolean
  isAvailable: boolean
  createdAt: string
  updatedAt: string
  consultationId: number
  consultationName: string
  totalConsultations: number
  pendingRequests: number
  averageRating: number
  imageUrl:string
}




export interface ICreateAdvisor {
  fullName: string;
  specialty: string;
  description?: string;
  zoomRoomUrl?: string;
  phoneNumber: string;
  email: string;
  consultationId?: number;
  password: string;
}

export interface ICreateAdvisorMinimal {
  fullName: string;
  specialty: string;
  phoneNumber: string;
  email: string;
  password: string;
  Description: string;
  ZoomRoomUrl: string;
  Image?:File;
}
export interface DeleateAdvisorResponse {
  success: boolean
  message: string
  data: boolean
  statusCode: number
  errors: string[]
}
