import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../../../../Environment/environment';
import { TakeAppointment } from '../../Interfaces/iappointment';
import { Observable } from 'rxjs';
import { AuthServ } from '../../../Auth/Services/auth-serv';

@Injectable({
  providedIn: 'root'
})
export class Appointment {
  _httpClient = inject(HttpClient);
  protected readonly _environment = Environment;
  _baseUrl = this._environment.apiUrl;
  Auth = inject(AuthServ);

  createAdviceRequest(takeAppointment: TakeAppointment): Observable<{ success: boolean, message: string }> {
    const token = this.Auth.getToken();
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
   
    const url = `${this._baseUrl}AdviceRequest?userId=`+this.Auth.getUserID();
    return this._httpClient.post<{ success: boolean, message: string }>(
      url,
      takeAppointment,
      { headers }
    );
    
  }
}
