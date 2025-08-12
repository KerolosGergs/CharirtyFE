import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Advisor } from '../../../../../../Core/Services/advisor';
import { ICategory } from '../../../../../../Core/Interfaces/advisor';
import { Router } from '@angular/router';
import { TostarServ } from '../../../../../../Shared/tostar-serv';

@Component({
  selector: 'app-new-advisor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-advisor.html',
  styleUrl: './new-advisor.scss'
})
export class NewAdvisor {
  consultantForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  uploadedImageUrl: string | null = null;

  private _advisor = inject(Advisor);
  private _router = inject(Router);
  private toastr = inject(TostarServ);
  consultationTypes: ICategory[] = [];

  // يطابق متطلبات ASP.NET Core Identity الافتراضية
  private passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,}$/;
  // URL عام (يسمح http/https) — لو عايز تقيده على zoom فقط بدّله بـ /^https?:\/\/(www\.)?zoom\.us\/.+$/i
  private urlPattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.consultantForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(50)]],
      specialty: ['', [Validators.required, Validators.maxLength(100)]],
      consultation: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10,13}$/)]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      zoomUrl: ['', [Validators.required, Validators.pattern(this.urlPattern)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.pattern(this.passwordPattern)]],
      confirmPassword: ['', [Validators.required]],
      profileImage: [null, [Validators.required, this.imageValidator]]
    }, { validators: this.passwordMatchValidator });

    this.loadConsultationTypes();
  }

  // تحميل أنواع الاستشارات
  loadConsultationTypes(): void {
    this._advisor.getCategories().subscribe({
      next: (data) => (this.consultationTypes = data.data),
      error: () => console.log('error')
    });
  }

  // فحص مطابقة كلمة المرور
  passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const pw = group.get('password')?.value ?? '';
    const cpw = group.get('confirmPassword')?.value ?? '';
    return pw && cpw && pw !== cpw ? { mismatch: true } : null;
  }

  // فحص الصورة (اختياري: الحجم ≤ 2MB والامتدادات الشائعة)
  imageValidator(control: AbstractControl): ValidationErrors | null {
    const file = control.value as File | null;
    if (!file) return { required: true };
    const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!allowed.includes(file.type)) return { invalidType: true };
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) return { tooLarge: true };
    return null;
  }

  // مساعدات عرض الأخطاء
  hasError(name: string, error?: string): boolean {
    const c = this.consultantForm.get(name);
    if (!c) return false;
    if (error) return !!(c.hasError(error) && (c.dirty || c.touched));
    return !!(c.invalid && (c.dirty || c.touched));
  }

  getErrorMessage(name: string): string {
    const c = this.consultantForm.get(name);
    if (!c) return '';

    if (c.hasError('required')) {
      if (name === 'profileImage') return 'يرجى تحميل صورة المستشار';
      if (name === 'zoomUrl') return 'رابط Zoom مطلوب';
      return 'هذا الحقل مطلوب';
    }
    if (c.hasError('maxlength')) {
      const r = c.getError('maxlength')?.requiredLength;
      return `الحد الأقصى ${r} حرفًا`;
    }
    if (c.hasError('minlength')) {
      const r = c.getError('minlength')?.requiredLength;
      return `الحد الأدنى ${r} أحرف`;
    }
    if (name === 'email' && c.hasError('email')) return 'يرجى إدخال بريد إلكتروني صحيح';
    if (name === 'phoneNumber' && c.hasError('pattern')) return 'رقم الهاتف يجب أن يتكون من 10 إلى 13 رقمًا بدون رمز الدولة';
    if (name === 'zoomUrl' && c.hasError('pattern')) return 'يرجى إدخال رابط صحيح يبدأ بـ http أو https';
    if (name === 'password' && c.hasError('pattern')) return 'يجب أن تحتوي كلمة المرور على حرف كبير وصغير ورقم ورمز';
    if (name === 'profileImage' && c.hasError('invalidType')) return 'نوع الصورة غير مدعوم (PNG, JPG, JPEG, WEBP)';
    if (name === 'profileImage' && c.hasError('tooLarge')) return 'حجم الصورة يجب ألا يتجاوز 2MB';
    if (name === 'confirmPassword' && this.consultantForm.hasError('mismatch')) return 'رمز المرور وتأكيده غير متطابقين';

    return '';
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.consultantForm.get('profileImage')?.setValue(file);
      this.consultantForm.get('profileImage')?.markAsDirty();
      this.consultantForm.get('profileImage')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => this.uploadedImageUrl = reader.result as string;
      reader.readAsDataURL(file);
    } else {
      this.consultantForm.get('profileImage')?.setValue(null);
      this.uploadedImageUrl = null;
    }
  }

  togglePasswordVisibility(field: 'password' | 'confirm'): void {
    if (field === 'password') this.showPassword = !this.showPassword;
    else this.showConfirmPassword = !this.showConfirmPassword;
  }

  allowOnlyDigits(event: Event): void {
    const el = event.target as HTMLInputElement;
    el.value = (el.value || '').replace(/\D/g, '');
    this.consultantForm.get('phoneNumber')?.setValue(el.value, { emitEvent: true });
  }

  onSubmit(): void {
    if (this.consultantForm.invalid) {
      this.consultantForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('fullName', this.consultantForm.get('fullName')?.value);
    formData.append('email', this.consultantForm.get('email')?.value);
    formData.append('phoneNumber', this.consultantForm.get('phoneNumber')?.value);
    formData.append('specialty', this.consultantForm.get('specialty')?.value);
    formData.append('description', this.consultantForm.get('description')?.value);
    formData.append('ZoomRoomUrl', this.consultantForm.get('zoomUrl')?.value);
    formData.append('password', this.consultantForm.get('password')?.value);
    formData.append('ConsultationId', this.consultantForm.get('consultation')?.value);

    const imageFile = this.consultantForm.get('profileImage')?.value;
    if (imageFile) formData.append('Image', imageFile);

    this._advisor.createNewAdvisor(formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastr.showSuccess('تم انشاء المستشار بنجاح');
          this.consultantForm.reset();
          this.uploadedImageUrl = null;
          this._router.navigate(['/dashboard/dashboard-advisors']);
        } else {
          this.consultantForm.markAllAsTouched();
          this.toastr.showError(res.message);
        }
      },
      error: (err:Error) => {
        this.toastr.showError("هذا البريد موجود مسبقا");
      }
    });
  }

  onCancel(): void {
    this.consultantForm.reset();
    this.uploadedImageUrl = null;
    this._router.navigate(['/dashboard']);
  }
}
