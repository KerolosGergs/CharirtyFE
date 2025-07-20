import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { advisor, ICategory, ICreateAdvisorMinimal } from '../../../../../../Core/Interfaces/advisor';
import { Advisor } from '../../../../../../Core/Services/advisor';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-advisor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-advisor.html',
  styleUrl: './edit-advisor.scss'
})
export class EditAdvisor {
  consultantForm!: FormGroup;
  advisorId!: number;

  showPassword = false;
  showConfirmPassword = false;
  uploadedImageUrl: string | null = null;

  private fb = inject(FormBuilder);
  private _advisor = inject(Advisor);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  consultationTypes: ICategory[] = [];

  ngOnInit(): void {
    this.initializeForm();
    this.loadConsultationTypes();
    // Get ID from route
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.advisorId = +idParam;
        this.loadAdvisor(this.advisorId);
      }
    });
  }

  initializeForm(): void {
    this.consultantForm = this.fb.group({
      fullName: [null, [Validators.required, Validators.maxLength(50)]],
      specialty: [null, [Validators.required, Validators.maxLength(100)]],
      consultation: ['', [Validators.required]],
      phoneNumber: [null, [Validators.required, Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      description: [null, [Validators.required, Validators.maxLength(1000)]],
      zoomUrl: [null, []],
      password: [null, [Validators.minLength(6), Validators.maxLength(100)]],
      confirmPassword: [null,],
      profileImage: [null, []]
    });
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
  loadAdvisor(id: number): void {
    this._advisor.getAdvisorById(id).subscribe({
      next: (res) => {
        const advisor: advisor = res.data;
        this.patchForm(advisor);
      },
      error: (err) => {
        console.error('❌ Failed to load advisor:', err);
      }
    });
  }

  patchForm(advisor: advisor): void {
    
    this.consultantForm.patchValue({
      fullName: advisor.fullName || '',
      specialty: advisor.specialty || '',
      consultation: advisor.consultationId || '',
      phoneNumber: advisor.phoneNumber || '',
      email: advisor.email || '',
      description: advisor.description || '',
      zoomUrl: advisor.zoomRoomUrl || '',
      password: '',
      confirmPassword: ''

    });
  }

  onSubmit(): void {
    if (this.consultantForm.invalid || !this.advisorId) {
      console.warn('❌ Form invalid or missing advisor ID:', this.consultantForm.errors);
      this.consultantForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    // Append form fields
    formData.append('fullName', this.consultantForm.get('fullName')?.value);
    formData.append('email', this.consultantForm.get('email')?.value);
    formData.append('phoneNumber', this.consultantForm.get('phoneNumber')?.value);
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

    this._advisor.updateAdvisor(this.advisorId, formData).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('✅ Advisor updated:', res);
          this.router.navigate(['/dashboard/dashboard-advisors']);
        } else {
          console.error('❌ Update error:', res.message);
        }
      },
      error: (err) => {
        console.error('❌ API Error:', err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard/dashboard-advisors']);
  }
  onCancel(): void {
    this.consultantForm.reset();
    this.uploadedImageUrl = null;
  }

  private passwordsMatchValidator: ValidatorFn = (group: AbstractControl): { [key: string]: boolean } | null => {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password && confirm && password !== confirm ? { mismatch: true } : null;
  };

}
