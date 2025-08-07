import { ResetPassword } from './../../Components/reset-password/reset-password';
import { AuthServ } from './../auth-serv';
import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IloginRequest } from '../../../Core/Interfaces/ilogin';
import { map, Observable } from 'rxjs';
import { response } from 'express';
import { IResponse } from '../../../Core/Interfaces/iregister';
import { Environment } from '../../../../Environment/environment';
import { GeneralResponse } from '../../../Core/Interfaces/ILibrary/ilibrary';
import { IResatPassword } from '../../../Core/Interfaces/ilogin';
@Injectable({
  providedIn: 'root'
})
export class Login {

  _ = inject(HttpClient);

  
  constructor() { }

Login(Request: IloginRequest) : Observable<IResponse>
{

  
  return this._.post<IResponse>(Environment.apiUrl + 'Authentication/login', Request).pipe(
    map(data => {
      return data;
    })
  );

}
 _httpClient = inject(HttpClient)
  ForgetPassword(email:string):Observable<GeneralResponse<any>>{
    return this._httpClient.post<GeneralResponse<any>>(Environment.apiUrl + 'Authentication/forgot-password', email);
  }
  ResetPassword(token:string,reseatPassword:IResatPassword):Observable<GeneralResponse<any>>{
    return this._httpClient.post<GeneralResponse<any>>(Environment.apiUrl + 'Authentication/reset-password?token='+token, reseatPassword);
  }

}
