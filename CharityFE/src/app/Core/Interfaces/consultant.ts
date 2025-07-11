export interface IConsultant {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: Date;
  avatar: string;
  selected: boolean;
}