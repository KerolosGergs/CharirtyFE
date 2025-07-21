import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../../../../Environment/environment';
import { AllConsultantResponse } from '../../Interfaces/consultant';
import { map, Observable } from 'rxjs';
import { AuthServ } from '../../../Auth/Services/auth-serv';

@Injectable({
  providedIn: 'root'
})
export class ConsultationServ {

    _httpClient = inject(HttpClient);
    protected readonly _environment = Environment;
    _auth = inject(AuthServ);
    _baseUrl = this._environment.apiUrl+'Consultation';
      token = this._auth.getToken(); // or retrieve it from a service

   headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`
  });

  constructor() { }

  getAllConsultations(): Observable<AllConsultantResponse> {
        const url = `${this._baseUrl}`;        
        return this._httpClient.get<AllConsultantResponse>(url).pipe(
          map(data => {
           
                return data;
              }),
        
        );
      }

  updateConsultation(id: number, data: FormData): Observable<{ success: boolean }> {
    const url = `${this._baseUrl}/${id}`;
    return this._httpClient.put<{ success: boolean }>(url, data, { headers: this.headers });
  }
  createConsultation(data: FormData): Observable<{ success: boolean }> {
    const url = `${this._baseUrl}`;
    return this._httpClient.post<{ success: boolean }>(url, data, { headers: this.headers });
  }
  DeleteConsultation(id: number): Observable<{ success: boolean }> {
    const url = `${this._baseUrl}/${id}`;
    return this._httpClient.delete<{ success: boolean }>(url, { headers: this.headers });
  } 
}
