import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../Environment/environment';
import { IApiResponse, IReconcileRequestDTO } from '../Interfaces/ireconcilerequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Reconcilerequest {

  private baseUrl = Environment.apiUrl + 'reconcilerequest';

  constructor(private http: HttpClient) { }

  getAll(): Observable<IApiResponse<IReconcileRequestDTO[]>> {
    return this.http.get<IApiResponse<IReconcileRequestDTO[]>>(this.baseUrl);
  }

  deleteById(id: number): Observable<IApiResponse<boolean>> {
    return this.http.delete<IApiResponse<boolean>>(`${this.baseUrl}/${id}`);
  }
}
