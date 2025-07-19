import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Nav } from "../../../Home/Components/nav/nav";
import { Footer } from "../../../../Shared/footer/footer";
import { HeaderComponent } from "../../../Home/Components/header-component/header-component";
import { HeaderComponentConsultant } from "../../../Consultant/Components/header-component-consultant/header-component-consultant";

export interface NavigationTab {
  id: string;
  label: string;
  icon: string;
  active: boolean;
}

export interface ContactInfo {
  phone: string;
  email: string;
}

export interface SocialMediaLink {
  platform: string;
  icon: string;
  url: string;
}

export interface FormField {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  required: boolean;
  value: string;
  iconClass?: string;
}


@Component({
  selector: 'app-help-peopole',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, Nav, Footer, HeaderComponent, HeaderComponentConsultant],
  templateUrl: './help-peopole.html',
  styleUrl: './help-peopole.scss'
})
export class HelpPeopole {
   pageTitle = 'كرامتك أولويتنا... وسرية بياناتك مسؤوليتنا';
  Title ='نحن هنا من أجلك... قدّم طلبك واحصل على الدعم';
  description ='نسعى لمدّ يد العون لكل من يمر بظروف صعبة. إذا كنت بحاجة إلى دعم غذائي، سكني، تعليمي أو صحي، يمكنك تقديم طلب المساعدة عبر النموذج أدناه، وسيتواصل معك فريقنا بعد دراسة الحالة.';
  navigationTabs: NavigationTab[] = [
    { id: 'help', label: 'مساعدة تعليمية', icon: 'bi-calendar', active: true },
    { id: 'tab1', label: 'اسم القسم', icon: 'bi-calendar', active: false },
    { id: 'tab2', label: 'اسم القسم', icon: 'bi-calendar', active: false },
    { id: 'tab3', label: 'اسم القسم', icon: 'bi-calendar', active: false },
    { id: 'tab4', label: 'اسم القسم', icon: 'bi-calendar', active: false }
  ];

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

  formSection = {
    title: 'مساعدة تعليمية'
  };

   formFields: FormField[] = [
    { id: 'name', label: 'الاسم', placeholder: 'محمد احمد محمود', type: 'text', required: true, value: '', iconClass: 'bi-person-fill' },
    { id: 'phone', label: 'رقم الهاتف', placeholder: '939502045', type: 'tel', required: true, value: '', iconClass: 'bi-telephone-fill' },
    { id: 'email', label: 'البريد الإلكتروني', placeholder: 'Houda42@gmail.com', type: 'email', required: true, value: '', iconClass: 'bi-envelope-fill' }
  ];


  messageField = {
    id: 'message',
    label: 'اكتب طلبك هنا',
    placeholder: 'اكتب طلبك هنا',
    maxLength: 150,
    value: ''
  };

  submitButton = {
    text: 'إرسال'
  };


  selectTab(tabId: string): void {
    this.navigationTabs.forEach(tab => tab.active = tab.id === tabId);
    this.formSection.title = this.navigationTabs.find(tab => tab.id === tabId)?.label || '';
  }

  getCharacterCount(): number {
    return this.messageField.value.length;
  }

  isFormValid(): boolean {
    const fieldsValid = this.formFields.every(field => !field.required || field.value.trim() !== '');
    return fieldsValid && this.messageField.value.trim() !== '';
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      const formData = {
        name: this.formFields.find(f => f.id === 'name')?.value,
        phone: this.formFields.find(f => f.id === 'phone')?.value,
        email: this.formFields.find(f => f.id === 'email')?.value,
        message: this.messageField.value
      };
      console.log('Form Submitted:', formData);
      alert('تم إرسال طلبك بنجاح!');
      this.resetForm();
    }
  }

  resetForm(): void {
    this.formFields.forEach(field => field.value = '');
    this.messageField.value = '';
  }

  onSocialMediaClick(link: SocialMediaLink): void {
    window.open(link.url, '_blank');
  }
}