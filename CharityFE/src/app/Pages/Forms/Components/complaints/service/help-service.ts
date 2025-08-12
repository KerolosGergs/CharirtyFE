import { Environment } from './../../../../../../Environment/environment';
import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {   RequestModel } from '../model/ihelp';
import { HttpClient } from '@angular/common/http';
export type ComplaintPayload = {
  userName: string;
  email: string;
  phoneNumber: string;
  description: string; // title + "\n\n" + message
  category: number;
};
@Injectable({
  providedIn: 'root'
})
export class HelpService {

  private Url = Environment.apiUrl+"Complaint";

  _httpClient = inject(HttpClient);
createRequest(data: RequestModel): Observable<any> {
    console.log(data);
  return this._httpClient.post(this.Url, data);
  }
  createComplain(data: ComplaintPayload): Observable<any> {
    console.log(data);
  return this._httpClient.post(this.Url, data);
  }
 

  constructor() { }
}
