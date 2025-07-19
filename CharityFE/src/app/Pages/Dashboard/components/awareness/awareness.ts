import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Lecture } from '../../../../Core/Services/lecture';
import { ILecture, ApiResponse } from '../../../../Core/Interfaces/ilecture';

@Component({
  selector: 'app-awareness',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './awareness.html',
  styleUrls: ['./awareness.scss']
})
export class Awareness implements OnInit {
  searchControl = new FormControl('');
  categoryControl = new FormControl('');

  allLectures: ILecture[] = [];
  filteredLectures: ILecture[] = [];

  constructor(private lectureService: Lecture) {}

  ngOnInit(): void {
    this.getLectures();
  }

  getLectures(): void {
    this.lectureService.getPublishedLectures().subscribe({
      next: (res: ApiResponse<ILecture[]>) => {
        if (res.success) {
          this.allLectures = res.data || [];
          this.applyFilters();
        }
      },
      error: (err) => {
        console.error('Error fetching lectures:', err);
      }
    });
  }

  applyFilters(): void {
    const searchValue = this.searchControl.value?.toLowerCase() || '';
    const categoryValue = this.categoryControl.value || '';

    this.filteredLectures = this.allLectures.filter(lecture => {
      const matchesTitle = !searchValue || lecture.title.toLowerCase().includes(searchValue);
      const matchesCategory = !categoryValue || lecture.tags?.includes(categoryValue);
      return matchesTitle && matchesCategory;
    });
  }

  deleteLecture(id: number): void {
    if (confirm('هل أنت متأكد من حذف هذه المحاضرة؟')) {
      this.lectureService.deleteLecture(id).subscribe({
        next: (res) => {
          if (res.success) {
            this.allLectures = this.allLectures.filter(l => l.id !== id);
            this.applyFilters();
          }
        },
        error: (err) => {
          console.error('Delete failed', err);
        }
      });
    }
  }

  republishLecture(id: number): void {
    this.lectureService.publishLecture(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.getLectures(); // Refresh
        }
      },
      error: (err) => {
        console.error('Republish failed', err);
      }
    });
  }

  getUniqueTags(): string[] {
    const tags = new Set<string>();
    this.allLectures.forEach(lecture => {
      lecture.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }
}
