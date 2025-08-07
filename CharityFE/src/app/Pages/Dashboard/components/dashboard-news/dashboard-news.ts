import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DashboardNewsItem } from './components/dashboard-news-item/dashboard-news-item';
import { newsservice } from '../../../../Core/Services/news';
import { NewsArticle } from '../../../../Core/Interfaces/news';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-news',
  imports: [ReactiveFormsModule, DashboardNewsItem,RouterLink],
  templateUrl: './dashboard-news.html',
  styleUrl: './dashboard-news.scss'
})
export class DashboardNews {
  private allArticles = signal<NewsArticle[]>([]);

  _news = inject(newsservice);
  tostar = inject(ToastrService);

  searchControl = new FormControl('');
  filterControl = new FormControl('');
   articles: NewsArticle[] = [];

  ngOnInit(): void {
    this.getAllNews();
  }

  getAllNews(){
    this._news.getAllNews().subscribe({
      next:(res) => {
        this.articles = res.data
        console.log(res.data);
        
      },
      error:(err) => {
        console.log(err);
        
      },
    })
  }



  filteredArticles() {
  const search = this.searchControl.value?.toLowerCase() || '';
  const filter = this.filterControl.value;

  return this.articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(search);

    let matchesFilter = true;
    switch (filter) {
      case 'published':
        matchesFilter = article.isPublished;
        break;
      case 'hidden':
        matchesFilter = !article.isPublished;
        break;
      
    }

    return matchesSearch && matchesFilter;
  });
}
 handleDelete(id: number) {
    this._news.deletenews(id).subscribe((res) => {
      if (res.success) {
        this.allArticles.update((list) => list.filter(article => article.id !== id));
        this.getAllNews();
        this.tostar.success('تم حذف المقال بنجاح');
      } else {
        this.tostar.error('حدث خطأ أثناء حذف المقال');
      }
    });
  }

}
