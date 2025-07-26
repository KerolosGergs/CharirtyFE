import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Environment } from '../../../Environment/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AdviceRequestDTO } from '../Interfaces/iadvisorrequest';

export interface IAdviceRequestDTO {
  id: number;
  userId: string;
  userName: string;
  advisorId?: number;
  advisorName?: string;
  consultationId: number;
  consultationName: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  requestDate: Date;
  confirmedDate?: Date;
  completedDate?: Date;
  response?: string;
  rating?: number;
  review?: string;
  consultationType: number;
  userEmail?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
  errors: string[];
}

@Injectable({
  providedIn: 'root'
})
export class Advicereques {
  private baseUrl = `${Environment.apiUrl}advicerequest`;
  private advisorId: string | null = null;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.advisorId = localStorage.getItem('advisorId');
    }
  }


  getAllRequests(): Observable<ApiResponse<AdviceRequestDTO[]>> {
    return this.http.get<ApiResponse<AdviceRequestDTO[]>>(`${this.baseUrl}`);
  }

  confirmRequest(id: number): Observable<ApiResponse<AdviceRequestDTO>> {
    return this.http.put<ApiResponse<AdviceRequestDTO>>(`${this.baseUrl}/${id}/confirm`, {});
  }

  getRequestsForAdvisor(advisorId: string): Observable<ApiResponse<IAdviceRequestDTO[]>> {
    return this.http.get<ApiResponse<IAdviceRequestDTO[]>>(`${this.baseUrl}/advisor/${advisorId}`);
  }

  getRequestById(id: number): Observable<IAdviceRequestDTO> {
    return this.http.get<ApiResponse<IAdviceRequestDTO>>(`${this.baseUrl}/${id}`).pipe(
      map(res => res.data)
    );
  }

  cancelRequest(id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${this.baseUrl}/${id}`);
  }

  // cancelRequest(requestId: number): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/${requestId}`);
  // }
}
