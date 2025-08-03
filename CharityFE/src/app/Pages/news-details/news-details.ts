import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { newsservice } from '../../Core/Services/news';
import { NewsArticle } from '../../Core/Interfaces/news';
import { DatePipe } from '@angular/common';
import { Nav } from '../Home/Components/nav/nav';
import { Footer } from '../../Shared/footer/footer';
import { HeaderComponent } from "../Home/Components/header-component/header-component";


@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [CommonModule, DatePipe, Nav, Footer, HeaderComponent],
  templateUrl: './news-details.html',
  styleUrl: './news-details.scss'
})
export class NewsDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private newsService = inject(newsservice);

  newsArticle: NewsArticle | null = null;
  loading = true;
  error = false;
  selectedImage: string | null = null;
  showImageModal = false;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadNewsArticle(id);
      } else {
        this.error = true;
        this.loading = false;
      }
    });
  }

  loadNewsArticle(id: number): void {
    this.loading = true;
    this.error = false;
    
    this.newsService.getNewsById(id).subscribe({
      next: (response) => {
        if (response.data) {
          // The API now returns full URLs, so no need to add base URL
          this.newsArticle = response.data;
        } else {
          this.error = true;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading news article:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  openImageModal(imageUrl: string): void {
    this.selectedImage = imageUrl;
    this.showImageModal = true;
  }

  closeImageModal(): void {
    // Add closing animation class
    const modalOverlay = document.querySelector('.image-modal-overlay') as HTMLElement;
    if (modalOverlay) {
      modalOverlay.classList.add('closing');
      
      // Wait for animation to complete before closing
      setTimeout(() => {
        this.showImageModal = false;
        this.selectedImage = null;
        modalOverlay.classList.remove('closing');
      }, 300); // Match the animation duration
    } else {
      this.showImageModal = false;
      this.selectedImage = null;
    }
  }

  // Remove img tags from content for display
  getContentWithoutImages(content: string): string {
    return content.replace(/<img[^>]*>/g, '');
  }

  // Process content and separate into paragraphs
  getProcessedContent(content: string): string[] {
    // Remove img tags first
    const contentWithoutImages = this.getContentWithoutImages(content);
    
    // Split content by common paragraph separators
    const paragraphs = contentWithoutImages
      .split(/(?:\r?\n\s*){2,}|<\/p>\s*<p[^>]*>|<\/div>\s*<div[^>]*>|<\/section>\s*<section[^>]*>/)
      .map(paragraph => paragraph.trim())
      .filter(paragraph => paragraph.length > 0)
      .map(paragraph => {
        // Clean up any remaining HTML tags but keep basic formatting
        return paragraph
          .replace(/<[^>]*>/g, '') // Remove HTML tags
          .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
          .replace(/&amp;/g, '&') // Replace &amp; with &
          .replace(/&lt;/g, '<') // Replace &lt; with <
          .replace(/&gt;/g, '>') // Replace &gt; with >
          .replace(/&quot;/g, '"') // Replace &quot; with "
          .trim();
      })
      .filter(paragraph => paragraph.length > 0);
    
    // If no paragraphs found, split by single line breaks
    if (paragraphs.length <= 1) {
      return contentWithoutImages
        .split(/\r?\n/)
        .map(paragraph => paragraph.trim())
        .filter(paragraph => paragraph.length > 0)
        .map(paragraph => {
          return paragraph
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .trim();
        })
        .filter(paragraph => paragraph.length > 0);
    }
    
    return paragraphs;
  }
}
