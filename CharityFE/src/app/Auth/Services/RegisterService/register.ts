import { map, Observable } from 'rxjs';
import { response } from 'express';
import { IregisterRequest, IResponse } from './../../../Core/Interfaces/iregister';
import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../../../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class Register {


 _= inject(HttpClient);


  constructor() { }

 Register(request: IregisterRequest): Observable<IResponse> {
  return this._.post<IResponse>(Environment.apiUrl + 'Authentication/register', request);
}


}
