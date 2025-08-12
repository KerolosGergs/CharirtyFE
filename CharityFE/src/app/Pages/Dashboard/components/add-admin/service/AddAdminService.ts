import { Environment } from '../../../../../../Environment/environment';
import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthServ } from '../../../../../Auth/Services/auth-serv';
export interface GenerailResponse {
  success: boolean
  message: string
  data: Iuser
  statusCode: number
  errors: string[]
}
export interface Iuser {
  id: number
  userId: string
  fullName: string
  email: string
  phoneNumber: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}


@Injectable({
  providedIn: 'root'
})
export class AddAdminService {

  private Url = Environment.apiUrl;
  authServ = inject(AuthServ);
  _httpClient = inject(HttpClient);

 
   AddAdmin(AdminModel: any): Observable<GenerailResponse> {
     return this._httpClient.post<GenerailResponse>(this.Url + `Admin`, AdminModel);
   }
  
   GetAdminData(): Observable<GenerailResponse> {
     return this._httpClient.get<GenerailResponse>(this.Url + `Admin`);
   }
  constructor() { }
}
