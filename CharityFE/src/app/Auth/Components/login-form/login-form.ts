import { AuthServ } from './../../Services/auth-serv';
import { routes } from './../../../app.routes';
import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../Services/LoginService/login';
import { IResponse } from '../../../Core/Interfaces/iregister';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login-form',
  imports:[NgClass ,ReactiveFormsModule ,RouterLink,] ,
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss'
})
export class LoginForm {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required ,Validators.minLength(8),Validators.maxLength(32)]),
});

  LoginService  = inject(Login);
    toastr = inject(ToastrService);
    AuthService = inject(AuthServ)

  showPassword: boolean = false;
  rememberMe: boolean = false;
  isLoading: boolean = false;

  socialMediaLinks = [
    { icon: 'bi-facebook', url: '#', name: 'Facebook' },
    { icon: 'bi-twitter-x', url: '#', name: 'Twitter' },
    { icon: 'bi-linkedin', url: '#', name: 'LinkedIn' },
    { icon: 'bi-instagram', url: '#', name: 'Instagram' },
    { icon: 'bi-whatsapp', url: '#', name: 'WhatsApp' }
  ];

 
  constructor(private router:Router ) {

  }


 ngOnInit(): void {

  if (typeof window !== 'undefined' ) {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    if(token){
      this.router.navigate(['/home']);
    }else if(token&& userRole=='admin'){
      
      this.router.navigate(['/home']);
    }
  }
}

  


 onSubmit(): void {
  
  if (this.loginForm.valid) {
    this.isLoading = true;

    this.LoginService.Login(this.loginForm.value).subscribe({
      next: (res:IResponse) => {
        if (res && res.success && res.data) {
          const token = res.data.token;
          const user = res.data.user;
          this.AuthService.setSession(token, user, res.data.role);
          

          this.router.navigate(['/home']);

          this.toastr.success('تم تسجيل الدخول بنجاح');
          // console.log('Login successful:', user);
        } else {
          this.toastr.error('البريد الالكتروني او كلمة المرور غير صحيح');
          // alert('فشل تسجيل الدخول، يرجى المحاولة مرة أخرى');
        }

        this.isLoading = false;
      },

      error: (error) => {
        debugger
        this.toastr.error(' حدث خطاء اثناء تسجيل الدخول تحقق من اتصالك بالانترنت');
        this.isLoading = false;
      }
    });

  } else {
    // this.toastr.error('يرجى ملء جميع الحقول');
    this.markFormGroupTouched();
  }
}


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleRememberMe(): void {
    this.rememberMe = !this.rememberMe;
  }

  onForgotPassword(): void {
    console.log('Forgot password clicked');
  }

  onCreateAccount(): void {
    console.log('Create account clicked');
  }

  onSocialLogin(platform: string): void {
    console.log(`${platform} login clicked`);
    // Handle social media login
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

}

