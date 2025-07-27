import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, NotificationCreateDTO, NotificationDTO } from '../Interfaces/inotification';
import { Environment } from '../../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class Notification {
  private baseUrl = `${Environment.apiUrl}notification`;

  constructor(private http: HttpClient) {}

  getUserNotifications(onlyUnread: boolean = false): Observable<ApiResponse<NotificationDTO[]>> {
    let params = new HttpParams();
    if (onlyUnread) {
      params = params.set('onlyUnread', 'true');
    }
    return this.http.get<ApiResponse<NotificationDTO[]>>(this.baseUrl, { params });
  }

  markAsRead(id: number): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(`${this.baseUrl}/mark-as-read/${id}`, {});
  }

  sendNotification(notification: NotificationCreateDTO, toEmail?: string): Observable<ApiResponse<boolean>> {
    let params = new HttpParams();
    if (toEmail) {
      params = params.set('toEmail', toEmail);
    }
    return this.http.post<ApiResponse<boolean>>(this.baseUrl + '/send', notification, { params });
  }
}
