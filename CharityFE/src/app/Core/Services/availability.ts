import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAdvisorAvailability, IBulkAvailability, ICreateAvailability } from '../Interfaces/iavailability';

@Injectable({
  providedIn: 'root'
})
export class Availability {

  private readonly baseUrl = 'https://localhost:7121/api/Advisor';

  constructor(private http: HttpClient) {}

  getAllAvailability(advisorId: number): Observable<IAdvisorAvailability[]> {
    return this.http.get<IAdvisorAvailability[]>(`${this.baseUrl}/${advisorId}/availability`);
  }

  getAvailabilityById(id: number): Observable<IAdvisorAvailability> {
    return this.http.get<IAdvisorAvailability>(`${this.baseUrl}/availability/${id}`);
  }

  createAvailability(data: ICreateAvailability): Observable<IAdvisorAvailability> {
    return this.http.post<IAdvisorAvailability>(`${this.baseUrl}/availability`, data);
  }

  createBulkAvailability(data: IBulkAvailability): Observable<IAdvisorAvailability[]> {
    return this.http.post<IAdvisorAvailability[]>(`${this.baseUrl}/bulk-availability`, data);
  }

  deleteAvailability(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/availability/${id}`);
  }
}
