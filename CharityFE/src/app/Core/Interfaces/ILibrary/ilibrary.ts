export interface GeneralResponse <T> {
  success: boolean
  message: string
  data: T
  statusCode: number
  errors: string[]
}

export interface ImageItem {
  id: number
  name: string
  imageUrl: string
  description: string
  isActive: boolean
}
export interface VideoItem{
  id: number
  name: string
  description: string
  videoUrl: string
  isActive: boolean
}
 
