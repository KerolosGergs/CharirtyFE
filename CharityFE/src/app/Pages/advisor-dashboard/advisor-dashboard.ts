import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeadDashboard } from "../../Shared/head-dashboard/head-dashboard";
import { Router } from '@angular/router';
import { AuthServ } from '../../Auth/Services/auth-serv';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-advisor-dashboard',
  imports: [RouterOutlet, RouterLinkActive, RouterLink, HeadDashboard],
  templateUrl: './advisor-dashboard.html',
  styleUrls: ['./advisor-dashboard.scss']
})
export class AdvisorDashboard {


  sidebarItems = [
    { label: 'الرئيسية', icon: 'bi bi-house-door', link: '/advisor-dashboard/dashboard-main', active: true },
    // { label: 'إضافة مواعيدت', icon: 'bi bi-people', link: '/advisor-dashboard/dashboard-schedule-Add', active: false },
    { label: 'جدول المواعيد', icon: 'bi bi-chat-dots', link: '/advisor-dashboard/AdvisorCallender', active: false },
    // { label: 'الطلبات المفدمة', icon: 'bi bi-envelope', link: '/advisor-dashboard/dashboard-request', active: false }
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
    this.router.navigate(['/login']);  // Redirect to login page after logout
  }
    isSidebarOpen = true;
  isSmallScreen = false;

  @HostListener('window:resize')
  onResize() {
    this.isSmallScreen = window.innerWidth < 768;
    if (this.isSmallScreen) this.isSidebarOpen = false;
  }
  ngOnInit() {
    this.onResize();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
