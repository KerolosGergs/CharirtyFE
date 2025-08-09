import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DynamicPagesService, ApiResponse } from '../../../../dynamic-pages/dynamic-pages.service';
import { NavItemService } from '../../../../Core/Services/NavItem/nav-item';
import { NavItemDto } from '../../../../Core/Interfaces/NavItem/nav-item';
@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.scss'
})
export class Nav implements OnInit {
navigationItems:NavItemDto[]=[];
  // Navigation items
    // navigationItems: NavItemDto[] = [
    //   { label: 'الرئيسية', href: '/home', pages: [] },
    //   { label: 'عن الجمعية', href: '/about-layout/about', pages: [
    //     { subTilte: ' الرسالة والرؤية', subLink: '/about-layout/vision-mission' },
    //     { subTilte: 'نبذة عن الجمعية', subLink: '/about-layout/about-summary' },
    //     // { subTilte: 'الأهداف', subLink: '/blank-page' },
    //     // { subTilte: 'القيم', subLink: '/blank-page' },
    //     { subTilte: 'مهام الجمعية', subLink: '/about-layout/tasks-authorities' },
    //     { subTilte: 'الجمعية العمومية', subLink: '/about-layout/general-assembly' },
    //     { subTilte: 'مجلس الأدارة', subLink: '/about-layout/board-members' },
    //     { subTilte: 'الهيكل النظيمى', subLink: '/about-layout/organizational-structure' },
    //     { subTilte: 'مواقع العمل', subLink: '/about-layout/service-locations' },
    //     { subTilte: 'مكتبة الصور والفيديوهات', subLink: '/about-layout/ImageLibrary' },
    //   ]},
    //   {label: 'الحوكمة', href: '/governance/regulations', pages: [
    //       { subTilte: 'الأنظمة واللوائح ', subLink: '/governance/regulations' },
    //       { subTilte: 'السياسات', subLink: '/governance/policies' },
    //       { subTilte: 'التقارير السنوية', subLink: '/blank-page' },
    //       { subTilte: 'التقارير الربعية', subLink: '/governance/quarterly-reports' },
    //       { subTilte: 'القوائم المالية', subLink: '/governance/financial-reports' },
    //       { subTilte: 'معايير الحوكمة', subLink: '/blank-page' },
    //       { subTilte: 'نتائج تقييم الحوكمة', subLink: '/governance/governance-evaluation' },
    //       { subTilte: 'الخطة الاستراتيجية', subLink: '/governance/strategic-plans' },
    //       { subTilte: 'الخطة التشغيلية', subLink: '/governance/operational-plan' },
    //       { subTilte: 'الأهداف', subLink: '/governance/Goals' },

    //     ]
    //   },
    // {
    //     label: 'طلبات المساعدة', href: '/help-layout/we-offer', pages: [
    //       { subTilte: 'ماذا نقدم؟', subLink: '/help-layout/we-offer' },
    //       { subTilte: 'الفئات المستحقة', subLink: '/help-layout/eligible' },
    //       { subTilte: 'المستندات المطلوبة', subLink: '/help-layout/requirements' },
    //       { subTilte: 'الحصول على الخدمة', subLink: '/HelpPeopole' },
    //       { subTilte: 'إحصاءات', subLink: '/blank-page' },
      
    //     ]
    //   },
      
    //   {
    //     label: 'المشاركة في الدعم', href: '/support-layout/bank-accounts', pages: [
    //       { subTilte: 'نشاطات الجمعية', subLink: '/blank-page' },
    //       { subTilte: 'حسابات الجمعية', subLink: '/support-layout/bank-accounts' },
    //       { subTilte: 'الحصول على الخدمة', subLink: 'https://jkmm.org.sa/ElectronicServices/Donate#' },
    //       { subTilte: 'إحصاءات', subLink: '/blank-page' },

    //     ]
    //   },
    //   {
    //     label: 'التنمية وإصلاح ذات البين', href: '/blank-page', pages: [
    //       { subTilte: 'تعريف عام بالنشاط', subLink: '/blank-page' },
    //       { subTilte: 'طلب استشارة أون لاين', subLink: '/all-consultants' },
    //       { subTilte: 'تقديم شكوى', subLink: '/complaints' },
    //       { subTilte: 'محاضرات توعوية', subLink: '/awarness-lecture' },
    //       { subTilte: 'إحصاءات', subLink: '/blank-page' },
    //     ]
    //   }, {
    //     label: 'النشاط الاستثماري', href: '/investment-layout/real-state', pages: [
    //       { subTilte: 'تعريف عام بالنشاط', subLink: '/blank-page' },
    //       { subTilte: 'الاستثمارات العقارية', subLink: '/investment-layout/real-state' },
    //       { subTilte: 'المشروعات الاستثمارية', subLink: '/investment-layout/invest-project' },
    //       { subTilte: 'مشروعات التنمية المستدامة', subLink: '/blank-page' },
    //       { subTilte: 'إحصاءات', subLink: '/blank-page' },
    //     ]
    //   },
    //   {
    //     label: 'الخدمات الطبية', href: '/medcineLayout/GeneralDefinition', pages: [
    //       { subTilte: 'تعريف عام بالنشاط', subLink: '/medcineLayout/GeneralDefinition' },
    //       { subTilte: 'مركز غسيل الكلى', subLink: '/medcineLayout/MedicalCenter' },
    //       { subTilte: 'مركز السمع والنطق', subLink: '/medcineLayout/HairingCenter' },
    //       { subTilte: 'الخدمات الطبية من خارج الجمعية', subLink: '/blank-page' },
    //       { subTilte: 'إحصاءات', subLink: '/blank-page' },
    //     ]
    //   },
    //   {
    //     label: 'التطوع', href: '/volunteer-layout/unit', pages: [
    //       { subTilte: 'تعريف بالنشاط', subLink: '/volunteer-layout/unit' },
    //       { subTilte: 'ميثاق التطوع', subLink: '/blank-page' },
    //       { subTilte: 'مجالات التطوع', subLink: '/volunteer-layout/volunteer-medical' },
    //       { subTilte: 'الحصول على الخدمة', subLink: '/Voulenteer' },
    //       { subTilte: 'إحصاءات التطوع', subLink: '/blank-page' },
    //     ]
    //   },

    //   {
    //     label: 'التواصل والشكاوى',
    //     href: '/about-layout/contact-phone',
    //     pages: [
    //       { subTilte: 'تقديم مقترح', subLink: '/blank-page' },
    //       { subTilte: 'تقديم شكوى', subLink: '/complaints' },
    //       { subTilte: 'قياسات الرضا', subLink: '/Satisfaction' },
    //     ]
    //   },

    //   // // New separate dynamic pages dropdown
    //   // {
    //   //   label: 'صفحات إضافية',
    //   //   href: '#',
    //   //   pages: [
    //   //     // This will be populated dynamically
    //   //   ]
    //   // },
    // ];

  activeItem: any = null;
  isMenuCollapsed: boolean = true;

  constructor(private dynamicPagesService: DynamicPagesService,private NavItemService:NavItemService) { }

  ngOnInit(): void {
    this.loadDynamicPages();
  }

  loadDynamicPages(): void {
this.NavItemService.getAllNavItems().subscribe({
  next: (resp: ApiResponse<NavItemDto[]>) => {
    this.navigationItems = resp.data;
  },
  error: () => {
    console.error('Failed to load navigation items');
  }
})
    // this.dynamicPagesService.getPages().subscribe({
    //   next: (resp: any) => {
    //     const pages = resp?.data ?? [];
    //     // Find the "صفحات إضافية" item and update its subLibels
    //     const dynamicPagesItem = this.navigationItems.find(item => item.label === 'صفحات إضافية');
        
    //     if (dynamicPagesItem) {
    //       dynamicPagesItem.subLibels = pages.map((page: any) => ({
    //         subTitle: page.pageName,
    //         subLink: `/dynamic-page/${page.id}`
    //       }));
    //     }
    //   },
    //   error: () => {
    //     console.error('Failed to load dynamic pages');
    //   }
    // });
  }

  isDesktop(): boolean {
    return window.innerWidth >= 768;
  }

  onNavigationClick(item: any ,event: MouseEvent): void {
    // Existing click handler logic
  }

  onMobileItemClick(item: any): void {
    if (!this.isDesktop()) {
      this.activeItem = this.activeItem === item ? null : item;
    }
  }
  // UPDATED: helpers to classify and normalize links
isExternalLink(url?: string | null): boolean {
  if (!url) return false;
  // http/https, protocol-relative //, www., mailto, tel
  return /^(https?:)?\/\//i.test(url) || /^www\./i.test(url) || /^(mailto:|tel:)/i.test(url);
}

toAbsolute(url?: string | null): string {
  if (!url) return '#';
  if (/^(mailto:|tel:)/i.test(url)) return url;
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('//')) return (typeof window !== 'undefined' ? window.location.protocol : 'https:') + url;
  if (url.startsWith('www.')) return 'https://' + url;
  return url; // keep as-is for routerLink paths like /Satisfaction
}



}
