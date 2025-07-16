export interface AvailbityResponse {
  success: boolean
  message: string
  data: Availbity[]
  statusCode: number
  errors: any[]
}

export interface Availbity {
  id: number
  advisorId: number
  advisorName: any
  date: string
  time: string
  duration: string
  consultationType: number
  isBooked: boolean
  notes: string
  createdAt: string
  updatedAt: any
}


export interface TakeAppointment {
  consultationId: number
  title: string
  description: string
  priority: string
  consultationType: number
  advisorAvailabilityId: number
}
