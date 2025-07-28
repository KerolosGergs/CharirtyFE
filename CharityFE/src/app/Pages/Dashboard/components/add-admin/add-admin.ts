import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Spinner } from "../../../../Shared/spinner/spinner";
import { TostarServ } from './../../../../Shared/tostar-serv';
import { NgClass } from '@angular/common';
import { AddAdminService } from './service/AddAdminService';

interface FormField {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  iconClass: string;
}

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [Spinner, ReactiveFormsModule, FormsModule, NgClass],
  templateUrl: './add-admin.html',
  styleUrl: './add-admin.scss'
})
export class AddAdmin implements OnInit {
  adminService = inject(AddAdminService);
  adminForm!: FormGroup;
  formSection = { title: 'بيانات المشرف الجديد' };
  submitButton = { text: 'إضافة مشرف' };

  formFields: FormField[] = [
    {
      id: 'fullName',
      label: 'الاسم الكامل',
      placeholder: 'محمد أحمد محمود',
      type: 'text',
      iconClass: 'bi-person-fill'
    },
    {
      id: 'email',
      label: 'البريد الإلكتروني',
      placeholder: 'user@example.com',
      type: 'email',
      iconClass: 'bi-envelope-fill'
    },
    {
      id: 'phoneNumber',
      label: 'رقم الهاتف',
      placeholder: '01001234567',
      type: 'tel',
      iconClass: 'bi-telephone-fill'
    },
    {
      id: 'password',
      label: 'كلمة المرور',
      placeholder: '********',
      type: 'password',
      iconClass: 'bi-lock-fill'
    },
    {
      id: 'confirmPassword',
      label: 'تأكيد كلمة المرور',
      placeholder: '********',
      type: 'password',
      iconClass: 'bi-shield-lock-fill'
    }
  ];

  fb = inject(FormBuilder);
  tostar = inject(TostarServ);

  ngOnInit(): void {
    this.adminForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  hasError(fieldName: string): boolean {
    const field = this.adminForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.adminForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'هذا الحقل مطلوب';
      if (field.errors['email']) return 'يرجى إدخال بريد إلكتروني صحيح';
      if (field.errors['minlength']) return `الحد الأدنى ${field.errors['minlength'].requiredLength} أحرف`;
      if (field.errors['pattern']) return 'يرجى إدخال رقم هاتف صحيح';
      if (fieldName === 'confirmPassword' && this.adminForm.errors?.['mismatch']) return 'كلمتا المرور غير متطابقتين';
    }
    return '';
  }

 onSubmit(): void {
  if (this.adminForm.valid) {
    const formData = this.adminForm.value;

    this.adminService.AddAdmin(formData).subscribe({
      next: (response) => {
        this.tostar.showSuccess('تمت إضافة المشرف بنجاح');
        this.adminForm.reset();
      },
      error: (err) => {
        this.tostar.showError('خطاء في اضافة المشرف، هذا البريد الإلكتروني موجود مسبقًا');
        Object.keys(this.adminForm.controls).forEach(key => {
          this.adminForm.get(key)?.markAsTouched();
        });
      }
    });
  } else {
    Object.keys(this.adminForm.controls).forEach(key => {
      this.adminForm.get(key)?.markAsTouched();
    });
  }
}

}
