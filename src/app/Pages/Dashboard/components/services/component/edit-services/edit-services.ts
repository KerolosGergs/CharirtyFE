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
      imageUrl: ['']
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
              imageUrl: data.imageUrl
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
        this.serviceForm.patchValue({ imageUrl: this.previewUrl });
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

    const dto: IUpdateServiceOfferingDTO = this.serviceForm.value;
    this.loading = true;

    this.serviceApi.update(this.serviceId, dto).subscribe({
      next: (res) => {
        this.loading = false;
        this.toastr.success('تم تعديل الخدمة بنجاح');
        this.router.navigate(['/dashboard/services']);
      },
      error: () => {
        this.loading = false;
        this.toastr.error('حدث خطأ أثناء تعديل الخدمة');
      }
    });
  }
}
