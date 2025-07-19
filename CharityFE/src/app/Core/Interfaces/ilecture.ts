export enum LectureType {
  Video = 'Video',
  Audio = 'Audio',
  Document = 'Document',
  Presentation = 'Presentation'
}
export interface ILecture {
  id: number;
  title: string;
  description: string;
  speaker: string;
  type: LectureType;
  videoUrl: string;
  thumbnailUrl: string;
  filePath: string;
  fileSize: number;
  fileFormat: string;
  duration: number;
  isPublished: boolean;
  createdAt: string;
  publishedAt?: string;
  updatedAt?: string;
  viewCount: number;
  downloadCount: number;
  consultationId?: number;
  consultationName: string;
  tags: string[];
  createdBy: string;
  createdByName: string;
}

export interface CreateLecture {
  title: string;
  description: string;
  speaker: string;
  type: LectureType;
  videoUrl?: string;
  thumbnailUrl?: string;
  consultationId?: number;
  tags: string[];
}

export interface UpdateLecture {
  title?: string;
  description?: string;
  speaker?: string;
  type?: LectureType;
  videoUrl?: string;
  thumbnailUrl?: string;
  consultationId?: number;
  tags?: string[];
}
export interface LectureUpload {
  title: string;
  description: string;
  speaker: string;
  type: LectureType;
  videoFile: File;
  consultationId?: number;
  tags: string[];
}

export interface LectureSearch {
  searchTerm?: string;
  type?: LectureType;
  consultationId?: number;
  speaker?: string;
  page: number;
  pageSize: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
  statusCode?: number;
}