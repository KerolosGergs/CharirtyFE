import { Environment } from '../../../../../../Environment/environment';
import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthServ } from '../../../../../Auth/Services/auth-serv';
import {Volunteer} from './../model/IVolunteer';
import { VolunteerResponse } from '../../../../Dashboard/components/dashboard-volunteer/Model/Volunteer-request.model';
@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  private Url = Environment.apiUrl;
  authServ = inject(AuthServ);
  _httpClient = inject(HttpClient);

  // getHelpType(): Observable<IHelpType[]> {
  //   const URL = this.Url + 'HelpType';
  //   return this._httpClient.get<IHelpType[]>(URL).pipe();
  //  }
   
  submitVolunteerForm(formData: Volunteer): Observable<VolunteerResponse> {
    return this._httpClient.post<VolunteerResponse>(this.Url+'Volunteer?userId='+this.authServ.getUserID()+'', formData);
  
  }


}
