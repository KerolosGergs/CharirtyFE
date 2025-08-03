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
  consultationType: ConsultationStatus
  isBooked: boolean
  notes: string
  createdAt: string
  updatedAt: any
}
 enum ConsultationStatus
{
    Pending = 0,
    Confirmed = 1,
    Completed = 2,
    Cancelled = 3,
    InProgress = 4
}

export interface TakeAppointment {
  consultationId: number
  title: string
  description: string
  priority: string
  consultationType: number
  advisorAvailabilityId: number
}
