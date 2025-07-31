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
  imports: [Spinner, ReactiveFormsModule, FormsModule],
  templateUrl: './add-admin.html',
  styleUrl: './add-admin.scss'
})
export class AddAdmin implements OnInit {
  adminService = inject(AddAdminService);
  adminForm!: FormGroup;
  formSection = { title: 'بيانات المشرف الجديد' };
  submitButton = { text: 'إضافة مشرف' };

 
  fb = inject(FormBuilder);
  tostar = inject(TostarServ);

  ngOnInit(): void {
    this.adminForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required,  Validators.pattern('^\\d{10,13}$')]],
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
      if (field.errors['pattern']) return 'رقم الهاتف مطلوب ويجب أن يتكون من 10 إلى 13 رقمًا بدون رمز الدولة';
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
allowOnlyDigits(event: any): void {
  event.target.value = event.target.value.replace(/\D/g, '');
  this.adminForm.get('phoneNumber')?.setValue(event.target.value);
}

}
