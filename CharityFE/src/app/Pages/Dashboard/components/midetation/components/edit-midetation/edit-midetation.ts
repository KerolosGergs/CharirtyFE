import { getMidetationById, IMeditation } from './../../../../../../Core/Interfaces/imeditaion';
import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { advisor, ICategory, ICreateAdvisorMinimal } from '../../../../../../Core/Interfaces/advisor';
import { Advisor } from '../../../../../../Core/Services/advisor';
import { ActivatedRoute, Router } from '@angular/router';
import { MidetationServ } from '../../../../../../Core/Services/MidetationService/midetation-serv';

@Component({
  selector: 'app-edit-midetation',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-midetation.html',
  styleUrl: './edit-midetation.scss'
})
export class EditMidetation {
  consultantForm!: FormGroup;
  MeditationId!: number;

  uploadedImageUrl: string | null = null;

  private fb = inject(FormBuilder);
  private _mediation = inject(MidetationServ);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.initializeForm();
    // Get ID from route
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.MeditationId = +idParam;
        this.loadMeditation(this.MeditationId);
      }
    });
  }

  initializeForm(): void {
    this.consultantForm = this.fb.group({
      fullName: [null, [Validators.required, Validators.maxLength(50)]],
      phoneNumber: [null, [Validators.required, Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      isAvailable: [false],
      isActive: [true],
      profileImage: [null, []]
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

 
  loadMeditation(id: number): void {
    this._mediation.getMidetationById(id).subscribe({
      next: (res) => {
        const meditation: IMeditation = res.data;
        this.patchForm(meditation);
      },
      error: (err) => {
        console.error('❌ Failed to load advisor:', err);
      }
    });
  }

  patchForm(Meditation: IMeditation): void {

    this.consultantForm.patchValue({
      fullName: Meditation.fullName || '',
      phoneNumber: Meditation.phoneNumber || '',
      email: Meditation.email || '',
      password: '',
      confirmPassword: ''
    });
  }

  onSubmit(): void {
    if (this.consultantForm.invalid || !this.MeditationId) {
      console.warn('❌ Form invalid or missing advisor ID:', this.consultantForm.errors);
      this.consultantForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    // Append form fields
    formData.append('fullName', this.consultantForm.get('fullName')?.value);
    formData.append('email', this.consultantForm.get('email')?.value);
    formData.append('phoneNumber', this.consultantForm.get('phoneNumber')?.value);
    formData.append('isActive', this.consultantForm.get('isActive')?.value);
    formData.append('isAvailable', this.consultantForm.get('isAvailable')?.value);

    // Append the image file
    const imageFile = this.consultantForm.get('profileImage')?.value;
    if (imageFile) {
      formData.append('Image', imageFile); // name must match the API parameter
    }

    this._mediation.updateMeditation(this.MeditationId, formData).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('✅ Advisor updated:', res);
          this.router.navigate(['/dashboard/dashboard-meditation']);
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


allowOnlyDigits(event: any): void {
  event.target.value = event.target.value.replace(/\D/g, '');
  this.consultantForm.get('phoneNumber')?.setValue(event.target.value);
}

}
