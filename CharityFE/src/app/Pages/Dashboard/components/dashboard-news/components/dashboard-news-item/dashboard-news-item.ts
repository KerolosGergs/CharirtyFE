import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-news-item',
  imports: [CommonModule,RouterLink],
  templateUrl: './dashboard-news-item.html',
  styleUrl: './dashboard-news-item.scss'
})
export class DashboardNewsItem {
  @Input() itemC : any
}
