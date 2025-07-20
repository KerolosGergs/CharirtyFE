export enum ComplaintCategory {
  Employee = 0,
  Service = 1,
  Facility = 2,
  Other = 3,
}

export enum ComplaintStatus {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Resolved = 'Resolved',
  Closed = 'Closed',
}

export interface IComplaintDTO {
  id: number;
  userId: string;
  userName: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt?: string;
  resolution?: string;
}

export interface ICreateComplaintDTO {
  userId: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: string;
}

export interface IUpdateComplaintDTO {
  title?: string;
  description?: string;
  category?: ComplaintCategory;
  priority?: string;
  status?: ComplaintStatus;
  resolution?: string;
}

export interface IApiResponse<T> {
  success: boolean;
  message?: string;
  statusCode: number;
  errors?: string[];
  data: T;
}
