import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss'
})
export class RegisterForm{
  
passwordStrength: any;
strengthClass: any;
strengthText: any;
showConfirmPassword: any;

  registerForm: FormGroup;
  showPassword = false;
  showConfirm = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      idNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirm() {
    this.showConfirm = !this.showConfirm;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // Send to API or service
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}