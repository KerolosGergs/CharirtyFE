import { Environment } from './../../../../../../Environment/environment';
import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  HelpRequest, IHelpType } from '../model/ihelp';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HelpService {

  private Url = Environment.apiUrl;

  _httpClient = inject(HttpClient);

  getHelpType(): Observable<IHelpType[]> {
    const URL = this.Url + 'HelpType';
    return this._httpClient.get<IHelpType[]>(URL).pipe();
   }
   AddHelp(help: any): Observable<{success: boolean}> {
     return this._httpClient.post<{success: boolean}>(this.Url + 'HelpRequest', help);
   }
 

  constructor() { }
}
