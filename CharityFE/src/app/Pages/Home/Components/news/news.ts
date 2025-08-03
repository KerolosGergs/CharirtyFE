import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { newsservice } from '../../../../Core/Services/news';
import { NewsArticle } from '../../../../Core/Interfaces/news';

import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-news',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './news.html',
  styleUrl: './news.scss'
})
export class News implements OnInit {
 

  sectionTitle = 'آخر أخبارنا التي أنجزناها';
  sectionSubtitle = 'نشارككم إنجازاتنا، قصص النجاح، والتقارير الشهرية بكل شفافية ووضوح';
 currentSlide = 0;
  isAnimating = false;

  newsservice = inject(newsservice);
  router = inject(Router);

  newsItems: NewsArticle[] = [
  ];

  currentIndex = 0;
  itemsPerPage = 4;

  ngOnInit(): void { 
    this.getNews();
  }

  nextSlide() {
    
    this.isAnimating = true;
    this.currentSlide = (this.currentSlide + 1) % this.newsItems.length;
    console.log(this.currentSlide);

  }

  prevSlide() {
    
    this.isAnimating = true;
    this.currentSlide = this.currentSlide === 0 ? this.newsItems.length - 1 : this.currentSlide - 1;
    console.log(this.currentSlide);
 
  }
  goToSlide(index: number) {
    
    this.isAnimating = true;
    this.currentSlide = index;
    
  }
  getNews()
  {
  debugger
    this.newsservice.getActiveNews().subscribe(data => {
      if (data.success) {
        this.newsItems = data.data;

      }
    });

  }

  navigateToNewsDetails(newsId: number): void {
    this.router.navigate(['/news-details', newsId],);
    
  }

}