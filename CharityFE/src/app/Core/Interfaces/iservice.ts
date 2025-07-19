// src/app/models/service-offering.models.ts
export interface IServiceOfferingDTO {
  id: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  clickCount: number;
  contactInfo: string;
  requirements: string;
}

export interface ICreateServiceOfferingDTO {
  name: string;
  description: string;
  category: string;
  imageUrl?: string;
  isActive: boolean;
  contactInfo?: string;
  requirements?: string;
}

export interface IUpdateServiceOfferingDTO {
  name?: string;
  description?: string;
  category?: string;
  imageUrl?: string;
  isActive?: boolean;
  contactInfo?: string;
  requirements?: string;
}

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  statusCode?: number;
  errors?: string[];
}
