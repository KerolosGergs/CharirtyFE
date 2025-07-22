import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reconcile-dashboard',
  imports: [ RouterOutlet,RouterLinkActive, RouterLink],
  templateUrl: './reconcile-dashboard.html',
  styleUrl: './reconcile-dashboard.scss'
})
export class ReconcileDashboard {
  userName = 'User Name';
  userEmail = 'user@example.com';
  userAvatar = '';

  sidebarItems = [
    { label: 'الرئيسية', icon: 'bi bi-house-door', link: '/reconcile-dashboard/reconcile-main', active: true },
  ];

  searchOn = false;
  showNotifications = false;

  notifications = [
    { id: 1, message: 'Notification 1' },
    { id: 2, message: 'Notification 2' }
  ];

  

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  get hasNotifications(): boolean {
    return this.notifications.length > 0;
  }
}
