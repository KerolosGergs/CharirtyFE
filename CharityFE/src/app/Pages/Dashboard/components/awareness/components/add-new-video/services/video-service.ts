import { AuthServ } from './../../../../../../../Auth/Services/auth-serv';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from '../../../../../../../../Environment/environment';
import { Video } from '../models/video-model';
import { env } from 'process';
@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private baseUrl = Environment.apiUrl; 
  private AuthServ = inject(AuthServ)
  constructor(private http: HttpClient) {}

  addVideo(video: Video): Observable<any> {
    return this.http.post<any>(this.baseUrl+`Lecture?adminId=${this.AuthServ.getUserID}`, video);
  }
}