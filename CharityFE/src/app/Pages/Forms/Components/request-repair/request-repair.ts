import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Nav } from "../../../Home/Components/nav/nav";
import { Footer } from "../../../../Shared/footer/footer";
import { HeaderComponent } from "../../../Home/Components/header-component/header-component";
import { HeaderComponentConsultant } from "../../../Consultant/Components/header-component-consultant/header-component-consultant";
import { FormField, SocialMediaLink } from '../help-peopole/model/ihelp';
import { ContactInfoComponent } from "../contact-info/contact-info";
import { Spinner } from "../../../../Shared/spinner/spinner";

// Interfaces for type safety
export interface ContactInfo {
  phone: string;
  email: string;
}

export interface SocialLink {
  icon: string;
  url: string;
  ariaLabel: string;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-request-repair',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, Nav, Footer, HeaderComponent, HeaderComponentConsultant, ContactInfoComponent, Spinner],
  templateUrl: './request-repair.html',
  styleUrl: './request-repair.scss'
})
export class RequestRepair implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  showSuccess = false;
    contactSection = {
    title: 'محتاج مساعدة أكثر!',
    subtitle: 'نحن هنا لمساعدتك و الرد على استفساراتك.'
  };
  // Contact information data



 
formSection = {
    title: 'طلب إصلاح'
  };
  // Form labels and placeholders
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
  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]]
    });
  }

  ngOnInit(): void {
    // Initialize any additional setup if needed
  }

  // Get character count for message field
  get messageCharacterCount(): string {
    const messageLength = this.contactForm.get('message')?.value?.length || 0;
    return `${messageLength}/150`;
  }

  // Check if form field has error
  hasError(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Get error message for field
  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return 'هذا الحقل مطلوب';
      }
      if (field.errors['email']) {
        return 'يرجى إدخال بريد إلكتروني صحيح';
      }
      if (field.errors['minlength']) {
        return `الحد الأدنى ${field.errors['minlength'].requiredLength} أحرف`;
      }
      if (field.errors['maxlength']) {
        return `الحد الأقصى ${field.errors['maxlength'].requiredLength} حرف`;
      }
    }
    return '';
  }

  // Handle form submission
  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      const formData: FormData = {
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        message: this.contactForm.value.message
      };

      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', formData);
        this.isSubmitting = false;
        this.showSuccess = true;
        this.contactForm.reset();
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          this.showSuccess = false;
        }, 3000);
      }, 1000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }
getCharacterCount(): number {
    return this.messageField.value.length;
  }
    isFormValid(): boolean {
    const fieldsValid = this.formFields.every(field => !field.required || field.value.trim() !== '');
    return fieldsValid && this.messageField.value.trim() !== '';
  }
  // Handle social link clicks
 

}

