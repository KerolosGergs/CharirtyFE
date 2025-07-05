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
  contactMenuItems ={ label: 'تواصل معنا', link: '', subLabel: [
    { label: 'Menu Item 1', link: '/contact-1' },
    { label: 'Menu Item 2', link: '/contact-2' },
    { label: 'Menu Item 3', link: '/contact-3' },
    { label: 'Menu Item 4', link: '/contact-4' }
  ]};

  servicesMenuItems = {
    label: 'خدماتنا', link: '', subLabel: [
      { label: 'Menu Item 1', link: '/service-1' },
      { label: 'Menu Item 2', link: '/service-2' },
      { label: 'Menu Item 3', link: '/service-3' },
      { label: 'Menu Item 4', link: '/service-4' }
    ]
  };

  quickLinksMenuItems =
    {
      label: 'من نحن', link: '/about',
      subLabel: [
        { label: 'Menu Item 2', link: '/quick-2' },
        { label: 'Menu Item 3', link: '/quick-3' },
        { label: 'Menu Item 4', link: '/quick-4' }
      ]
    }
    ;

  // Company information
  companyInfo = {
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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

