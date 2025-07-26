import { Component, computed, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-dashboard-main',
  standalone: true,
  imports: [NgClass,NgStyle],
  templateUrl: './dashboard-main.html',
  styleUrl: './dashboard-main.scss'
})
export class DashboardMain {
  cards = [
    {
      name: 'عدد الاستشارات',
      number: '600,532',
      icon: 'bi-mic',
      bgColor: '#FFF5EB'
    },
    {
      name: 'عدد الخدمات',
      number: '600,532',
      icon: 'bi-grid',
      bgColor: '#EDF8ED'
    },
    {
      name: 'عدد المستشارين',
      number: '600,532',
      icon: 'bi-people',
      bgColor: '#EDF4FA'
    },
    {
      name: 'عدد المستخدمين',
      number: '600,532',
      icon: 'bi-person',
      bgColor: '#FAEAEA'
    }
  ];

  volunteerBars = [
    { height: 60, label: '01', color: 'var(--primary-500)' },
    { height: 80, label: '02', color: 'var(--primary-500)' },
    { height: 100, label: '03', color: 'var(--primary-500)' },
    { height: 120, label: '04', color: 'var(--primary-500)' },
    { height: 90, label: '05', color: 'var(--primary-500)' },
    { height: 110, label: '06', color: 'var(--primary-500)' }
  ];

  volunteerTotal = '86,929';

  complaints = [
    { title: 'الشكاوى عن موظفين', percentage: 26, barClass: 'bg-danger' },
    { title: 'الشكاوى عن خدمات', percentage: 24, barClass: 'bg-warning' },
    { title: 'الشكاوى عن الجودة', percentage: 26, barClass: 'bg-primary' },
    { title: 'شكاوى أخرى', percentage: 24, barClass: 'bg-success' }
  ];

  complaintsTotal = '86,929';

  supportPoints = [
    { label: 'سبتمبر', value: '1,200', highlight: false },
    { label: 'أكتوبر', value: '1,800', highlight: false },
    { label: 'نوفمبر', value: '2,100', highlight: false },
    { label: 'ديسمبر', value: '2,683', highlight: false },
    { label: 'يناير', value: '3,200', highlight: false },
    { label: 'فبراير', value: '3,800', highlight: false }
  ];

  supportTotal = '38.4K';
  supportGrowth = 75;

}