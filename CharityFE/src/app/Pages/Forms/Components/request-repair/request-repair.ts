import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Nav } from "../../../Home/Components/nav/nav";
import { Footer } from "../../../../Shared/footer/footer";
import { HeaderComponent } from "../../../Home/Components/header-component/header-component";
import { HeaderComponentConsultant } from "../../../Consultant/Components/header-component-consultant/header-component-consultant";
import { ContactInfoComponent } from "../contact-info/contact-info";
import { Spinner } from "../../../../Shared/spinner/spinner";
import { RequestRepairService } from './service/RequestRepairService';
import { TostarServ } from './../../../../Shared/tostar-serv';

// Interfaces for type safety
interface FormField {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  iconClass: string;
}


@Component({
  selector: 'app-request-repair',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, Nav, Footer, HeaderComponent, HeaderComponentConsultant, ContactInfoComponent, Spinner],
  templateUrl: './request-repair.html',
  styleUrl: './request-repair.scss'
})
export class RequestRepair implements OnInit {
    contactForm!: FormGroup;
  formSection = { title: 'طلب إصلاح' };
  submitButton = { text: 'إرسال' };

  formFields: FormField[] = [
    {
      id: 'name',
      label: 'الاسم',
      placeholder: 'محمد احمد محمود',
      type: 'text',
      iconClass: 'bi-person-fill'
    },
    {
      id: 'phone',
      label: 'رقم الهاتف',
      placeholder: '939502045',
      type: 'tel',
      iconClass: 'bi-telephone-fill'
    },
    {
      id: 'email',
      label: 'البريد الإلكتروني',
      placeholder: 'Houda42@gmail.com',
      type: 'email',
      iconClass: 'bi-envelope-fill'
    }
  ];

  messageField = {
    id: 'message',
    label: 'اكتب طلبك هنا',
    placeholder: 'اكتب طلبك هنا',
    maxLength: 150
  };

  requestServ = inject(RequestRepairService);
  tostar = inject(TostarServ);
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required ]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(this.messageField.maxLength)]]
    });
  }

  get messageCharacterCount(): number {
    return this.contactForm.get('message')?.value?.length || 0;
  }

  hasError(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'هذا الحقل مطلوب';
      if (field.errors['email']) return 'يرجى إدخال بريد إلكتروني صحيح';
      if (field.errors['minlength']) return `الحد الأدنى ${field.errors['minlength'].requiredLength} أحرف`;
      if (field.errors['maxlength']) return `الحد الأقصى ${field.errors['maxlength'].requiredLength} حرف`;
      if (field.errors['pattern']) return 'يرجى إدخال رقم هاتف صحيح';
    }
    return '';
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = {
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        phoneNumber: this.contactForm.value.phone,
        requestText: this.contactForm.value.message
      };

      this.requestServ.AddRequestRapir(formData).subscribe(
        () => this.tostar.showSuccess('تم الارسال بنجاح'),
        () => this.tostar.showError('حدث خطأ')
      );

      this.contactForm.reset();
    } else {
      Object.keys(this.contactForm.controls).forEach(key => this.contactForm.get(key)?.markAsTouched());
    }
  }
}
