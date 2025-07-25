export interface Volunteer {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
  education: string;
}


export interface VolunteerResponse {
  success: boolean
  message: string
  data: any
  statusCode: number
  errors: any[]
}
