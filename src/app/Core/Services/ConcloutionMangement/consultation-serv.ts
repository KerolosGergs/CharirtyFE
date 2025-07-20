import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../../../../Environment/environment';
import { AllConsultantResponse } from '../../Interfaces/consultant';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultationServ {

    _httpClient = inject(HttpClient);
    protected readonly _environment = Environment;
    
    _baseUrl = this._environment.apiUrl+'Consultation';
  constructor() { }

  getAllConsultations(): Observable<AllConsultantResponse> {
        const url = `${this._baseUrl}`;        
        return this._httpClient.get<AllConsultantResponse>(url).pipe(
          map(data => {
           
                return data;
              }),
        
        );
      }
}
