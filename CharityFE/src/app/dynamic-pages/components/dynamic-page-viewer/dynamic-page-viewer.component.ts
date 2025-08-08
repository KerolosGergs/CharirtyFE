import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DynamicPagesService, DynamicPage, ContentItem } from '../../dynamic-pages.service';
import { Subject, switchMap, takeUntil, map } from 'rxjs';
import { Environment } from '../../../../Environment/environment';
import { HeaderComponent } from '../../../Pages/Home/Components/header-component/header-component';
import { Nav } from '../../../Pages/Home/Components/nav/nav';
import { Footer } from '../../../Shared/footer/footer';
import { Spinner } from '../../../Shared/spinner/spinner';
import { NotFound } from '../../../Pages/not-found/not-found';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dynamic-page-viewer',
  standalone: true,
  imports: [
    CommonModule, 
    NgOptimizedImage, 
    HeaderComponent, 
    Nav, 
    Footer, 
    Spinner, 
    NotFound
  ],
  templateUrl: './dynamic-page-viewer.component.html',
  styleUrl: './dynamic-page-viewer.component.scss'
})
export class DynamicPageViewerComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly dynamicPagesService = inject(DynamicPagesService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly destroy$ = new Subject<void>();

  page: DynamicPage | null = null;
  items: ContentItem[] = [];
  isLoading = true;
  selectedFileIndex: number | null = null;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        map((pm) => Number(pm.get('id'))),
        switchMap((id) => this.dynamicPagesService.getPageById(id)),
      )
      .subscribe({
        next: (resp) => {
          const page = resp?.data ?? null;
          this.page = page;
          const items = page?.items ?? [];
          this.items = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          this.isLoading = false;
          
          // Auto-select first file if available
          const fileItems = this.getItemsByType('file');
          if (fileItems.length > 0) {
            this.selectedFileIndex = 0;
          }
        },
        error: () => {
          this.page = null;
          this.items = [];
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getItemsByType(type: 'text' | 'image_text' | 'file' | 'video'): ContentItem[] {
    return this.items.filter(item => item.type === type);
  }

  selectFile(index: number): void {
    this.selectedFileIndex = index;
    console.log('Selected file index:', index);
  }

  getSelectedFileUrl(): SafeResourceUrl {
    if (this.selectedFileIndex === null) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('');
    }
    
    const fileItems = this.getItemsByType('file');
    if (this.selectedFileIndex >= fileItems.length) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('');
    }
    
    const selectedFile = fileItems[this.selectedFileIndex];
    const fileUrl = this.normalizeUrl(selectedFile.fileUrl);
    return this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
  }

  getVideoEmbedUrl(videoUrl: string): SafeResourceUrl {
    if (!videoUrl) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('');
    }

    // Convert YouTube URL to embed URL
    if (videoUrl.includes('youtube.com/watch') || videoUrl.includes('youtu.be/')) {
      let videoId = '';
      
      if (videoUrl.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(videoUrl.split('?')[1]);
        videoId = urlParams.get('v') || '';
      } else if (videoUrl.includes('youtu.be/')) {
        videoId = videoUrl.split('youtu.be/')[1];
      }
      
      if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
      }
    }
    
    // Convert Vimeo URL to embed URL
    if (videoUrl.includes('vimeo.com/')) {
      const videoId = videoUrl.split('vimeo.com/')[1];
      if (videoId) {
        const embedUrl = `https://player.vimeo.com/video/${videoId}`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
      }
    }
    
    // For other video URLs, return as is (if they support direct embedding)
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

  normalizeUrl(url?: string): string {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    const base = Environment.ImgUrl?.replace(/\/$/, '') ?? '';
    const path = url.startsWith('/') ? url : `/${url}`;
    return `${base}${path}`;
  }

  safeUrl(url?: string): string {
    const normalized = this.normalizeUrl(url);
    return normalized || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
  }
}


