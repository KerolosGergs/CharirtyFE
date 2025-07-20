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
      imageUrl: ['', [Validators.maxLength(500)]],
      isActive: [true],
      contactInfo: ['', [Validators.maxLength(200)]],
      requirements: ['', [Validators.maxLength(500)]]
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
        this.serviceForm.patchValue({ imageUrl: this.previewUrl });
      };
      reader.readAsDataURL(file);
    }
  }

  submit(): void {
    // if (this.serviceForm.invalid) return console.log(this.serviceForm.value);
    // ;

    const dto: ICreateServiceOfferingDTO = this.serviceForm.value;
    this.loading = true;

    this.service.create(dto).subscribe({
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
