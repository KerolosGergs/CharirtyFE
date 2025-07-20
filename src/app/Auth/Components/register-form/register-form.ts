import { NgClass } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { register } from 'node:module';
import { Register } from '../../Services/RegisterService/register';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule,NgClass ,RouterLink],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss'
})
export class RegisterForm{
passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMatchValidator: true };
};


registerForm: FormGroup = new FormGroup({
  fullName: new FormControl('', [Validators.required, Validators.minLength(2)]),
  email: new FormControl('', [Validators.required, Validators.email]),
  phoneNumber: new FormControl('', [Validators.required]),
  userName: new FormControl('', [Validators.required, Validators.minLength(14)]),
  address: new FormControl('', [Validators.required, Validators.minLength(5)]),
  password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]),
  confirmPassword: new FormControl('', [Validators.required]),
}, this.passwordMatchValidator);

  _registerService = inject(Register)
    toastr = inject(ToastrService);

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isLoading: boolean = false;

  socialMediaLinks = [
    { icon: 'bi-facebook', url: '#', name: 'Facebook' },
    { icon: 'bi-twitter-x', url: '#', name: 'Twitter' },
    { icon: 'bi-linkedin', url: '#', name: 'LinkedIn' },
    { icon: 'bi-instagram', url: '#', name: 'Instagram' },
    { icon: 'bi-whatsapp', url: '#', name: 'WhatsApp' }
  ];

    constructor(private router:Router) {

  }
  ngOnInit(): void {
    // Initialize component
  }


onSubmit(): void {
  if (this.registerForm.valid) {
    this.isLoading = true;

    this._registerService.Register(this.registerForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;

        if (res && res.success) {
          this.toastr.success('تم إنشاء الحساب بنجاح');
          this.router.navigate(['/login']);
        } else {
          this.toastr.error(res?.message ?? 'فشل في إنشاء الحساب، حاول مرة أخرى');
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Registration error:', error);
        this.toastr.error('حدث خطاء اثناء تسجيل الدخول تحقق من اتصالك بالانترنت');
      }
    });

  } else {
    this.markFormGroupTouched();
    this.toastr.error('البريد الالكتروني او كلمة المرور غير صحيح');
  }
}


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }



  onSocialLogin(platform: string): void {
    // Handle social media login
    console.log(`${platform} login clicked`);
    // Handle social media login
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  // Getter methods for form validation
 

}

