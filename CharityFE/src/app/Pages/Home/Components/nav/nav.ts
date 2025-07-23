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
  { label: 'عن الجمعية', href: '/about-layout/about', subLibels: [
    { subTitle: ' الرسالة والرؤية', subLink: '/about-layout/vision-mission' },
    { subTitle: 'نبذة عن الجمعية', subLink: '/about-layout/about-summary' },
    // { subTitle: 'الأهداف', subLink: '/about/team' },
    // { subTitle: 'القيم', subLink: '/about/team' },
    { subTitle: 'مهام الجمعية', subLink: '/about-layout/tasks-authorities' },
    { subTitle: 'الجمعية العمومية', subLink: '/about-layout/general-assembly' },
    { subTitle: 'مجلس الأدارة', subLink: '/about-layout/board-members' },
    { subTitle: 'الهيكل النظيمى', subLink: '/about-layout/organizational-structure' },
    { subTitle: 'مواقع العمل', subLink: '/about-layout/service-locations' },
  ]},
  {label: 'الحوكمة', href: '#', subLibels: [
      { subTitle: 'الأنظمة', subLink: '/governance/rules' },
      { subTitle: 'اللوائح', subLink: '/governance/regulations' },
      { subTitle: 'السياسات', subLink: '/governance/policies' },
      { subTitle: 'التقارير السنوية', subLink: '/governance/reports/yearly' },
      { subTitle: 'التقارير الربعية', subLink: '/governance/reports/quarterly' },
      { subTitle: 'القوائم المالية', subLink: '/governance/financials' },
      { subTitle: 'معايير الحوكمة', subLink: '/governance/standards' },
      { subTitle: 'نتائج تقييم الحوكمة', subLink: '/governance/evaluation' },
      { subTitle: 'الخطة الاستراتيجية', subLink: '/about-layout/strategic-plan' },
      { subTitle: 'الخطة التشغيلية', subLink: '/governance/operational-plan' },
    ]
  },
 {
    label: 'طلبات المساعدة', href: '#', subLibels: [
      { subTitle: 'ماذا نقدم؟', subLink: '/help/what-we-offer' },
      { subTitle: 'الفئات المستحقة', subLink: '/help/eligible-groups' },
      { subTitle: 'المستندات المطلوبة', subLink: '/help/documents' },
      { subTitle: 'الحصول على الخدمة', subLink: '/help/access' },
      { subTitle: 'إحصاءات', subLink: '/help/statistics' },
    ]
  },
  {
    label: 'المشاركة في الدعم', href: '#', subLibels: [
      { subTitle: 'نشاطات الجمعية', subLink: '/support/activities' },
      { subTitle: 'حسابات الجمعية', subLink: '/support/accounts' },
      { subTitle: 'الحصول على الخدمة', subLink: '/support/access' },
      { subTitle: 'إحصاءات', subLink: '/support/statistics' },
    ]
  },
   {
    label: 'التنمية وإصلاح ذات البين', href: '#', subLibels: [
      { subTitle: 'تعريف عام بالنشاط', subLink: '/development/overview' },
      { subTitle: 'طلب استشارة أون لاين', subLink: '/all-consultants' },
      { subTitle: 'تقديم شكوى', subLink: '/complaints' },
      { subTitle: 'محاضرات توعوية', subLink: '/development/lectures' },
      { subTitle: 'إحصاءات', subLink: '/development/statistics' },
    ]
  }, {
    label: 'النشاط الاستثماري', href: '#', subLibels: [
      { subTitle: 'تعريف عام بالنشاط', subLink: '/investment/overview' },
      { subTitle: 'الاستثمارات العقارية', subLink: '/investment/real-estate' },
      { subTitle: 'المشروعات الاستثمارية', subLink: '/investment/projects' },
      { subTitle: 'مشروعات التنمية المستدامة', subLink: '/investment/sustainable' },
      { subTitle: 'إحصاءات', subLink: '/investment/statistics' },
    ]
  },
   {
    label: 'الخدمات الطبية', href: '#', subLibels: [
      { subTitle: 'تعريف عام بالنشاط', subLink: '/medical/overview' },
      { subTitle: 'مركز غسيل الكلى', subLink: '/medical/dialysis' },
      { subTitle: 'مركز السمع والنطق', subLink: '/medical/speech' },
      { subTitle: 'الخدمات الطبية من خارج الجمعية', subLink: '/medical/external' },
      { subTitle: 'إحصاءات', subLink: '/medical/statistics' },
    ]
  },
   {
    label: 'التطوع', href: '#', subLibels: [
      { subTitle: 'تعريف بالنشاط', subLink: '/volunteer/overview' },
      { subTitle: 'ميثاق التطوع', subLink: '/volunteer/charter' },
      { subTitle: 'مجالات التطوع', subLink: '/volunteer/fields' },
      { subTitle: 'الحصول على الخدمة', subLink: '/volunteer/access' },
      { subTitle: 'إحصاءات التطوع', subLink: '/volunteer/statistics' },
    ]
  },
  {
    label: 'إنجازات الجمعية', href: '/achive', subLibels: [
      { subTitle: 'إحصاءات عامة', subLink: '/achive' },
    ]
  },
  {
    label: 'التواصل والشكاوى', href: '/about-layout/contact-phone', subLibels: [
      { subTitle: 'تقديم مقترح', subLink: '/contact/suggestion' },
      { subTitle: 'تقديم شكوى', subLink: '/complaints' },
      { subTitle: 'قياسات الرضا', subLink: '/Satisfaction' },
    ]
  },
];

  activeItem: any = null;


  constructor() { }

  // Method to handle navigation clicks
  onNavigationClick(item: any): void {
    event?.preventDefault();
  }



}
