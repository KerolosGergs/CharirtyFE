import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Environment } from '../../../Environment/environment';
import { INewsResponse } from '../Interfaces/news';

@Injectable({
  providedIn: 'root'
})
export class News {

  _httpClient = inject(HttpClient)
  _router = inject(Router)

  protected readonly _environment = Environment;
      
  _baseUrl = this._environment.apiUrl;
  
  getAllNews(): Observable<INewsResponse> {
    const url = `${this._baseUrl}news`;
    console.log('Calling getAllAdvisors with URL:', url);   
    return this._httpClient.get<INewsResponse>(url).pipe(
      map(data => {
             return data;
          }),        
    );
  }

  constructor() { }
}
