import { Injectable } from '@angular/core';
import { Environment } from '../../../Environment/environment';
import { HttpClient } from '@angular/common/http';
import { IApiResponse } from '../Interfaces/icomplaint';
import { Observable } from 'rxjs';
import { ICreateServiceOfferingDTO, IServiceOfferingDTO, IUpdateServiceOfferingDTO } from '../Interfaces/iservice';

@Injectable({
  providedIn: 'root'
})
export class Service {

  private baseUrl = `${Environment.apiUrl}/serviceoffering`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<IApiResponse<IServiceOfferingDTO[]>> {
    return this.http.get<IApiResponse<IServiceOfferingDTO[]>>(`${this.baseUrl}`);
  }

  getActive(): Observable<IApiResponse<IServiceOfferingDTO[]>> {
    return this.http.get<IApiResponse<IServiceOfferingDTO[]>>(`${this.baseUrl}/active`);
  }

  getById(id: number): Observable<IApiResponse<IServiceOfferingDTO>> {
    return this.http.get<IApiResponse<IServiceOfferingDTO>>(`${this.baseUrl}/${id}`);
  }

  create(dto: ICreateServiceOfferingDTO): Observable<IApiResponse<IServiceOfferingDTO>> {
    return this.http.post<IApiResponse<IServiceOfferingDTO>>(`${this.baseUrl}`, dto);
  }

  update(id: number, dto: IUpdateServiceOfferingDTO): Observable<IApiResponse<IServiceOfferingDTO>> {
    return this.http.put<IApiResponse<IServiceOfferingDTO>>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<IApiResponse<boolean>> {
    return this.http.delete<IApiResponse<boolean>>(`${this.baseUrl}/${id}`);
  }

  incrementClick(id: number): Observable<IApiResponse<boolean>> {
    return this.http.put<IApiResponse<boolean>>(`${this.baseUrl}/${id}/click`, {});
  }
}
