import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../../Environment/environment';
export interface NotificationResponse {
  success: boolean
  message: string
  data: INotification[]
  statusCode: number
  errors: any[]
}

export interface INotification {
  id: number
  userId: string
  title: string
  message: string
  isRead: boolean
  createdAt: string
  type: number
}


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl =Environment.apiUrl; // Update with your API endpoint

  http = inject(HttpClient);
  // constructor(private http: HttpClient) {}

  // Get notifications for a specific user
  getUserNotifications(userId: string): Observable<NotificationResponse> {
    return this.http.get<NotificationResponse>(`${this.apiUrl}Notification?userId=${userId}`);
  }

  // Delete a notification
  deleteNotification(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}Notification/${id}`);
  }

  // Mark notification as read
  markAsRead(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/api/Admin/notifications/${id}/read`, {});
  }
}
