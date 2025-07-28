import { Environment } from '../../../../../../Environment/environment';
import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthServ } from '../../../../../Auth/Services/auth-serv';
@Injectable({
  providedIn: 'root'
})
export class AddAdminService {

  private Url = Environment.apiUrl;
  authServ = inject(AuthServ);
  _httpClient = inject(HttpClient);

 
   AddAdmin(AdminModel: any): Observable<{success: boolean}> {
     return this._httpClient.post<{success: boolean}>(this.Url + `Admin`, AdminModel);
   }
  

  constructor() { }
}
