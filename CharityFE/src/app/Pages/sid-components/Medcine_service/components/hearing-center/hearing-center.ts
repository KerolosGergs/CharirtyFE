import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-hearing-center',
  imports: [CommonModule],
  templateUrl: './hearing-center.html',
  styleUrl: './hearing-center.scss'
})
export class HearingCenter {
 selectedImage: string | null = null;

  openImageModal(imageSrc: string): void {
    this.selectedImage = imageSrc;
    const modal = document.getElementById('imageModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }
    closeImageModal(): void {
    const modal = document.getElementById('imageModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
      this.selectedImage = null;
    }
  }
}

bootstrapApplication(HearingCenter);