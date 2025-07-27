import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { ILecture } from '../../Core/Interfaces/ilecture';
import { HttpClient } from '@angular/common/http';
import { Lecture } from '../../Core/Services/lecture';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgClass } from '@angular/common';
import { Footer } from "../../Shared/footer/footer";
import { Nav } from "../Home/Components/nav/nav";
import { HeaderComponent } from "../Home/Components/header-component/header-component";
// import { SafeResourceUrl } from '@angular/platform-browser';

export interface ILecture {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  isPublished: boolean;
  createdAt: string;
  publishedAt?: string;
  updatedAt?: string;
  safeUrl?: SafeResourceUrl; // ✅ Added this to hold sanitized video URL
}

@Component({
  selector: 'app-awareness-lectures-component',
  imports: [ReactiveFormsModule, NgClass, DatePipe, Footer, Nav, HeaderComponent],
  templateUrl: './awareness-lectures-component.html',
  styleUrl: './awareness-lectures-component.scss'
})
export class AwarenessLecturesComponent {
 private sanitizer = inject(DomSanitizer);
  private lectureService = inject(Lecture);

  lectures: ILecture[] = [];
  filteredLectures: ILecture[] = [];
  loading = true;

  searchControl = new FormControl('');

  ngOnInit(): void {
    this.fetchLectures();
  }

  fetchLectures(): void {
    this.lectureService.getPublishedLectures().subscribe({
      next: (res) => {
        this.lectures = res.data
          .map(lecture => ({
            ...lecture,
            safeUrl: this.getSafeVideoUrl(lecture.videoUrl) // ✅ Cache sanitized URL
          }))
          .sort((a, b) => +b.isPublished - +a.isPublished);

        this.filteredLectures = [...this.lectures];
        this.loading = false;
      },
      error: (err) => {
        console.error('API error:', err);
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    const keyword = this.searchControl.value?.toLowerCase().trim() || '';
    this.filteredLectures = this.lectures.filter(lecture =>
      lecture.title.toLowerCase().includes(keyword) ||
      lecture.description.toLowerCase().includes(keyword)
    );
  }

  private getSafeVideoUrl(url: string): SafeResourceUrl {
    const id = this.extractYouTubeId(url);
    const embed = `https://www.youtube.com/embed/${id}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embed);
  }

  private extractYouTubeId(url: string): string {
    const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([^&\n?#]+)/);
    return match ? match[1] : '';
  }
}