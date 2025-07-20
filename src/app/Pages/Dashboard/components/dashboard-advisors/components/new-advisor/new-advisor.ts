import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Advisor } from '../../../../../../Core/Services/advisor';
import { ICategory, ICreateAdvisorMinimal } from '../../../../../../Core/Interfaces/advisor';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { icon } from '@fortawesome/fontawesome-svg-core';
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
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  uploadedImageUrl: string | null = null;

  private _advisor = inject(Advisor);
  private _router = inject(Router);
  private toastr = inject(TostarServ);
  consultationTypes: ICategory[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.consultantForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(50)]],
      specialty: ['', [Validators.required, Validators.maxLength(100)]],
      consultation: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(20)]],
      countryCode: ['+20', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      zoomUrl: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      confirmPassword: ['', Validators.required],
      profileImage: ['', []]
    }, {
      validators: this.passwordMatchValidator
    });
    this.loadConsultationTypes();
  }
  loadConsultationTypes(): void {
    this._advisor.getCategories().subscribe({
      next: (data) => (this.consultationTypes = data.data),
      error: () =>console.log('error')
    });

  };

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
    formData.append('fullName', this.consultantForm.get('fullName')?.value);
    formData.append('email', this.consultantForm.get('email')?.value);
    formData.append('phoneNumber', (this.consultantForm.get('countryCode')?.value + this.consultantForm.get('phoneNumber')?.value));
    formData.append('specialty', this.consultantForm.get('specialty')?.value);
    formData.append('description', this.consultantForm.get('description')?.value);
    formData.append('ZoomRoomUrl', this.consultantForm.get('zoomUrl')?.value);
    formData.append('password', this.consultantForm.get('password')?.value);
    formData.append('ConsultationId', this.consultantForm.get('consultation')?.value);

    // Append the image file
    const imageFile = this.consultantForm.get('profileImage')?.value;
    if (imageFile) {
      formData.append('Image', imageFile); // name must match the API parameter
    }

    this._advisor.createNewAdvisor(formData).subscribe({
      next: (res) => {
        if (res.success) {
          // console.log('✅ Advisor created successfully:', res);
          setTimeout(() => {
            
            this.toastr.showSuccess('تم انشاء المستشار بنجاح');
          }, 1000);
          this.consultantForm.reset();
          this._router.navigate(['/dashboard']);
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
