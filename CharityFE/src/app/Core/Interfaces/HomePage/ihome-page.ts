export interface GeneralResponse<T> {
  success: boolean
  message: string
  data: T
  statusCode: number
  errors: string[]
}

export interface IHeroSection {
  mainTitle: string
  backgroundImageUrl: string
  stats1Label: string
  stats1Value: number
  stats2Label: string
  stats2Value: number
  stats3Label: string
  stats3Value: number
  stats4Label: string
  stats4Value: number
}

export interface putHeroSection{
    MainTitle:string
    BackgroundImageUrl: string
    Stats1Label: string
    Stats1Value: number
    Stats2Label: string
    Stats2Value: number
    Stats3Label: string
    Stats3Value: number
    Stats4Label: string
    Stats4Value: number
}
export interface IVideoSection{
  id: number
  title: string
  description: string
  videoUrl: string
}

export interface putVideoSection{
  Title: string
  Description: string
  VideoUrl: string
}

export interface ITrendSection {
  id: number
  title: string
  description: string
  imageUrl: string
  buttonText: string
  buttonUrl: string
}
export interface putTrendSection{
  Title: string
  Description: string
  ImageUrl: string
  ButtonText: string
  ButtonUrl: string
}