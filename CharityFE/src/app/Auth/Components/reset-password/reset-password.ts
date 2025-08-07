import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../../Services/LoginService/login';
import { IResatPassword } from '../../../Core/Interfaces/ilogin';

@Component({
  selector: 'app-reset-password',
  imports: [NgClass, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss'
})
export class ResetPassword implements OnInit {
  passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMatchValidator: true };
  };

  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, this.passwordMatchValidator);


  toastr = inject(ToastrService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  loginService = inject(Login);

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isLoading: boolean = false;
  tokenValid: boolean = false;
  token: string = '';
  socialMediaLinks = [
    { icon: 'bi-facebook', url: '#', name: 'Facebook' },
    { icon: 'bi-twitter-x', url: '#', name: 'Twitter' },
    { icon: 'bi-linkedin', url: '#', name: 'LinkedIn' },
    { icon: 'bi-instagram', url: '#', name: 'Instagram' },
    { icon: 'bi-whatsapp', url: '#', name: 'WhatsApp' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Get token from URL parameters
    this.route.queryParams.subscribe(query => {
      this.token = query['token'];
      if (this.token) {
        this.validateToken();
      } else {
        this.toastr.error('رابط غير صحيح');
        this.router.navigate(['/forget-password']);
      }
    });

  }

  validateToken(): void {
    this.isLoading = true;

    // Simulate token validation - replace with actual service call
    setTimeout(() => {
      this.isLoading = false;
      this.tokenValid = true; // For demo purposes

      // TODO: Replace with actual service call
      // this.authService.validateResetToken(this.token).subscribe({
      //   next: (res) => {
      //     this.isLoading = false;
      //     if (res && res.success) {
      //       this.tokenValid = true;
      //     } else {
      //       this.toastr.error('رابط غير صحيح أو منتهي الصلاحية');
      //       this.router.navigate(['/forget-password']);
      //     }
      //   },
      //   error: (error) => {
      //     this.isLoading = false;
      //     this.toastr.error('حدث خطأ في التحقق من الرابط');
      //     this.router.navigate(['/forget-password']);
      //   }
      // });
    }, 1000);
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      this.isLoading = true;

      const resetData: IResatPassword = {
        email: this.resetPasswordForm.value.email,
        password: this.resetPasswordForm.value.password,
        confirmPassword: this.resetPasswordForm.value.confirmPassword
      };

      this.token = encodeURIComponent(this.token)

      // الاتصال بالخدمة الفعلية (يفترض أنك أنشأت AuthService تحتوي على resetPassword)
      this.loginService.ResetPassword(this.token, resetData).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.toastr.success('تم تغيير كلمة المرور بنجاح');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Reset password error:', error);
          this.toastr.error('حدث خطأ أثناء تغيير كلمة المرور، تحقق من صحة الرابط أو الاتصال بالإنترنت');
        }
      });

    } else {
      this.markFormGroupTouched();
      this.toastr.error('يرجى التأكد من صحة البيانات المدخلة');
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onBackToLogin(): void {
    this.router.navigate(['/login']);
  }

  onSocialLogin(platform: string): void {
    console.log(`${platform} login clicked`);
    // Handle social media login
  }

  private markFormGroupTouched(): void {
    Object.keys(this.resetPasswordForm.controls).forEach(key => {
      const control = this.resetPasswordForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }
} 