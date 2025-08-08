import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Service } from '../../../../../../Core/Services/ServiceOffering/service';
import { ICreateServiceOfferingItemDTO } from '../../../../../../Core/Interfaces/ServiceOffering/iservice';

@Component({
  selector: 'app-add-new-service',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-new-service.html',
  styleUrl: './add-new-service.scss'
})
export class AddNewService {
  serviceForm: FormGroup;
  loading = false;
  previewUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private service: Service,
    private router: Router
  ) {
    this.serviceForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      url: ['', [Validators.required, Validators.maxLength(300)]],
      isActive: [true],
      Image: ['', Validators.required]
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.previewUrl = reader.result as string;
        this.serviceForm.patchValue({ Image: file });
      };

      reader.readAsDataURL(file);
    }
  }

  submit(): void {
    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('Name', this.serviceForm.get('name')?.value);
    formData.append('Description', this.serviceForm.get('description')?.value);
    formData.append('Url', this.serviceForm.get('url')?.value);
    formData.append('IsActive', this.serviceForm.get('isActive')?.value);

    const imageFile = this.serviceForm.get('Image')?.value;
    if (imageFile) {
      formData.append('Image', imageFile);
    }

    this.loading = true;

    this.service.createItem(formData).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard/dashboard-services']);
      },
      error: () => {
        this.loading = false;
        alert('حدث خطأ أثناء إضافة الخدمة');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/dashboard-services']);
  }
}
