export interface IServiceOfferingDTO {
  id: number
  title: string
  description: string
  serviceItem: ServiceItem[]
}

export interface ServiceItem {
  id: number
  name: string
  description: string
  imageUrl: string
  isActive: boolean
  url: string
  createdAt: string
  updatedAt: any
}
export interface IUpdateServiceOfferingDTO {
  title: string
  description: string
}


export interface ICreateServiceOfferingItemDTO {
  Name : string;
  Description : string;
  Url :string;
  Image: File;
  IsActive: boolean;
}

export interface UpdateServiceItem {
  Name : string;
  Description : string;
  Url :string;
  Image: File;
  IsActive: boolean;
}

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  statusCode?: number;
  errors?: string[];
}
