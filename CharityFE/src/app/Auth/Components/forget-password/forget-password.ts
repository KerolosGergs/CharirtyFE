import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../../Services/LoginService/login';

@Component({
  selector: 'app-forget-password',
  imports: [NgClass, ReactiveFormsModule, RouterLink],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.scss'
})
export class ForgetPassword {
  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  toastr = inject(ToastrService);
  router = inject(Router);
  
  loginService = inject(Login);
  isLoading: boolean = false;
  emailSent: boolean = false;

  socialMediaLinks = [
    { icon: 'bi-facebook', url: '#', name: 'Facebook' },
    { icon: 'bi-twitter-x', url: '#', name: 'Twitter' },
    { icon: 'bi-linkedin', url: '#', name: 'LinkedIn' },
    { icon: 'bi-instagram', url: '#', name: 'Instagram' },
    { icon: 'bi-whatsapp', url: '#', name: 'WhatsApp' }
  ];

  constructor() {}

  ngOnInit(): void {
    // Initialize component
  }

  onSubmit(): void {
    if (this.forgetPasswordForm.valid) {
      this.isLoading = true;

     

      // TODO: Replace with actual service call
      this.loginService.ForgetPassword(this.forgetPasswordForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res && res.success) {
            this.emailSent = true;
            this.toastr.success('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');
          } else {
            this.toastr.error(res?.message ?? 'فشل في إرسال الرابط، حاول مرة أخرى');
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Forget password error:', error);
          this.toastr.error('حدث خطأ أثناء إرسال الرابط، تحقق من اتصالك بالإنترنت');
        }
      });

    } else {
      this.markFormGroupTouched();
      this.toastr.error('يرجى إدخال بريد إلكتروني صحيح');
    }
  }

  onBackToLogin(): void {
    this.router.navigate(['/login']);
  }

  onSocialLogin(platform: string): void {
    console.log(`${platform} login clicked`);
    // Handle social media login
  }

  private markFormGroupTouched(): void {
    Object.keys(this.forgetPasswordForm.controls).forEach(key => {
      const control = this.forgetPasswordForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }
} 