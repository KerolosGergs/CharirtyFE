import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, CreateLecture, UpdateLecture, ILecture } from '../Interfaces/ilecture';
import { Environment } from '../../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class Lecture {
  private baseUrl = `${Environment.apiUrl}lecture`;

  constructor(private http: HttpClient) {}

  getAllLectures(): Observable<ApiResponse<ILecture[]>> {
    return this.http.get<ApiResponse<ILecture[]>>(this.baseUrl);
  }

  getPublishedLectures(): Observable<ApiResponse<ILecture[]>> {
    return this.http.get<ApiResponse<ILecture[]>>(`${this.baseUrl}/published`);
  }

  createLectureByLink(data: CreateLecture): Observable<ApiResponse<ILecture>> {
    return this.http.post<ApiResponse<ILecture>>(this.baseUrl, data);
  }

  uploadLectureVideo(data: FormData): Observable<ApiResponse<ILecture>> {
    return this.http.post<ApiResponse<ILecture>>(`${this.baseUrl}/upload`, data);
  }

  updateLecture(id: number, data: UpdateLecture): Observable<ApiResponse<ILecture>> {
    return this.http.put<ApiResponse<ILecture>>(`${this.baseUrl}/${id}`, data);
  }

  deleteLecture(id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${this.baseUrl}/${id}`);
  }

  publishLecture(id: number): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(`${this.baseUrl}/${id}/publish`, {});
  }
    UnpublishLecture(id: number): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(`${this.baseUrl}/${id}/unpublish`, {});
  }
}
