import { Component } from '@angular/core';

interface StatisticItem {
  number: number;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-statistics-card',
  templateUrl: './statistics-card-revised.component.html',
  styleUrls: ['./statistics-card-revised.component.css']
})
export class StatisticsCardComponent {
  
  statistics: StatisticItem[] = [
    {
      number: 300,
      label: 'حالة',
      icon: 'bi-clipboard-check'
    },
    {
      number: 200,
      label: 'متطوع',
      icon: 'bi-people'
    },
    {
      number: 50,
      label: 'مشروع',
      icon: 'bi-folder'
    },
    {
      number: 150,
      label: 'مستفيد',
      icon: 'bi-person-check'
    }
  ];

  constructor() { }

  trackByIndex(index: number, item: StatisticItem): number {
    return index;
  }

}

