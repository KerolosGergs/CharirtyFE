import { Injectable } from '@angular/core';
import { Environment } from '../../../Environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComplaintStatus, IApiResponse, IComplaintDTO, ICreateComplaintDTO, IUpdateComplaintDTO } from '../Interfaces/icomplaint';

@Injectable({
  providedIn: 'root'
})
export class Complaint {
  private readonly baseUrl = `${Environment.apiUrl}/complaint`;

  constructor(private http: HttpClient) {}

  getAllComplaints(): Observable<IApiResponse<IComplaintDTO[]>> {
    return this.http.get<IApiResponse<IComplaintDTO[]>>(this.baseUrl);
  }

  getUserComplaints(): Observable<IApiResponse<IComplaintDTO[]>> {
    return this.http.get<IApiResponse<IComplaintDTO[]>>(`${this.baseUrl}/user`);
  }

  getComplaintStatistics(): Observable<IApiResponse<any>> {
    return this.http.get<IApiResponse<any>>(`${this.baseUrl}/statistics`);
  }

  createComplaint(dto: ICreateComplaintDTO): Observable<IApiResponse<IComplaintDTO>> {
    return this.http.post<IApiResponse<IComplaintDTO>>(this.baseUrl, dto);
  }

  updateComplaint(id: number, dto: IUpdateComplaintDTO): Observable<IApiResponse<IComplaintDTO>> {
    return this.http.put<IApiResponse<IComplaintDTO>>(`${this.baseUrl}/${id}`, dto);
  }

  updateComplaintStatus(id: number, status: ComplaintStatus): Observable<IApiResponse<IComplaintDTO>> {
    return this.http.put<IApiResponse<IComplaintDTO>>(`${this.baseUrl}/${id}/status`, status);
  }

  deleteComplaint(id: number): Observable<IApiResponse<boolean>> {
    return this.http.delete<IApiResponse<boolean>>(`${this.baseUrl}/${id}`);
  }
}
