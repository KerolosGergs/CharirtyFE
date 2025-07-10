import { Component } from '@angular/core';
interface NewsItem {
  image: string;
  title: string;
  description: string;
  date: string;
}
@Component({
  selector: 'app-news',
  standalone: true,
  imports: [],
  templateUrl: './news.html',
  styleUrl: './news.scss'
})
export class News {
 
  sectionTitle = 'آخر أخبارنا التي أنجزناها';
  sectionSubtitle = 'نشارككم إنجازاتنا، قصص النجاح، والتقارير الشهرية بكل شفافية ووضوح';
 currentSlide = 0;
  isAnimating = false;
  newsItems: NewsItem[] = [
    { image: 'Images/1.jpg', title: 'تكريم 80 متطوعاً في حفل "صناع الأثر"', description: 'نظمت الجمعية حفل تكريم...', date: '5 ديسمبر 2024' },
    { image: 'Images/1.jpg', title: 'توقيع اتفاقية تعاون طبي...', description: 'وقعت المنظمة شراكة للرعاية...', date: '10 يناير 2025' },
    { image: 'Images/1.jpg', title: 'بدء تنفيذ مشروع ترميم...', description: 'بدأت الجمعية بتنفيذ المرحلة الأولى...', date: '1 فبراير 2025' },
    { image: 'Images/1.jpg', title: 'توزيع 1,000 سلة غذائية...', description: 'أطلقت الجمعية حملة رمضان الخير...', date: '15 مارس 2025' }
  ];

  currentIndex = 0;
  itemsPerPage = 4;

  ngOnInit(): void { }

  nextSlide() {
    
    this.isAnimating = true;
    this.currentSlide = (this.currentSlide + 1) % this.newsItems.length;
    console.log(this.currentSlide);

  }

  prevSlide() {
    
    this.isAnimating = true;
    this.currentSlide = this.currentSlide === 0 ? this.newsItems.length - 1 : this.currentSlide - 1;
    console.log(this.currentSlide);
 
  }
  goToSlide(index: number) {
    
    this.isAnimating = true;
    this.currentSlide = index;
    
  }

}