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
      category: ['', Validators.required],
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
              category: article.category,
              isPublished: article.isPublished,
              tags: article.tags
            });
            this.uploadedImageUrl =  article.imageUrl;
          },
          error: () => {
            // this.toastr.error('فشل تحميل المقال');
            this.router.navigate(['/dashboard/dashboard-news']);
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

  createFormData(formValues: any): FormData {
    const formData = new FormData();
    formData.append('title', formValues.title);
    formData.append('content', formValues.content);
    formData.append('summary', formValues.summary);
    formData.append('category', formValues.category);
    formData.append('isPublished', formValues.isPublished.toString());
    formData.append('Tags', formValues.tags);

    if (formValues.Image) {
      formData.append('Image', formValues.Image);
    }

console.log(formData);
console.log(formValues)

    return formData;
  }

  onSubmit(): void {
    debugger
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
