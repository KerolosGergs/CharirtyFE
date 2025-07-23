import { Injectable } from '@angular/core';

export interface Achievement {
  title: string;
  value: string;
  icon: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {

  constructor() { }

  getAchievements(): Achievement[] {
    return [
      {
        title: 'إجمالي المشاريع',
        value: '259,000',
        icon: '📊',
        color: 'primary'
      },
      {
        title: 'معدل النجاح',
        value: '75%',
        icon: '🎯',
        color: 'success'
      },
      {
        title: 'عدد العملاء',
        value: '120',
        icon: '👥',
        color: 'info'
      },
      {
        title: 'المبيعات',
        value: '940',
        icon: '💰',
        color: 'warning'
      },
      {
        title: 'الموظفون',
        value: '1,500',
        icon: '👨‍💼',
        color: 'secondary'
      },
      {
        title: 'الفروع',
        value: '25',
        icon: '🏢',
        color: 'danger'
      }
    ];
  }

  getImagePath(): string {
    return 'assets/achievements_in_numbers.png';
  }

  getPdfPath(): string {
    return 'assets/achievements_report.pdf';
  }
}

