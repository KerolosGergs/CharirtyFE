import { Component, computed, HostListener, signal } from '@angular/core';
import { DashboardMain } from "../dashboard-main/dashboard-main";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
   searchOn = false;

  openSearch() {
    this.searchOn = !this.searchOn;
  }

 notifications = signal([
    { id: 1, message: 'New comment on your post' },
    { id: 2, message: 'You have a new follower' }
  ]);

  showDropdown = signal(false);

  hasNotifications = computed(() => this.notifications().length > 0);

  toggleDropdown() {
    // Toggle dropdown visibility
    this.showDropdown.update(value => !value);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.notification-wrapper')) {
      this.showDropdown.set(false);
    }
  }
}
