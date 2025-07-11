import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Advisor } from '../../../../../../Core/Services/advisor';
import { ICreateAdvisorMinimal } from '../../../../../../Core/Interfaces/advisor';

@Component({
  selector: 'app-new-advisor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-advisor.html',
  styleUrl: './new-advisor.scss'
})
export class NewAdvisor {
  @Input() isOpenC!: boolean;

  consultantForm!: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  private _advisor = inject(Advisor);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.consultantForm = this.fb.group({
      fullName: [null, [Validators.required, Validators.maxLength(50)]],
      specialty: [null, [Validators.required, Validators.maxLength(100)]],
      phoneNumber: [null, [Validators.required, Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100),
          Validators.pattern(/^[A-Z](?=.*[a-z])(?=(?:.*\d){6,}).*$/)
        ]
      ],
      confirmPassword: [null, Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  togglePasswordVisibility(field: 'password' | 'confirm'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.consultantForm.invalid) {
      console.warn('Form invalid:', this.consultantForm.errors, this.consultantForm.value);
      this.consultantForm.markAllAsTouched(); // helpful to show validation errors
      return;
    }

    const formData = this.consultantForm.value;

    const payload: ICreateAdvisorMinimal = {
      fullName: formData.fullName,
      specialty: formData.specialty,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      password: formData.password
    };

    this._advisor.createNewAdvisor(payload).subscribe({
      next: (res) => {
        console.log('✅ Advisor created successfully:', res);
        this.consultantForm.reset();
        this.isOpenC = false;
      },
      error: (err) => {
        console.error('❌ Error creating advisor:', err);
      }
    });
  }

  onCancel(): void {
    this.isOpenC = false;
    this.consultantForm.reset();
  }
}
