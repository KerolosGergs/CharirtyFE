import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Service } from '../../../../../../Core/Services/service';
import { IUpdateServiceOfferingDTO } from '../../../../../../Core/Interfaces/iservice';

@Component({
  selector: 'app-edit-services',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-services.html',
  styleUrl: './edit-services.scss'
})
export class EditServices {
  serviceForm: FormGroup;
  previewUrl: string | null = null;
  loading = false;
  serviceId = 0;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private serviceApi = inject(Service);

  constructor() {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      contactInfo: [''],
      requirements: [''],
      isActive: [true],
      Image: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.serviceId = +params['id'];
      if (this.serviceId) {
        this.serviceApi.getById(this.serviceId).subscribe({
          next: (res) => {
            const data = res.data;
            this.serviceForm.patchValue({
              name: data.name,
              description: data.description,
              category: data.category,
              contactInfo: data.contactInfo,
              requirements: data.requirements,
              isActive: data.isActive,
            });
            this.previewUrl = data.imageUrl;
          },
          error: () => {
            this.toastr.error('فشل تحميل بيانات الخدمة');
            this.router.navigate(['/dashboard/services']);
          }
        });
      }
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
    debugger

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

    if (this.serviceForm.invalid) {
      this.toastr.error('يرجى تعبئة الحقول المطلوبة');
      this.serviceForm.markAllAsTouched();
      return;
    }

    // const dto: IUpdateServiceOfferingDTO = this.serviceForm.value;
    this.loading = true;

    this.serviceApi.update(this.serviceId, formData).subscribe({
      next: (res) => {
        this.loading = false;
        this.toastr.success('تم تعديل الخدمة بنجاح');
        this.router.navigate(['/dashboard/dashboard-services']);
      },
      error: () => {
        this.loading = false;
        this.toastr.error('حدث خطأ أثناء تعديل الخدمة');
      }
    });
  }
}
