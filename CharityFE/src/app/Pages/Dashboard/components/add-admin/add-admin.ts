import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Spinner } from "../../../../Shared/spinner/spinner";
import { TostarServ } from './../../../../Shared/tostar-serv';
import { AddAdminService } from './service/AddAdminService';
import { AdminList } from "./components/admin-list/admin-list";
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [Spinner, ReactiveFormsModule, FormsModule, AdminList,NgClass],
  templateUrl: './add-admin.html',
  styleUrl: './add-admin.scss'
})
export class AddAdmin implements OnInit {
 private readonly fb = inject(FormBuilder);
  private readonly tostar = inject(TostarServ);
  private readonly adminService = inject(AddAdminService);

  adminForm!: FormGroup;
  formSection = { title: 'بيانات المشرف الجديد' };
  submitButton = { text: 'إضافة مشرف' };

  // يطابق متطلبات ASP.NET Core Identity الافتراضية
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,}$/;

  showPassword = false;
  showConfirm = false;

  ngOnInit(): void {
    this.adminForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10,13}$/)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(this.passwordPattern)
          ]
        ],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // فلديتور تطابق كلمة المرور
  passwordMatchValidator = (form: FormGroup) => {
    const pass = form.get('password')?.value ?? '';
    const confirm = form.get('confirmPassword')?.value ?? '';
    return pass && confirm && pass !== confirm ? { mismatch: true } : null;
  };

  // مساعدات عرض الأخطاء
  hasError(fieldName: string): boolean {
    const c = this.adminForm.get(fieldName);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }

  getErrorMessage(fieldName: string): string {
    const c = this.adminForm.get(fieldName);
    if (!c) return '';

    if (c.hasError('required')) {
      return 'هذا الحقل مطلوب';
    }

    if (fieldName === 'email' && c.hasError('email')) {
      return 'يرجى إدخال بريد إلكتروني صحيح';
    }

    if (c.hasError('minlength')) {
      const len = c.getError('minlength')?.requiredLength ?? 6;
      return `الحد الأدنى ${len} أحرف`;
    }

    // pattern لكل حقل على حدة
    if (c.hasError('pattern')) {
      if (fieldName === 'phoneNumber') {
        return 'رقم الهاتف يجب أن يتكون من 10 إلى 13 رقمًا (بدون رمز الدولة)';
      }
      if (fieldName === 'password') {
        return 'يجب أن تحتوي كلمة المرور على حرف كبير وصغير ورقم ورمز';
      }
    }

    if (fieldName === 'confirmPassword' && this.adminForm.hasError('mismatch')) {
      return 'كلمتا المرور غير متطابقتين';
    }

    return '';
  }

  onSubmit(): void {
    if (this.adminForm.invalid) {
      Object.keys(this.adminForm.controls).forEach(key => {
        this.adminForm.get(key)?.markAsTouched();
      });
      return;
    }

    // تجهيز البيانات (اختياري: قص المسافات)
    const formValue = { ...this.adminForm.value };
    formValue.fullName = (formValue.fullName ?? '').trim();
    formValue.email = (formValue.email ?? '').trim();

    this.adminService.AddAdmin(formValue).subscribe({
      next: (response) => {
        if (response?.success) {
          this.tostar.showSuccess('تمت إضافة المشرف بنجاح');
          this.adminForm.reset();
          this.showPassword = false;
          this.showConfirm = false;
        } else {
          this.tostar.showError(response?.message ?? 'حدث خطأ غير متوقع');
        }
      },
      error: (err) => {
        this.tostar.showError(err?.error?.message ?? 'تعذر الإضافة، حاول لاحقاً');
        Object.keys(this.adminForm.controls).forEach(key => {
          this.adminForm.get(key)?.markAsTouched();
        });
      }
    });
  }

  // أرقام فقط لرقم الهاتف
  allowOnlyDigits(event: any): void {
    const digits = String(event?.target?.value ?? '').replace(/\D/g, '');
    event.target.value = digits;
    // تجنب إطلاق قيمة مرتين بلا داع
    this.adminForm.get('phoneNumber')?.setValue(digits, { emitEvent: true });
  }

  // خصائص مساعدة لقائمة التحقق
  get pw(): string { return this.adminForm.get('password')?.value ?? ''; }
  get hasLower(): boolean { return /[a-z]/.test(this.pw); }
  get hasUpper(): boolean { return /[A-Z]/.test(this.pw); }
  get hasDigit(): boolean { return /\d/.test(this.pw); }
  get hasSymbol(): boolean { return /\W/.test(this.pw); }
  get hasMinLen(): boolean { return this.pw.length >= 6; }
}