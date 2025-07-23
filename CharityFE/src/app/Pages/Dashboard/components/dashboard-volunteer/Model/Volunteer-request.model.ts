// export interface VolunteerRequest {
//   id: number;
//   name: string;
//   email: string;
//   phoneNumber: string;
//   notes: string;
//   helpTypeId: number;
//   helpTypeName: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

export interface VolunteerResponse {
  success: boolean
  message: string
  data: Volunteer[]
  statusCode: number
  errors: string[]
}

export interface Volunteer {
  id: number
  userId: string
  userName: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  address: string
  education: string
  status: string
}
