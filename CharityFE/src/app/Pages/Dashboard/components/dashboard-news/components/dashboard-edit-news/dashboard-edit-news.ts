import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewsArticle, AddArticle } from '../../../../../../Core/Interfaces/news';
import { newsservice } from '../../../../../../Core/Services/news';

@Component({
  selector: 'app-dashboard-edit-news',
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard-edit-news.html',
  styleUrl: './dashboard-edit-news.scss'
})
export class DashboardEditNews implements OnInit {
  articleForm: FormGroup;
  uploadedImageUrl: string | null = null;
  existingImages: string[] = [];
  newImages: File[] = [];
  imagePreviews: string[] = []; // Store temporary URLs for previewing new images
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private _news = inject(newsservice);

  private articleId: number = 0;

  constructor() {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      content: ['', [Validators.required, Validators.maxLength(5000)]],
      summary: ['', [Validators.required, Validators.maxLength(500)]],
      Image: [null],
      isPublished: [true],
      tags: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.articleId = +params['id'];
      if (this.articleId) {
        this._news.getNewsById(this.articleId).subscribe({
          next: (res) => {
            const article = res.data as NewsArticle;
            this.articleForm.patchValue({
              title: article.title,
              content: article.content,
              summary: article.summary,
              isPublished: article.isPublished,
              tags: article.tags
            });
            this.uploadedImageUrl = article.imageUrl;
            this.existingImages = article.imageUrls; // must be array of strings (URLs)
          }
        });
      }
    });
  }

  onImageChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (!file.type.startsWith('image/')) {
        this.toastr.error('الملف يجب أن يكون صورة');
        return;
      }
      this.articleForm.patchValue({ Image: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onExtraImagesChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      // Validate that all files are images
      const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
      if (invalidFiles.length > 0) {
        this.toastr.error('يجب أن تكون جميع الملفات صور');
        return;
      }
      // Add new files to newImages for upload
      this.newImages = [...this.newImages, ...files];
      // Generate preview URLs for new images
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews = [...this.imagePreviews, reader.result as string];
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removePreview(preview: string): void {
    const index = this.imagePreviews.indexOf(preview);
    if (index > -1) {
      this.imagePreviews = this.imagePreviews.filter((_, i) => i !== index);
      this.newImages = this.newImages.filter((_, i) => i !== index);
    }
  }

  deleteImage(imageUrl: string): void {
    this._news.DeleteImage(this.articleId, imageUrl).subscribe({
      next: (res) => {
        if (res.success) {
          this.existingImages = this.existingImages.filter(img => img !== imageUrl);
          this.toastr.success('تم حذف الصورة بنجاح');
        } else {
          this.toastr.error('حدث خطأ في حذف الصورة');
        }
      },
      error: () => {
        this.toastr.error('حدث خطأ، تأكد من اتصالك بالإنترنت');
      }
    });
  }

  createFormData(formValues: any): FormData {
    const formData = new FormData();
    formData.append('title', formValues.title);
    formData.append('content', formValues.content);
    formData.append('summary', formValues.summary);
    formData.append('isPublished', formValues.isPublished.toString());
    formData.append('tags', formValues.tags);

    if (formValues.Image instanceof File) {
      formData.append('Image', formValues.Image);
    }

    this.newImages.forEach((file, i) => {
      formData.append('Images', file);
    });

    formData.append('remainingImages', JSON.stringify(this.existingImages));

    return formData;
  }

  onSubmit(): void {
    if (this.articleForm.invalid) {
      this.articleForm.markAllAsTouched();
      this.toastr.error('يرجى تعبئة جميع الحقول بشكل صحيح');
      return;
    }

    const formData = this.createFormData(this.articleForm.value);

    this._news.updateNews(this.articleId, formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastr.success('تم تحديث المقال بنجاح');
          this.router.navigate(['/dashboard/dashboard-news']);
        } else {
          this.toastr.error('حدث خطأ أثناء تحديث المقال');
        }
      },
      error: () => {
        this.toastr.error('حدث خطأ، تأكد من اتصالك بالإنترنت');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/dashboard-news']);
  }
}