import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss'
})
export class AboutUs {
  founders = [
    'صاحب السمو الملكي الأمير ماجد بن عبد العزيز',
    'السيد أمين بن عقيل عطاس',
    'الشيخ صالح بن محمد جمال',
    'د.حامد بن محمود هرساني',
    'الشيخ منصور بن عبدالله زيد',
    'السيد عباس بن أحمد زواوي',
    'الشيخ رشاد نقيب',
    'الشيخ إسماعيل دهلوي',
    'السيد فؤاد حمدي',
    'الشيخ إبراهيم سليم',
    'الشيخ عبدالله عاشور',
    'الشيخ جعفر داغستاني',
    'الشيخ عبدالفتاح بوقس',
    'الشيخ عبدالله بن طه بخش'
  ];

  founderColors = [
    '#198754', '#6f42c1', '#fd7e14', '#0dcaf0', '#ffc107', '#dc3545', '#20c997', '#6610f2', '#ffb300', '#00bcd4'
  ];

  @ViewChild('carousel', { static: false }) foundersCarousel?: ElementRef;

  services = [
    { icon: 'bi-mortarboard', title: 'خدمات تعليمية' },
    { icon: 'bi-heart-pulse', title: 'خدمات صحية' },
    { icon: 'bi-box', title: 'خدمات عينية' },
    { icon: 'bi-cash-coin', title: 'مساعدات مالية' },
    { icon: 'bi-house', title: 'خدمات إسكانية' },
    { icon: 'bi-people', title: 'إنشاء الدور الاجتماعية ومراكز الإيواء' },
    { icon: 'bi-emoji-smile', title: 'رعاية الاطفال حول المسجد الحرام' }
  ];

  expenses = [
    'اشتراكات الأعضاء.',
    'التبرعات والهبات والزكوات.',
    'إيرادات الأنشطة.',
    'الإعانات الحكومية.',
    'الوصايا والأوقاف.',
    'عائدات استثمارات ممتلكات الجمعية الثابتة والمنقولة.'
  ];

  getExpenseIcon(index: number): string {
    // أيقونات مناسبة لكل مصدر دخل
    const icons = [
      'bi-person-badge',      // اشتراكات الأعضاء
      'bi-gift',              // التبرعات والهبات والزكوات
      'bi-graph-up',          // إيرادات الأنشطة
      'bi-bank',              // الإعانات الحكومية
      'bi-journal-bookmark',  // الوصايا والأوقاف
      'bi-cash-coin'          // عائدات الاستثمارات
    ];
    return icons[index] || 'bi-wallet2';
  }

  bankAccounts = [
    { bank: 'الأهلي NBC', type: 'جاري زكاة', number: '00113590000106', iban: 'SA3110000000113590000106' },
    { bank: 'الأهلي NBC', type: 'مركز السمع والنطق', number: '00752654000108', iban: 'SA3210000000752654000108' },
    { bank: 'مصرف الراجحي', type: 'جاري', number: '443608010012503', iban: 'SA3480000443608010012503' },
    { bank: 'مصرف الراجحي', type: 'زكاة', number: '44360801005506', iban: 'SA4580000443608010015506' },
    { bank: 'بنك الرياض', type: 'جاري', number: '1222226609940', iban: 'SA1220000001222226609940' },
    { bank: 'مصرف الانماء', type: 'جاري', number: '68259000000000', iban: 'SA6705000068259000000000' },
    { bank: 'مصرف الانماء', type: 'زكاة', number: '68259000000001', iban: 'SA6705000068259000000001' },
    { bank: 'العربي ANB', type: 'مركز غسيل الكلى الخيري', number: '0108051649640011', iban: 'SA8930400108051649640011' }
  ];

  copiedIndex: number | null = null;
  copiedField: 'number' | 'iban' | null = null;
  copyTimeout: any;

  copyToClipboard(value: string, index: number, field: 'number' | 'iban') {
    navigator.clipboard.writeText(value);
    this.copiedIndex = index;
    this.copiedField = field;
    if (this.copyTimeout) clearTimeout(this.copyTimeout);
    this.copyTimeout = setTimeout(() => {
      this.copiedIndex = null;
      this.copiedField = null;
    }, 1500);
  }

  getInitials(name: string): string {
    const words = name.split(' ');
    return words.slice(0, 2).map(w => w[0]).join('').replace(/[^\u0600-\u06FFa-zA-Z]/g, '');
  }

  scrollFounders(direction: 'left' | 'right') {
    if (this.foundersCarousel) {
      const el = this.foundersCarousel.nativeElement as HTMLElement;
      const scrollAmount = 200;
      if (direction === 'left') {
        el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  }
} 