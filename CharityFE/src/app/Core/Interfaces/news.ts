export interface NewsArticle {
   id: number;
  title: string;
  content: string;
  summary: string;
  imageUrl: string;
  author: string;
  category: string;
  isPublished: boolean;
  createdAt: string;
  publishedAt?: string;
  updatedAt?: string;
  viewCount: number;
  tags: string[];
}
export interface INewsResponse {
  success: boolean
  message: string
  data: NewsArticle[]
  statusCode: number
  errors: string[]
}

export interface AddArticle {
  title: string
  content: string
  summary: string
  image: string
  category: string
  isPublished: boolean
  tags: string
}

export interface Appointment {
  id: number;
  advisorId: number;
  date: string; // ISO date string
  time: string; // e.g. '09:30', '14:00'
  isBooked: boolean;
}

export interface CalendarState {
    currentDate: Date;
    appointments: Appointment[];
    filteredAppointments: Appointment[];
    selectedMeetingType: 'inPerson' | 'online' | 'all';
    searchQuery: string;
}