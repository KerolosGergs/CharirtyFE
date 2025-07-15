import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-news-item',
  imports: [CommonModule],
  templateUrl: './dashboard-news-item.html',
  styleUrl: './dashboard-news-item.scss'
})
export class DashboardNewsItem {
  @Input() itemC : any
}
