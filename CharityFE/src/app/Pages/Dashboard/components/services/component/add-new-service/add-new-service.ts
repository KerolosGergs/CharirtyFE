import { Component } from '@angular/core';
import { ICreateServiceOfferingDTO } from '../../../../../../Core/Interfaces/iservice';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Service } from '../../../../../../Core/Services/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-service',
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
      category: ['', [Validators.required, Validators.maxLength(50)]],
      Image: ['', [Validators.maxLength(500)]],
      isActive: [true],
      contactInfo: ['', [Validators.maxLength(200)]],
      requirements: ['', [Validators.maxLength(500)]]
    });
  }

 onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.previewUrl = reader.result as string;
        // ✅ set the file itself, not just the preview
        this.serviceForm.patchValue({ Image: file });
      };

      reader.readAsDataURL(file);
    }
  }

  submit(): void {
    // if (this.serviceForm.invalid) return console.log(this.serviceForm.value);
    // ;
     const formData = new FormData();
    formData.append('Name', this.serviceForm.get('name')?.value);
    formData.append('Description', this.serviceForm.get('description')?.value);
    formData.append('Category', this.serviceForm.get('category')?.value);
    formData.append('ContactInfo', this.serviceForm.get('contactInfo')?.value);
    formData.append('Requirements', this.serviceForm.get('requirements')?.value);
    formData.append('IsActive', this.serviceForm.get('isActive')?.value);
    // Append the image file
    const imageFile = this.serviceForm.get('Image')?.value;
    if (imageFile) {
      formData.append('Image', imageFile);
    }
    const dto: ICreateServiceOfferingDTO = this.serviceForm.value;
    this.loading = true;

    this.service.create(formData).subscribe({
      next: (res) => {
        this.loading = false;
        console.log(res);
        
        this.router.navigate(['/dashboard/dashboard-services']);
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
        
        alert('حدث خطأ أثناء إضافة الخدمة');
      }
    });
  }
}
