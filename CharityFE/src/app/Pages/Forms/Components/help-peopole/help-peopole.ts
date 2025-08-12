import { Router } from '@angular/router';
import { TostarServ } from './../../../../Shared/tostar-serv';
import { HelpService } from './service/help-service';
import { CommonModule, NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Nav } from "../../../Home/Components/nav/nav";
import { Footer } from "../../../../Shared/footer/footer";
import { HeaderComponent } from "../../../Home/Components/header-component/header-component";
import { HeaderComponentConsultant } from "../../../Consultant/Components/header-component-consultant/header-component-consultant";
import { ContactInfo, FormField, IHelpType, NavigationTab, SocialMediaLink } from './model/ihelp';
import { ContactInfoComponent } from "../contact-info/contact-info";




@Component({
  selector: 'app-help-peopole',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, Nav, Footer, HeaderComponent, HeaderComponentConsultant, ContactInfoComponent],
  templateUrl: './help-peopole.html',
  styleUrl: './help-peopole.scss'
})
export class HelpPeopole implements OnInit {

  HelpService = inject(HelpService);
  TostarServ = inject(TostarServ);
  Router = inject(Router);

pageTitle = 'كرامتك أولويتنا... وسرية بياناتك مسؤوليتنا';
Title = 'نحن هنا من أجلك... قدّم طلبك واحصل على الدعم';
description = 'نسعى لمدّ يد العون لكل من يمر بظروف صعبة...';

navigationTabs: NavigationTab[] = [];
selectedTabId: number | null = null;





formSection = {
  title: 'مساعدة تعليمية'
};

formFields: FormField[] = [
  { id: 'name', label: 'الاسم', placeholder: 'الاسم الكامل', type: 'text', required: true, value: '', iconClass: 'bi-person-fill' },
  { id: 'phone', label: 'رقم الهاتف', placeholder: '966xxxxxxxxx', type: 'tel', required: true, value: '', iconClass: 'bi-telephone-fill' },
  { id: 'email', label: 'البريد الإلكتروني', placeholder: 'user@example.com', type: 'email', required: true, value: '', iconClass: 'bi-envelope-fill' }




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

ngOnInit(): void {
  this.loadHelpType();
}

loadHelpType(): void {
  this.HelpService.getHelpType().subscribe({
    next: (data: IHelpType[]) => {
      data.forEach(item =>
        this.navigationTabs.push({
          id: item.id,
          label: item.name,
          active: false
        })
      );
    },
    error: (err) => {
      console.error('Failed to load help types', err);
    }
  });
}

selectTab(tabId: number): void {
  this.selectedTabId = tabId;
  this.navigationTabs.forEach(tab => tab.active = tab.id === tabId);
  this.formSection.title = this.navigationTabs.find(tab => tab.id === tabId)?.label || '';
}

getCharacterCount(): number {
  return this.messageField.value.length;
}

isFormValid(): boolean {
  const fieldsValid = this.formFields.every(field => !field.required || field.value.trim() !== '');
  const tabSelected = this.selectedTabId !== null;
  return fieldsValid && tabSelected && this.messageField.value.trim() !== '';
}

onSubmit(): void {
  if (this.isFormValid()) {
    const formData = {
      helpTypeId: this.selectedTabId,
      name: this.formFields.find(f => f.id === 'name')?.value,
      PhoneNumber: this.formFields.find(f => f.id === 'phone')?.value,
      email: this.formFields.find(f => f.id === 'email')?.value,
      Notes: this.messageField.value
    };
    this.HelpService.AddHelp(formData).subscribe(
      response => {
        if(response.success === false){
          this.TostarServ.showError('خطاء في ارسال طلبك');
        }
        this.TostarServ.showSuccess('تم إرسال طلبك بنجاح!');
      },
      error => {
        this.TostarServ.showError('خطاء في ارسال طلبك');
      }
    );
    this.Router.navigateByUrl('/home');
    this.resetForm();
  }
}

resetForm(): void {
  this.formFields.forEach(field => field.value = '');
  this.messageField.value = '';
  this.selectedTabId = null;
  this.navigationTabs.forEach(tab => tab.active = false);
}


}