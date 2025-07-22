import { Component, computed, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-advisor-dashboard',
  imports: [RouterOutlet,RouterLinkActive, RouterLink],
  templateUrl: './advisor-dashboard.html',
  styleUrl: './advisor-dashboard.scss'
})
export class AdvisorDashboard {
  userName = 'User Name';
  userEmail = 'user@example.com';
  userAvatar = '';

  sidebarItems = [
    { label: 'الرئيسية', icon: 'bi bi-house-door', link: '/advisor-dashboard/dashboard-main', active: true },
    { label: 'مواعيد المستشارات', icon: 'bi bi-people', link: '/advisor-dashboard/dashboard-date', active: false },
    { label: 'جدول المواعيد', icon: 'bi bi-chat-dots', link: '/advisor-dashboard/dashboard-schedule', active: false }
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
