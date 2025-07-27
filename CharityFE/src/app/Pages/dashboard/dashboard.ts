import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeadDashboard } from "../../Shared/head-dashboard/head-dashboard";
import { Router } from '@angular/router';
import { AuthServ } from '../../Auth/Services/auth-serv';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterOutlet, RouterLinkActive, HeadDashboard],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  userName = 'User Name';
  userEmail = 'user@example.com';
  userAvatar = '';

  sidebarItems = [
    { label: 'الرئيسية', icon: 'bi bi-house-door', link: '/dashboard/dashboard-main', active: true },
    { label: 'المستشارين', icon: 'bi bi-people', link: '/dashboard/dashboard-advisors', active: false },
    { label: 'اصلاح ذات البين', icon: 'bi bi-people', link: '/dashboard/dashboard-meditation', active: false },
    { label: 'الشكاوى', icon: 'bi bi-graph-up', link: '/dashboard/dashboard-complaints', active: false },
    { label: 'طلبات التطوع', icon: 'bi bi-file-text', link: '/dashboard/dashboard-Volunteer', active: false },
    { label: 'طلبات الدعم', icon: 'bi bi-headset', link: '/dashboard/dashboard-help', active: false },
    // { label: 'أقسام الموقع', icon: 'bi bi-diagram-3', link: '/dashboard', active: false },
    { label: 'الاستشارات', icon: 'bi bi-chat-dots', link: '/dashboard/consultation-management', active: false },
    { label: 'الاخبار', icon: 'bi bi-newspaper', link: '/dashboard/dashboard-news', active: false },
    { label: 'الخدمات', icon: 'bi bi-life-preserver', link: '/dashboard/dashboard-services', active: false },
    { label: 'التوعية', icon: 'bi bi-book-half', link: '/dashboard/dashboard-awareness', active: false },
  ];

  searchOn = false;
  showNotifications = false;

  notifications = [
    { id: 1, message: 'Notification 1' },
    { id: 2, message: 'Notification 2' }
  ];

  constructor(private authService: AuthServ, private router: Router) {}

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  get hasNotifications(): boolean {
    return this.notifications.length > 0;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // redirect to login page after logout
  }
}
