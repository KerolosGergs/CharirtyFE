import { AuthServ } from './../../Auth/Services/auth-serv';
import { Component, inject, OnInit } from '@angular/core';
import { Notification } from "./components/notification/notification";
import { INotification, NotificationService } from './service/notification-service';

@Component({
  selector: 'app-head-dashboard',
  imports: [Notification],
  templateUrl: './head-dashboard.html',
  styleUrl: './head-dashboard.scss'
})
export class HeadDashboard {

  Auth = inject(AuthServ);
  notifyService = inject(NotificationService);
  userId = this.Auth.getUserID();
  userName = this.Auth.getUserName() ;

  userEmail = this.Auth.getUserName();
  userAvatar = '';

  
  showNotifications = false;
  notifications:INotification[] = [

    {
      id: 1, message: 'إشعار 1',
      userId: '',
      title: '',
      isRead: false,
      createdAt: '',
      type: 0
    },
    {
      id: 2, message: 'إشعار 2',
      userId: '',
      title: '',
      isRead: false,
      createdAt: '',
      type: 0
    }
  ];

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  get hasNotifications(): boolean {
    return this.notifications.length > 0;
  }
}
