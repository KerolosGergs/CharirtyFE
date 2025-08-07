import { Component } from '@angular/core';
import { ImageItem, VideoItem } from '../../../../../Core/Interfaces/ILibrary/ilibrary';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LibraryService } from '../../../../../Core/Services/Library/library-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-library',
  imports: [CommonModule, FormsModule],
  templateUrl: './image-library.html',
  styleUrl: './image-library.scss'
})
export class ImageLibrary {
images: ImageItem[] = [];
  videos: VideoItem[] = [];
  filter: 'all' | 'image' | 'video' = 'all';
  currentPage = 1;
  itemsPerPage = 6;
 

  constructor(
    private libraryService: LibraryService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData(): void {
    Promise.all([
      this.libraryService.getActiveImages().toPromise(),
      this.libraryService.getVideosActive().toPromise()
    ]).then(([imagesResponse, videosResponse]) => {
      this.images = imagesResponse?.data || [];
      this.videos = videosResponse?.data || [];
      console.log('Images:', this.images);
      console.log('Videos:', this.videos);
    }).catch(error => {
      console.error('Failed to fetch media:', error);
    });
  }

  get allItems(): (ImageItem | VideoItem)[] {
    return [...this.images, ...this.videos];
  }

  get filteredItems(): (ImageItem | VideoItem)[] {
    let items = this.allItems;

    if (this.filter !== 'all') {
      items = items.filter(item => 
        (this.filter === 'image' && 'imageUrl' in item) || 
        (this.filter === 'video' && 'videoUrl' in item)
      );
    }

    
    return items;
  }

  get paginatedItems(): (ImageItem | VideoItem)[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredItems.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get pagination() {
    const totalItems = this.filteredItems.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    return {
      currentPage: this.currentPage,
      totalPages: totalPages,
      totalItems: totalItems
    };
  }

  getPageNumbers(): number[] {
    const pageNumbers = [];
    for (let i = 1; i <= this.pagination.totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  setFilter(filter: 'all' | 'image' | 'video'): void {
    this.filter = filter;
    this.currentPage = 1;
  }


  onPageChange(page: number): void {
    if (page >= 1 && page <= this.pagination.totalPages) {
      this.currentPage = page;
    }
  }

  getYouTubeEmbedUrl(url: string): string {
    const match = url.match(/(?:youtu\.be\/|v=)([^&\n?#]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : '';
  }

  sanitizeUrl(id: number): SafeResourceUrl {
    const url = this.videos.find(v => v.id === id)?.videoUrl || '';
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.getYouTubeEmbedUrl(url));
  }












}