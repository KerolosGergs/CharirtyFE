import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DynamicPagesService, DynamicPage, ContentItem } from '../../dynamic-pages.service';
import { Subject, switchMap, takeUntil, map } from 'rxjs';
import { Environment } from '../../../../Environment/environment';

@Component({
  selector: 'app-dynamic-page-viewer',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './dynamic-page-viewer.component.html',
  styleUrl: './dynamic-page-viewer.component.scss'
})
export class DynamicPageViewerComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly dynamicPagesService = inject(DynamicPagesService);
  private readonly destroy$ = new Subject<void>();

  page: DynamicPage | null = null;
  items: ContentItem[] = [];
  isLoading = true;

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


