import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-news-item',
  imports: [],
  templateUrl: './dashboard-news-item.html',
  styleUrl: './dashboard-news-item.scss'
})
export class DashboardNewsItem {
  @Input() itemC : any
}
