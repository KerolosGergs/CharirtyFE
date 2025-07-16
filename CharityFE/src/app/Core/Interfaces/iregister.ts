export interface IregisterRequest {
  fullName: string
  email: string
  phoneNumber: string
  address: string
  password: string
  confirmPassword: string
  userName: string
}


export interface IResponse {
  success: boolean
  message: string
  data: LoginData
}

export interface LoginData {
  fullName: string
  email: string
  role: string
  token: string
  user: User
}

export interface User {
  id: string
  fullName: string
  email: string
  phoneNumber: any
  address: any
  isActive: boolean
}