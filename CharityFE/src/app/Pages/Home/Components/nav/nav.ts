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
    // { subTitle: 'الأهداف', subLink: '/blank-page' },
    // { subTitle: 'القيم', subLink: '/blank-page' },
    { subTitle: 'مهام الجمعية', subLink: '/about-layout/tasks-authorities' },
    { subTitle: 'الجمعية العمومية', subLink: '/about-layout/general-assembly' },
    { subTitle: 'مجلس الأدارة', subLink: '/about-layout/board-members' },
    { subTitle: 'الهيكل النظيمى', subLink: '/about-layout/organizational-structure' },
    { subTitle: 'مواقع العمل', subLink: '/about-layout/service-locations' },
  ]},
  {label: 'الحوكمة', href: '/governance/rules', subLibels: [
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
    label: 'طلبات المساعدة', href: '/help-layout/we-offer', subLibels: [
      { subTitle: 'ماذا نقدم؟', subLink: '/help-layout/we-offer' },
      { subTitle: 'الفئات المستحقة', subLink: '/help-layout/eligible' },
      { subTitle: 'المستندات المطلوبة', subLink: '/help-layout/requirements' },
      { subTitle: 'الحصول على الخدمة', subLink: '/HelpPeopole' },
      { subTitle: 'إحصاءات', subLink: '/blank-page' },
   
    ]
  },
  
  {
    label: 'المشاركة في الدعم', href: '/support-layout/bank-accounts', subLibels: [
      { subTitle: 'نشاطات الجمعية', subLink: '/blank-page' },
      { subTitle: 'حسابات الجمعية', subLink: '/support-layout/bank-accounts' },
      { subTitle: 'الحصول على الخدمة', subLink: 'https://jkmm.org.sa/ElectronicServices/Donate#' },
      { subTitle: 'إحصاءات', subLink: '/blank-page' },

    ]
  },
   {
    label: 'التنمية وإصلاح ذات البين', href: '/blank-page', subLibels: [
      { subTitle: 'تعريف عام بالنشاط', subLink: '/blank-page' },
      { subTitle: 'طلب استشارة أون لاين', subLink: '/all-consultants' },
      { subTitle: 'تقديم شكوى', subLink: '/complaints' },
      { subTitle: 'محاضرات توعوية', subLink: '/awarness-lecture' },
      { subTitle: 'إحصاءات', subLink: '/blank-page' },
    ]
  }, {
    label: 'النشاط الاستثماري', href: '/investment-layout/real-state', subLibels: [
      { subTitle: 'تعريف عام بالنشاط', subLink: '/blank-page' },
      { subTitle: 'الاستثمارات العقارية', subLink: '/investment-layout/real-state' },
      { subTitle: 'المشروعات الاستثمارية', subLink: '/investment-layout/invest-project' },
      { subTitle: 'مشروعات التنمية المستدامة', subLink: '/blank-page' },
      { subTitle: 'إحصاءات', subLink: '/blank-page' },
    ]
  },
   {
    label: 'الخدمات الطبية', href: '/medcineLayout/GeneralDefinition', subLibels: [
      { subTitle: 'تعريف عام بالنشاط', subLink: '/medcineLayout/GeneralDefinition' },
      { subTitle: 'مركز غسيل الكلى', subLink: '/medcineLayout/MedicalCenter' },
      { subTitle: 'مركز السمع والنطق', subLink: '/medcineLayout/HairingCenter' },
      { subTitle: 'الخدمات الطبية من خارج الجمعية', subLink: '/blank-page' },
      { subTitle: 'إحصاءات', subLink: '/blank-page' },
    ]
  },
   {
    label: 'التطوع', href: '/volunteer-layout/unit', subLibels: [
      { subTitle: 'تعريف بالنشاط', subLink: '/volunteer-layout/unit' },
      { subTitle: 'ميثاق التطوع', subLink: '/blank-page' },
      { subTitle: 'مجالات التطوع', subLink: '/volunteer-layout/volunteer-medical' },
      { subTitle: 'الحصول على الخدمة', subLink: '/Voulenteer' },
      { subTitle: 'إحصاءات التطوع', subLink: '/blank-page' },
    ]
  },

  {
    label: 'التواصل والشكاوى', href: '/about-layout/contact-phone', subLibels: [
      { subTitle: 'تقديم مقترح', subLink: '/blank-page' },
      { subTitle: 'تقديم شكوى', subLink: '/complaints' },
      { subTitle: 'قياسات الرضا', subLink: '/Satisfaction' },
    ]
  },
];

  activeItem: any = null;


  constructor() { }

  // Method to handle navigation clicks
  // onNavigationClick(item: any): void {
  //   event?.preventDefault();
  // }
isNavbarCollapsed = true;
// activeItem: any = null;

// onNavigationClick(item: any): void {
//   // Optional: You can close the navbar on mobile click
//   this.isNavbarCollapsed = true;
// }

// activeItem: any = null;
  isMenuCollapsed: boolean = true;

  isDesktop(): boolean {
    return window.innerWidth >= 768;
  }

  onNavigationClick(item: any): void {
    // Existing click handler logic
  }

  onMobileItemClick(item: any): void {
    if (!this.isDesktop()) {
      this.activeItem = this.activeItem === item ? null : item;
    }
  }
}
