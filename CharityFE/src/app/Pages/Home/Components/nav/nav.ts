import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.scss'
})
export class Nav {


  // Navigation items
  navigationItems = [
    { label: 'الرئيسية', href: '#' ,subLibels:[] },
    { label: 'طلبات المساعدة', href: '#' ,subLibels:['الرئيسية','الرئيسية']},
    { label: 'عن الجمعية', href: '#' ,subLibels:['الرئيسية','الرئيسية']},
    { label: 'النشاط الخيري', href: '#' ,subLibels:['الرئيسية','الرئيسية']},
    { label: 'المشاركة في الدعم', href: '#',subLibels:['الرئيسية','الرئيسية'] },
    { label: 'النشوء', href: '#' ,subLibels:['الرئيسية','الرئيسية']},
    { label: 'التنمية المجتمعية وإصلاح ذات البين', href: '#' ,subLibels:['الرئيسية','الرئيسية']},
    { label: 'الدوحة', href: '#',subLibels:['الرئيسية','الرئيسية'] },
    { label: 'النشاط الاستثماري', href: '#' ,subLibels:['الرئيسية','الرئيسية']},
    { label: 'الشكاوى والتواصل', href: '#' ,subLibels:[]}
  ];
activeItem: any = null;


  constructor() { }

  // Method to handle navigation clicks
  onNavigationClick(item: any): void {
  event?.preventDefault();
  }


 
}
