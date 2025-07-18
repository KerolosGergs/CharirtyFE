import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NewsArticle } from '../../../../../../Core/Interfaces/news';
import { newsservice } from '../../../../../../Core/Services/news';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-news-item',
  imports: [CommonModule,RouterLink],
  templateUrl: './dashboard-news-item.html',
  styleUrl: './dashboard-news-item.scss'
})
export class DashboardNewsItem {
  @Input() itemC! : NewsArticle
  @Output() delete = new EventEmitter<number>();

  newServ = inject(newsservice);
  tostar = inject(ToastrService);


  confirmDelete() {
    this.delete.emit(this.itemC.id);
  }

}
