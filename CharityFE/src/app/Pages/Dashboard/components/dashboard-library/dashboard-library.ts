import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LibraryService } from '../../../../Core/Services/Library/library-service';
import { ImageItem, VideoItem } from '../../../../Core/Interfaces/ILibrary/ilibrary';

@Component({
  selector: 'app-dashboard-library',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-library.html',
  styleUrls: ['./dashboard-library.scss']
})
export class DashboardLibrary implements OnInit {
  images: ImageItem[] = [];
  videos: VideoItem[] = [];
  filter: 'all' | 'image' | 'video' = 'all';
  statusFilter: 'all' | 'active' | 'inactive' = 'all';
  currentPage = 1;
  itemsPerPage = 6;
  editMode: boolean = false;
  formData: {
    id?: number;
    type: 'image' | 'video';
    name: string;
    url: string;
    description: string;
    isActive: boolean;
    file?: File;
  } = {
    type: 'image',
    name: '',
    url: '',
    description: '',
    isActive: true
  };

  itemToDelete: ImageItem | VideoItem | null = null;
  showFormModal: boolean = false;
  showConfirmDeleteModal: boolean = false;

  constructor(
    private libraryService: LibraryService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData(): void {
    Promise.all([
      this.libraryService.GetImages().toPromise(),
      this.libraryService.getVideos().toPromise()
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

    if (this.statusFilter !== 'all') {
      items = items.filter(item => 
        (this.statusFilter === 'active' && item.isActive) || 
        (this.statusFilter === 'inactive' && !item.isActive)
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

  setStatusFilter(status: 'all' | 'active' | 'inactive'): void {
    this.statusFilter = status;
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

  openForm(mode: 'add' | 'edit', type: 'image' | 'video', item?: ImageItem | VideoItem): void {
    this.editMode = mode === 'edit';
    if (this.editMode && item) {
      this.formData = {
        id: item.id,
        type: 'imageUrl' in item ? 'image' : 'video',
        name: item.name,
        url: 'imageUrl' in item ? item.imageUrl : item.videoUrl,
        description: item.description,
        isActive: item.isActive,
      };
    } else {
      this.formData = {
        type: type,
        name: '',
        url: '',
        description: '',
        isActive: true
      };
    }
    this.showFormModal = true;
  }

  closeFormModal(): void {
    this.showFormModal = false;
    this.formData.file = undefined;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.formData.file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.formData.url = e.target?.result as string;
      };
      reader.readAsDataURL(this.formData.file);
    }
  }

 async saveItem(): Promise<void> {
  try {
    if (this.formData.type === 'image') {
      const formData = new FormData();
      formData.append('name', this.formData.name);
      formData.append('description', this.formData.description);
      formData.append('isActive', String(this.formData.isActive));

      // If Add Mode -> Upload the Image File
      if (!this.editMode && this.formData.file) {
        formData.append('ImageUrl', this.formData.file);
        await this.libraryService.postImage(formData).toPromise();
      }
      // If Edit Mode -> Update image (optionally upload a new file)
      else if (this.editMode) {
        formData.append('id', String(this.formData.id!));
        if (this.formData.file) {
          formData.append('ImageUrl', this.formData.file);
        }
        await this.libraryService.updateImage(this.formData.id!, formData).toPromise();
      }
    }

    else if (this.formData.type === 'video') {
      const formData = new FormData();
      formData.append('name', this.formData.name);
      formData.append('description', this.formData.description);
      formData.append('isActive', String(this.formData.isActive));
      formData.append('VideoUrl', String(this.formData.url));


      if (this.editMode) {
        await this.libraryService.updateVideo(this.formData.id!, formData).toPromise();
      } else {
        await this.libraryService.postVideo(formData).toPromise();
      }
    }

    this.fetchData(); // Refresh the list after save
    this.closeFormModal();
  } catch (error) {
    console.error('Error saving item:', error);
  }
}


  private async uploadFile(file: File): Promise<string> {
    // This is a placeholder for actual file upload logic
    // In a real application, you would implement file upload to your server
    // and return the URL where the file is stored
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(URL.createObjectURL(file));
      }, 1000);
    });
  }

  confirmDelete(item: ImageItem | VideoItem): void {
    this.itemToDelete = item;
    this.showConfirmDeleteModal = true;
  }

  closeConfirmDeleteModal(): void {
    this.showConfirmDeleteModal = false;
    this.itemToDelete = null;
  }

  async deleteItem(): Promise<void> {
    if (this.itemToDelete) {
      try {
        if ('imageUrl' in this.itemToDelete) {
          await this.libraryService.deleteImage(this.itemToDelete.id).toPromise();
          this.images = this.images.filter(img => img.id !== this.itemToDelete!.id);
        } else {
          await this.libraryService.deleteVideo(this.itemToDelete.id).toPromise();
          this.videos = this.videos.filter(vid => vid.id !== this.itemToDelete!.id);
        }
        this.closeConfirmDeleteModal();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  }
}