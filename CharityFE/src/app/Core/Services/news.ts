import { AddArticle, NewsArticle } from './../Interfaces/news';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Environment } from '../../../Environment/environment';
import { INewsResponse } from '../Interfaces/news';
import { AuthServ } from '../../Auth/Services/auth-serv';

@Injectable({
  providedIn: 'root'
})
export class News {

  protected readonly _environment = Environment;
  _httpClient = inject(HttpClient)
  _router = inject(Router)
    Auth = inject(AuthServ);
  
     token = this.Auth.getToken();

    headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    });
      
  _baseUrl = this._environment.apiUrl;
  
  getAllNews(): Observable<INewsResponse> {
    const url = `${this._baseUrl}news`;
    // console.log('Calling getAllAdvisors with URL:', url);   
    return this._httpClient.get<INewsResponse>(url).pipe(
      map(data => {
       data.data.forEach(element => {
         element.tags = element.tags.toString().split(',').map((tag) => tag.trim());
         element.imageUrl=`${this._environment.ImgUrl}${element.imageUrl}`
       });
             return data;
          }),        
    );
  }
 createNewNews(AddNew: FormData): Observable<INewsResponse> {
      
      const url = `${this._baseUrl}News`;
      return this._httpClient.post<INewsResponse>(url, AddNew,{headers: this.headers});
    }
updateNews(id: number, data: FormData): Observable<{ success: boolean }> {
  return this._httpClient.put<{ success: boolean }>(`${this._baseUrl}News/${id}`, data,{headers: this.headers});
}

getNewsById(id: number): Observable<{ data: NewsArticle }> {
  return this._httpClient.get<{ data: NewsArticle }>(`${this._baseUrl}News/${id}`);
}

  constructor() { }
}
