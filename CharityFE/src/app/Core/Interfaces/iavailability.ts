export enum IConsultationType {
  Online = 0,
  InPerson = 1,
  Both = 2,
}

export interface IAdvisorAvailability {
  id: number;
  advisorId: number;
  advisorName: string;
  date: string;
  time: string;
  duration: string;
  consultationType: IConsultationType;
  isBooked: boolean;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ICreateAvailability {
  advisorId: number;
  date: string;
  time: string;
  duration: string;
  consultationType: IConsultationType;
  notes?: string;
}

export interface IBulkAvailability {
  availabilities: ICreateAvailability[];
}
