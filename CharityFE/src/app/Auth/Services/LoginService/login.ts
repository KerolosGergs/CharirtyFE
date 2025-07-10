import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IloginRequest } from '../../../Core/Interfaces/ilogin';
import { map, Observable } from 'rxjs';
import { response } from 'express';
import { IResponse } from '../../../Core/Interfaces/iregister';
import { Environment } from '../../../../Environment/environment';

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

}
