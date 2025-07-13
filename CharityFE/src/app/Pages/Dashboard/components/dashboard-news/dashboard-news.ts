import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DashboardNewsItem } from './components/dashboard-news-item/dashboard-news-item';

@Component({
  selector: 'app-dashboard-news',
  imports: [ReactiveFormsModule, DashboardNewsItem],
  templateUrl: './dashboard-news.html',
  styleUrl: './dashboard-news.scss'
})
export class DashboardNews {
  searchControl = new FormControl('');
  filterControl = new FormControl('');

  articles = [
  {
    id: 1,
    imageUrl: 'Images/advisor.jpg',
    title: 'حملة رمضان: توزيع 1,000 سلة غذائية',
    description: 'أطلقت المجموعة حملة لتوزيع السلال الغذائية للمحتاجين في أنحاء القاهرة.',
    date: '15 مارس 2025',
    status: 'published'
  },
  {
    id: 2,
    imageUrl: 'Images/advisor.jpg',
    title: 'ندوة توعوية حول الصحة النفسية',
    description: 'نظمت المجموعة ندوة حول أهمية العناية بالصحة النفسية خلال الأزمات.',
    date: '10 فبراير 2025',
    status: 'published'
  },
  {
    id: 3,
    imageUrl: 'Images/advisor.jpg',
    title: 'مبادرة تعليمية للأطفال',
    description: 'انطلقت حملة تهدف إلى تقديم دعم تعليمي للأطفال في المناطق النائية.',
    date: '5 يناير 2025',
    status: 'published'
  },
  {
    id: 4,
    imageUrl: 'Images/advisor.jpg',
    title: 'افتتاح مركز تنموي جديد',
    description: 'تم افتتاح مركز تنموي يقدم خدمات متعددة للأسر المحتاجة.',
    date: '25 ديسمبر 2024',
    status: 'published'
  },
  {
    id: 5,
    imageUrl: 'Images/advisor.jpg',
    title: 'ورشة عمل للتدريب المهني',
    description: 'أقيمت ورشة لتعليم المهارات المهنية للشباب الباحثين عن عمل.',
    date: '1 نوفمبر 2024',
    status: 'published'
  },
  {
    id: 6,
    imageUrl: 'Images/advisor.jpg',
    title: 'حملة تطوعية لتنظيف الشواطئ',
    description: 'شارك متطوعون من مختلف الأعمار في تنظيف شواطئ الإسكندرية.',
    date: '15 أكتوبر 2024',
    status: 'published'
  },
  {
    id: 7,
    imageUrl: 'Images/advisor.jpg',
    title: 'توزيع مستلزمات مدرسية',
    description: 'وزعت المجموعة حقائب مدرسية وقرطاسية لأكثر من 500 طالب.',
    date: '2 سبتمبر 2024',
    status: 'published'
  },
  {
    id: 8,
    imageUrl: 'Images/advisor.jpg',
    title: 'لقاء تعريفي بمبادرات الصيف',
    description: 'تم تنظيم لقاء لعرض خطط المبادرات الصيفية التي تخدم المجتمع.',
    date: '20 أغسطس 2024',
    status: 'published'
  },
  {
    id: 9,
    imageUrl: 'Images/advisor.jpg',
    title: 'دورة تدريبية للمعلمين الجدد',
    description: 'أقيمت دورة شاملة لتدريب المعلمين الجدد على أحدث طرق التعليم.',
    date: '5 يوليو 2024',
    status: 'published'
  }
];


  filteredArticles() {
    const search = this.searchControl.value?.toLowerCase() || '';
    const filter = this.filterControl.value;

    return this.articles.filter(article =>
      (!search || article.title.toLowerCase().includes(search)) &&
      (!filter || article.status === filter || filter === 'new' || filter === 'old')
    );
  }
}
