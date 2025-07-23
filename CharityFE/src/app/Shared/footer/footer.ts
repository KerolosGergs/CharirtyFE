import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',

})
export class Footer {
  socialLinks = {
    facebook: 'https://facebook.com/yourcompany',
    twitter: 'https://twitter.com/yourcompany',
    linkedin: 'https://linkedin.com/company/yourcompany',
    whatsapp: 'https://wa.me/yourphonenumber',
    instagram: 'https://instagram.com/yourcompany'
  };

  // Footer menu items - you can customize these
  contactMenuItems ={ label: 'تواصل معنا', link: '/about-layout/contact-phone', subLabel: [
    { label: 'أرقام التواصل', link: '/about-layout/contact-phone' },
    // { label: 'Menu Item 2', link: '/contact-2' },
    // { label: 'Menu Item 3', link: '/contact-3' },
    // { label: 'Menu Item 4', link: '/contact-4' }
  ]};

  servicesMenuItems = {
    label: 'خدماتنا', link: '', subLabel: [
      { label: 'طلبات المساعدة', link: '/HelpPeopole' },
      { label: 'طلب أستشارة', link: '/all-consultants' },
      { label: 'تقديم شكوى', link: '/complaints' },
    ]
  };

  quickLinksMenuItems =
    {
      label: 'روابط سريعة', link: '/about-layout',
      subLabel: [
        { label: 'من نحن', link:'/about-layout' },
        { label: 'الرسالة والرؤية', link: 'about-layout/vision-mission' },
      ]
    }
    ;

  // Company information
  companyInfo = {
    description: 'الجمعية الخيرية بمكة المكرمة، جمعية غير ربحية تم تأسيسها عام ١٣٩٨ هـ. مسجلة بالمركز الوطني لتنمية القطاع غير الربحي بالرقم 29.',
    copyright: 'الجمعية الخيرية بمكة المكرمة للخدمات الإنسانية. جميع الحقوق محفوظة  @  2025'
  };

  // Method to handle social media link clicks
  onSocialLinkClick(platform: string): void {
    const url = this.socialLinks[platform as keyof typeof this.socialLinks];
    if (url) {
      window.open(url, '_blank');
    }
  }

  // Method to handle menu item clicks
  onMenuItemClick(link: string): void {
    // You can implement navigation logic here
    // For example, using Angular Router
    console.log('Navigating to:', link);
  }
}

