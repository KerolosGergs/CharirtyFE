export interface IMeditationResponse {
  success: boolean
  message: string
  data: IMeditation[]
  statusCode: number
  errors: string[]
}

export interface IMeditation {
  id: number
  userId: string
  fullName: string
  imageUrl: string
  isActive: boolean
  isAvailable: boolean
  createdAt: string
  phoneNumber: string
  email: string
}

export interface deleteMeditationResponse {
  success: boolean
  message: string
  data: boolean
  statusCode: number
  errors: string[]
}

export interface getMidetationById {
  success: boolean
  message: string
  data: IMeditation
  statusCode: number
  errors: string[]
}

