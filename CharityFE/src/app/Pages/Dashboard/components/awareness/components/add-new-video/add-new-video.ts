import { Component } from '@angular/core';

@Component({
  selector: 'app-add-new-video',
  imports: [],
  templateUrl: './add-new-video.html',
  styleUrl: './add-new-video.scss'
})
export class AddNewVideo {
  selectedFile: File | null = null;

  triggerFileBrowse(): void {
    const input = document.getElementById('videoFile') as HTMLInputElement;
    input?.click();
  }

  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
      this.selectedFile = target.files[0];
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files?.length) {
      this.selectedFile = event.dataTransfer.files[0];
    }
  }
}
