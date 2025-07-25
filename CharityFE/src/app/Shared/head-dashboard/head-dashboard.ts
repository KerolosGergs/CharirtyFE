import { AuthServ } from './../../Auth/Services/auth-serv';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-head-dashboard',
  imports: [],
  templateUrl: './head-dashboard.html',
  styleUrl: './head-dashboard.scss'
})
export class HeadDashboard {
  Auth = inject(AuthServ);

  userName = this.Auth.getUserName() ;

  userEmail = this.Auth.getUserName();
  userAvatar = '';

  showNotifications = false;
  notifications = [
    { id: 1, message: 'إشعار 1' },
    { id: 2, message: 'إشعار 2' }
  ];

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  get hasNotifications(): boolean {
    return this.notifications.length > 0;
  }
}
