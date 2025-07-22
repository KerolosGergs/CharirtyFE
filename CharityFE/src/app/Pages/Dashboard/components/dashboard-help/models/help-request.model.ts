export interface HelpRequest {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  notes: string;
  helpTypeId: number;
  helpTypeName: string;
  createdAt: Date;
  updatedAt: Date;
}

