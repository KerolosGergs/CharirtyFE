export interface IReconcileRequestDTO {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  requestText: string;
  userId?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errorCode?: number;
}