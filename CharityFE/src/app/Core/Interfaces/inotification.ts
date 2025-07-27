export enum NotificationType {
  General = 0,
  Complaint = 1,
  Consultation = 2,
  Appointment = 3
}

export interface NotificationDTO {
  id: number;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string; // ISO date string
  type: NotificationType;
}

export interface NotificationCreateDTO {
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
}

// Generic ApiResponse wrapper
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  statusCode?: number;
  data: T;
}
