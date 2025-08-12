import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { HomePageService } from './../../../../../../Core/Services/HomePage/home-page-service';
import { putTrendSection } from '../../../../../../Core/Interfaces/HomePage/ihome-page';

@Component({
  selector: 'app-dashboard-trend-section',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './dashboard-trend-section.html',
  styleUrl: './dashboard-trend-section.scss'
})
export class DashboardTrendSection {
 trendForm: FormGroup;
  loading = signal(true);
  updating = signal(false);
  successMessage = signal('');
  errorMessage = signal('');
  imageFile = signal<File | null>(null);
  imagePreviewUrl = signal<string | null>(null);

  constructor(private homePageService: HomePageService, private fb: FormBuilder) {
    this.trendForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', [Validators.pattern(/https?:\/\/.*\.(?:png|jpg|jpeg|gif)/i)]],
      buttonText: ['', Validators.required],
      buttonUrl: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadTrendData();
  }

  loadTrendData() {
    this.loading.set(true);
    this.homePageService.getTrendSection().subscribe({
      next: (response) => {
        if (response.success) {
          const data = response.data;
          this.trendForm.patchValue({
            title: data.title,
            description: data.description,
            imageUrl: data.imageUrl,
            buttonText: data.buttonText,
            buttonUrl: data.buttonUrl
          });
          this.imagePreviewUrl.set(data.imageUrl || null);
        }
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('حدث خطأ أثناء تحميل البيانات');
        this.loading.set(false);
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.imageFile.set(file);
      this.imagePreviewUrl.set(URL.createObjectURL(file));
      this.trendForm.get('imageUrl')?.setValue(''); // Clear URL if file is selected
    }
  }

  updateTrendSection() {
    if (this.trendForm.invalid && !this.imageFile()) return;

    this.updating.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    const formData = new FormData();
    formData.append('Title', this.trendForm.get('title')?.value);
    formData.append('Description', this.trendForm.get('description')?.value);
    if (this.imageFile()) {
      formData.append('ImageUrl', this.imageFile()!);
    } else {
      formData.append('ImageUrl', this.trendForm.get('imageUrl')?.value);
    }
    formData.append('buttonText', this.trendForm.get('buttonText')?.value);
    formData.append('buttonUrl', this.trendForm.get('buttonUrl')?.value);

    this.homePageService.putTrendSection(formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage.set('تم حفظ التغييرات بنجاح');
          setTimeout(() => this.successMessage.set(''), 3000);
          if (response.data.imageUrl) {
            this.imagePreviewUrl.set(response.data.imageUrl);
            this.trendForm.get('imageUrl')?.setValue(response.data.imageUrl);
            this.imageFile.set(null);
          }
        } else {
          this.errorMessage.set(response.message || 'حدث خطأ أثناء الحفظ');
        }
        this.updating.set(false);
      },
      error: () => {
        this.errorMessage.set('حدث خطأ أثناء الحفظ');
        this.updating.set(false);
      }
    });
  }

  getImageUrl(): string {
    return `url(${this.imagePreviewUrl() || this.trendForm.get('imageUrl')?.value || 'https://via.placeholder.com/300x200'})`;
  }
}