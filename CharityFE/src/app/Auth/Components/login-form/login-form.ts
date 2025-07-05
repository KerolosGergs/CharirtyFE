import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [ FormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss'
})
export class LoginForm {

  constructor() { }

  onSubmit() {
    // Handle form submission logic here
    console.log('Form submitted');
    
    // You can add your authentication logic here
    // For example:
    // const email = (document.getElementById('email') as HTMLInputElement).value;
    // const password = (document.getElementById('password') as HTMLInputElement).value;
    // this.authService.login(email, password);
  }

  togglePassword() {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const passwordEye = document.getElementById('password-eye');

    if (passwordInput && passwordEye) {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordEye.classList.remove('bi-eye');
        passwordEye.classList.add('bi-eye-slash');
      } else {
        passwordInput.type = 'password';
        passwordEye.classList.remove('bi-eye-slash');
        passwordEye.classList.add('bi-eye');
      }
    }
  }
}
