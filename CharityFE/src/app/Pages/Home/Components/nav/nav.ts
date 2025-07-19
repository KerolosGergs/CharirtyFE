import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.scss'
})
export class Nav {


  // Navigation items
navigationItems = [
  { label: 'الرئيسية', href: '/home', subLibels: [] },
  { label: 'طلبات المساعدة', href: '/HelpPeopole', subLibels: [
  ]},
  { label: 'عن الجمعية', href: '#', subLibels: [
    { subTitle: 'رؤيتنا', subLink: '/about/vision' },
    { subTitle: 'فريق العمل', subLink: '/about/team' }
  ]},
  { label: 'النشاط الطبي', href: '#', subLibels: [
    { subTitle: 'العيادات', subLink: '/medical/clinics' },
    { subTitle: 'التقارير الصحية', subLink: '/medical/reports' }
  ]},
  { label: 'المشاركة في الدعم', href: '#', subLibels: [
    { subTitle: 'تبرع الآن', subLink: '/support/donate' },
    { subTitle: 'الشراكة المجتمعية', subLink: '/support/partner' }
  ]},
  { label: 'التطوع', href: '#', subLibels: [
    { subTitle: 'انضم كمتطوع', subLink: '/volunteer/apply' },
    { subTitle: 'فرص التطوع', subLink: '/volunteer/opportunities' }
  ]},
  {
    label: 'التنمية المجتمعية وإصلاح ذات البين',
    href: '#',
    subLibels: [
      { subTitle: 'طلب إستشارة أونلاين', subLink: '/social/consult' },
      { subTitle: 'تقديم شكوى', subLink: '/social/complaint' },
      { subTitle: 'محاضرة توعوية', subLink: '/social/lecture' },
      { subTitle: 'تعريف عام بالنشاط', subLink: '/social/overview' }
    ]
  },
  { label: 'الخدمات الألكترونية', href: 'http://109.166.90.247/Login.aspx', subLibels: [] },
  { label: 'الحوكمة', href: '#', subLibels: [
    { subTitle: 'الشفافية', subLink: '/governance/transparency' },
    { subTitle: 'الهيكل الإداري', subLink: '/governance/structure' }
  ]},
  { label: 'النشاط الاستثماري', href: '#', subLibels: [
    { subTitle: 'المشاريع الحالية', subLink: '/investment/projects' },
    { subTitle: 'فرص الاستثمار', subLink: '/investment/opportunities' }
  ]},
  { label: 'الشكاوى والتواصل', href: '#', subLibels: [] }
];

  activeItem: any = null;


  constructor() { }

  // Method to handle navigation clicks
  onNavigationClick(item: any): void {
    event?.preventDefault();
  }



}
