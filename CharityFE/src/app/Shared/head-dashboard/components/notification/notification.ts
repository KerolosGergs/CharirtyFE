import { Component, Input } from '@angular/core';
import { INotification, NotificationService } from '../../service/notification-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notification',
  imports: [DatePipe],
  templateUrl: './notification.html',
  styleUrl: './notification.scss'
})
export class Notification {
 @Input() userId!: string; // Pass current logged-in user ID
  notifications: INotification[] = [];
  unreadCount = 0;
  showDropdown = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown) {
      this.unreadCount = 0;
    }
  }

  loadNotifications() {
    this.notificationService.getUserNotifications(this.userId)
      .subscribe(data => {
        this.notifications = data.data;
        this.unreadCount = data.data.filter(n => !n.isRead).length;
      });
  }

  delete(id: number) {
    this.notificationService.deleteNotification(id).subscribe(() => {
      this.notifications = this.notifications.filter(n => n.id !== id);
    });
  }
}