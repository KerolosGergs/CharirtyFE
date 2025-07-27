import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Lecture } from '../../../../Core/Services/lecture';
import { ILecture, ApiResponse } from '../../../../Core/Interfaces/ilecture';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-awareness',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './awareness.html',
  styleUrls: ['./awareness.scss']
})
export class Awareness implements OnInit {
   private sanitizer = inject(DomSanitizer);
  private lectureService = inject(Lecture);

  searchControl = new FormControl('');
  allLectures: ILecture[] = [];
  filteredLectures: ILecture[] = [];

  ngOnInit(): void {
    this.getLectures();
  }

  getLectures(): void {
    this.lectureService.getAllLectures().subscribe({
      next: (res: ApiResponse<ILecture[]>) => {
        if (res.success) {
          this.allLectures = res.data ?? [];
          this.applyFilters();
        }
      },
      error: err => console.error('Error loading lectures:', err)
    });
  }

  applyFilters(): void {
    const keyword = this.searchControl.value?.toLowerCase().trim() || '';

    this.filteredLectures = this.allLectures
      .filter(video => video.title.toLowerCase().includes(keyword))
      .sort((a, b) => Number(b.isPublished) - Number(a.isPublished)); // Sort published first
  }

  togglePublish(video: ILecture): void {
    const action = video.isPublished
      ? this.lectureService.UnpublishLecture(video.id)
      : this.lectureService.publishLecture(video.id);

    action.subscribe({
      next: res => {
        if (res.success) this.getLectures();
      },
      error: err => console.error('Failed to update publish status:', err)
    });
  }

  deleteLecture(id: number): void {
    if (confirm('هل أنت متأكد من حذف هذه المحاضرة؟')) {
      this.lectureService.deleteLecture(id).subscribe({
        next: res => {
          if (res.success) {
            this.allLectures = this.allLectures.filter(l => l.id !== id);
            this.applyFilters();
          }
        },
        error: err => console.error('Failed to delete lecture:', err)
      });
    }
  }

  getSafeVideoUrl(url: string): SafeResourceUrl {
    const videoId = this.extractYouTubeId(url);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  private extractYouTubeId(url: string): string {
    const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([^&\n?#]+)/);
    return match ? match[1] : '';
  }
}