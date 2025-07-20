import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../../../../Environment/environment';
import { map, Observable } from 'rxjs';
import { deleteMeditationResponse, getMidetationById, IMeditationResponse } from '../../Interfaces/imeditaion';

@Injectable({
  providedIn: 'root'
})
export class MidetationServ {
 
    _httpClient = inject(HttpClient);
    protected readonly _environment = Environment;
    
    _baseUrl = this._environment.apiUrl;

    getAllmidetations(): Observable<IMeditationResponse> {
      const url = `${this._baseUrl}Mediation`;
      
      return this._httpClient.get<IMeditationResponse>(url).pipe(
        map(data => {
          data.data.forEach(midetation => {
            midetation.imageUrl = `${this._environment.ImgUrl}${midetation.imageUrl}`
          })
              return data;
            }),
      
      );
    }
    // createNewAdvisor(advisor: FormData): Observable<IMeditationResponse> {
    //   debugger
    //   const url = `${this._baseUrl}Advisor`;
    //   return this._httpClient.post<IMeditationResponse>(url, advisor);
    // }

    deletemidetation(ID: number): Observable<deleteMeditationResponse> {
      const url = `${this._baseUrl}Mediation/${ID}`;
      return this._httpClient.delete<deleteMeditationResponse>(url);
    }
    getAdvisorById(id: number): Observable<getMidetationById> {
      const url = `${this._baseUrl}Mediation/${id}`;
      // console.log('Calling getAdvisorById with URL:', url);
      
      return this._httpClient.get<getMidetationById>(url).pipe(
        map(data => {
          data.data.imageUrl = `${this._environment.ImgUrl}${data.data.imageUrl}`
          return data;
        }),
      );
    }

    // getCategories(): Observable<ICategoryResponse> {
    //   const url = `${this._baseUrl}Consultation`;
    //   // console.log('Calling getCategories with URL:', url);
      
    //   return this._httpClient.get<ICategoryResponse>(url).pipe(
    //     map(data => {
    //       return data;
    //     }),
    //   );
    // }

//  
  }