import { Injectable } from '@angular/core';
import { Environment } from '../../../Environment/environment';
import { HttpClient } from '@angular/common/http';
import { IApiResponse } from '../Interfaces/iconsultation';
import { Observable } from 'rxjs';
import { ConsultationAppointment, IConsultationDTO, IUpdateConsultationDTO } from '../Interfaces/iconsultation';

@Injectable({
  providedIn: 'root'
})
export class Consultaion {

    private baseUrl = `${Environment.apiUrl}/consultation`;

  constructor(private http: HttpClient) {}

getAppointments(): Observable<IApiResponse<ConsultationAppointment[]>> {
  return this.http.get<IApiResponse<ConsultationAppointment[]>>(`${Environment.apiUrl}/Consultation`);
}

  getActive(): Observable<IApiResponse<IConsultationDTO[]>> {
    return this.http.get<IApiResponse<IConsultationDTO[]>>(`${this.baseUrl}/active`);
  }

  getById(id: number): Observable<IApiResponse<IConsultationDTO>> {
    return this.http.get<IApiResponse<IConsultationDTO>>(`${this.baseUrl}/${id}`);
  }

  create(dto: Partial<IConsultationDTO>): Observable<IApiResponse<IConsultationDTO>> {
    return this.http.post<IApiResponse<IConsultationDTO>>(`${this.baseUrl}`, dto);
  }

  update(id: number, dto: IUpdateConsultationDTO): Observable<IApiResponse<IConsultationDTO>> {
    return this.http.put<IApiResponse<IConsultationDTO>>(`${this.baseUrl}/${id}`, dto);
  }

  deleteAppointment(id: number): Observable<IApiResponse<boolean>> {
  return this.http.delete<IApiResponse<boolean>>(`${Environment.apiUrl}/appointments/${id}`);
}

  getStatistics(): Observable<IApiResponse<object>> {
    return this.http.get<IApiResponse<object>>(`${this.baseUrl}/statistics`);
  }
}
