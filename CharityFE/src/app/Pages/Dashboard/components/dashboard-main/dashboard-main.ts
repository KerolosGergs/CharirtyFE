import { Component, computed, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Card1 } from './conponents/card1/card1';
import { Card2 } from './conponents/card2/card2';
import { Card3 } from './conponents/card3/card3';

@Component({
  selector: 'app-dashboard-main',
  standalone: true,
  imports: [Card1,Card2,Card3],
  templateUrl: './dashboard-main.html',
  styleUrl: './dashboard-main.scss'
})
export class DashboardMain {
 searchOn = true;

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
