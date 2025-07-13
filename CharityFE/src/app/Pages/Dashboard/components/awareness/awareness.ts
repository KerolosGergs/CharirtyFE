import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-awareness',
  imports: [ReactiveFormsModule, RouterLink ],
  templateUrl: './awareness.html',
  styleUrl: './awareness.scss'
})
export class Awareness {
    searchControl = new FormControl('');
    categoryControl = new FormControl('');
  
    publishedVideos = [
      {
        thumbnail: 'Images/advisor.jpg',
        title: 'توزيع 1,000 سلة غذائية بمناسبة شهر رمضان',
        description: 'تفاصيل الحملة الرمضانية التي أطلقتها الجمعية...',
        date: '15 مارس 2025',
        category: 'رمضان'
      },
      {
        thumbnail: 'Images/advisor.jpg',
        title: 'توزيع بطانيات لفصل الشتاء',
        description: 'مبادرة جديدة لتقديم الدعم خلال فصل الشتاء...',
        date: '10 فبراير 2025',
        category: 'شتاء'
      },
      {
        thumbnail: 'Images/advisor.jpg',
        title: 'حملة النظافة في المناطق الريفية',
        description: 'العمل التطوعي لتنظيف البيئات المحلية...',
        date: '25 يناير 2025',
        category: 'نظافة'
      }
    ];
  
    filteredVideos() {
      const searchValue = this.searchControl.value?.toLowerCase() || '';
      const categoryValue = this.categoryControl.value || '';
  
      return this.publishedVideos.filter(video =>
        (!searchValue || video.title.toLowerCase().includes(searchValue)) &&
        (!categoryValue || video.category === categoryValue)
      );
    }
  
    applyFilters(): void {
      // Future enhancements can go here, but filters apply automatically now
    }
}
