import { RequestRepair } from '../request-repair';
import { Environment } from '../../../../../../Environment/environment';
import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  HelpRequest, IHelpType } from '../model/ihelp';
import { HttpClient } from '@angular/common/http';
import { AuthServ } from '../../../../../Auth/Services/auth-serv';
@Injectable({
  providedIn: 'root'
})
export class RequestRepairService {

  private Url = Environment.apiUrl;
  authServ = inject(AuthServ);
  _httpClient = inject(HttpClient);

  // getHelpType(): Observable<IHelpType[]> {
  //   const URL = this.Url + 'HelpType';
  //   return this._httpClient.get<IHelpType[]>(URL).pipe();
  //  }
   AddRequestRapir(help: any): Observable<{success: boolean}> {
     return this._httpClient.post<{success: boolean}>(this.Url + `ReconcileRequest?userId=${this.authServ.getUserID()}`, help);
   }
  

  constructor() { }
}
