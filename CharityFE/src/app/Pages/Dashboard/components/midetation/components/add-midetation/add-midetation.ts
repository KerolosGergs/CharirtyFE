import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IMeditation, IMeditationResponse } from '../../../../../../Core/Interfaces/imeditaion';
import { MidetationServ } from '../../../../../../Core/Services/MidetationService/midetation-serv';
import { TostarServ } from '../../../../../../Shared/tostar-serv';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-midetation',
  imports: [CommonModule ,ReactiveFormsModule],
  templateUrl: './add-midetation.html',
  styleUrl: './add-midetation.scss'
})
export class AddMidetation implements OnInit {
 consultantForm!: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  uploadedImageUrl: string | null = null;

  private _mediation = inject(MidetationServ);
  private _router = inject(Router);
  private toastr = inject(TostarServ);

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.consultantForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(20)]],
      countryCode: ['+20', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      confirmPassword: ['', Validators.required],
      profileImage: ['', []]
    }, {
      validators: this.passwordMatchValidator
    });
   
  }
 
  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.consultantForm.patchValue({ profileImage: file });
      const reader = new FileReader();
      reader.onload = () => this.uploadedImageUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
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
      this.consultantForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    // Append form fields
    formData.append('FullName', this.consultantForm.get('fullName')?.value);
    formData.append('Email', this.consultantForm.get('email')?.value);
    formData.append('PhoneNumber', (this.consultantForm.get('countryCode')?.value + this.consultantForm.get('phoneNumber')?.value));
    formData.append('Password', this.consultantForm.get('password')?.value);

    // Append the image file
    const imageFile = this.consultantForm.get('profileImage')?.value;
    if (imageFile) {
      formData.append('Image', imageFile); // name must match the API parameter
    }

    this._mediation.createNewMidetation(formData).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('✅ Advisor created successfully:', res);
          setTimeout(() => {
            
            this.toastr.showSuccess('تم انشاء المستشار بنجاح');
          }, 1000);
          this.consultantForm.reset();
          this._router.navigate(['/dashboard/dashboard-meditation']);
        } else {
          this.consultantForm.markAllAsTouched();
            this.toastr.showError(res.message);
         
          console.error('❌ Error creating advisor:', res);
        }
      },
      error: (err) => {
         this.toastr.showError('الأيميل او رقم الجوال موجود بالفعل');
        // this.toastr.error('خطاء في الأتصال بالأنترنت');
      }
    });
  
  }
  onCancel(): void {
    this.consultantForm.reset();
    this._router.navigate(['/dashboard']);
  }
}
