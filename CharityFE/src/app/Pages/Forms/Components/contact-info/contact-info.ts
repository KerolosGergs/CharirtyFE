import { Component } from '@angular/core';
import { ContactInfo, SocialMediaLink } from '../help-peopole/model/ihelp';

@Component({
  selector: 'app-contact-info',
  imports: [],
  templateUrl: './contact-info.html',
  styleUrl: './contact-info.scss'
})
export class ContactInfoComponent {
contactSection = {
  title: 'محتاج مساعدة أكثر!',
  subtitle: 'نحن هنا لمساعدتك و الرد على استفساراتك.'
};

contactInfo: ContactInfo = {
  phone: '456-7890 (123)',
  email: 'Groupcharity@gmail.com'
};

socialMediaLinks: SocialMediaLink[] = [
  { platform: 'Facebook', icon: 'bi-facebook', url: '#' },
  { platform: 'Twitter', icon: 'bi-twitter-x', url: '#' },
  { platform: 'LinkedIn', icon: 'bi-linkedin', url: '#' },
  { platform: 'WhatsApp', icon: 'bi-whatsapp', url: '#' },
  { platform: 'Instagram', icon: 'bi-instagram', url: '#' }
];

onSocialMediaClick(link: SocialMediaLink): void {
  window.open(link.url, '_blank');
}
}
