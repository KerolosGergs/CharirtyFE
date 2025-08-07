import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../Config/api-routes.config';

// News interfaces
export interface News {
  id?: number;
  title: string;
  content: string;
  summary?: string;
  imageUrl?: string;
  isPublished: boolean;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
}

export interface CreateNewsDto {
  title: string;
  content: string;
  summary?: string;
  imageUrl?: string;
}

export interface UpdateNewsDto {
  title: string;
  content: string;
  summary?: string;
  imageUrl?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
}

@Injectable({ providedIn: 'root' })
export class NewsApiService {
  constructor(private http: HttpClient) {}

  // Get all news
  getAllNews(): Observable<ApiResponse<News[]>> {
    return this.http.get<ApiResponse<News[]>>(ApiRoutes.News.getAll);
  }

  // Get published news
  getPublishedNews(): Observable<ApiResponse<News[]>> {
    return this.http.get<ApiResponse<News[]>>(ApiRoutes.News.getPublished);
  }

  // Get news by ID
  getNewsById(id: number): Observable<ApiResponse<News>> {
    return this.http.get<ApiResponse<News>>(ApiRoutes.News.getById(id));
  }

  // Create news
  createNews(newsData: CreateNewsDto): Observable<ApiResponse<News>> {
    return this.http.post<ApiResponse<News>>(ApiRoutes.News.create, newsData);
  }

  // Update news
  updateNews(id: number, newsData: UpdateNewsDto): Observable<ApiResponse<News>> {
    return this.http.put<ApiResponse<News>>(ApiRoutes.News.update(id), newsData);
  }

  // Delete news
  deleteNews(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(ApiRoutes.News.delete(id));
  }

  // Publish news
  publishNews(id: number): Observable<ApiResponse<News>> {
    return this.http.patch<ApiResponse<News>>(ApiRoutes.News.publish(id), {});
  }

  // Unpublish news
  unpublishNews(id: number): Observable<ApiResponse<News>> {
    return this.http.patch<ApiResponse<News>>(ApiRoutes.News.unpublish(id), {});
  }
} 