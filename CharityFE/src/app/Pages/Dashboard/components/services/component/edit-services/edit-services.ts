import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Service } from '../../../../../../Core/Services/ServiceOffering/service';
import { IServiceOfferingDTO, ServiceItem } from '../../../../../../Core/Interfaces/ServiceOffering/iservice';

@Component({
  selector: 'app-edit-services',
  standalone: true,
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
      url: ['', Validators.required],
      isActive: [true],
      Image: ['']
    });
  }

 ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.serviceId = +params['id'];
    if (this.serviceId) {
      this.serviceApi.getAll().subscribe({
        next: (res) => {
          const allItems = res.data.serviceItem;
          const matchedItem = allItems.find((item: ServiceItem) => item.id === this.serviceId);

          if (matchedItem) {
            this.serviceForm.patchValue({
              name: matchedItem.name,
              description: matchedItem.description,
              url: matchedItem.url,
              isActive: matchedItem.isActive
            });
            this.previewUrl = matchedItem.imageUrl;
          } else {
            this.toastr.error('الخدمة غير موجودة');
            this.router.navigate(['/dashboard/dashboard-services']);
          }
        },
        error: () => {
          this.toastr.error('فشل تحميل بيانات الخدمة');
          this.router.navigate(['/dashboard/dashboard-services']);
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
        this.serviceForm.patchValue({ Image: file });
      };

      reader.readAsDataURL(file);
    }
  }

  submit(): void {
    if (this.serviceForm.invalid) {
      this.toastr.error('يرجى تعبئة الحقول المطلوبة');
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

    this.serviceApi.updateItem(this.serviceId, formData).subscribe({
      next: () => {
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

  cancel(): void {
    this.router.navigate(['/dashboard/dashboard-services']);
  }
}
