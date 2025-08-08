import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { newsservice } from '../../../../../../Core/Services/news';
import { NewsArticle } from '../../../../../../Core/Interfaces/news';

@Component({
  selector: 'app-dashboard-add-news',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard-add-news.html',
  styleUrls: ['./dashboard-add-news.scss']
})
export class DashboardAddNews implements OnInit {
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
              tags: article.tags?.join(' ') || ''
            });
            this.uploadedImageUrl = article.imageUrl;
          },
          error: (err) => {
            this.toastr.error('فشل تحميل المقال');
            this.router.navigate(['/dashboard/news']);
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
  formData.append('category','category');
  formData.append('isPublished', formValues.isPublished.toString());
  formData.append('Author', 'Author');

  if (formValues.Image instanceof File) {
    formData.append('Image', formValues.Image);
  }

  // Append each additional image
  this.selectedAdditionalImages.forEach((file, index) => {
    formData.append('Images', file); // use the same field name for multiple
  });

  formData.append('tags', formValues.tags);

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

    if (this.articleId) {
      // Edit existing article
      this._news.updateNews(this.articleId, formData).subscribe({
        next: (res) => {
          if (res.success) {
            this.toastr.success('تم تعديل المقال بنجاح');
            this.router.navigate(['/dashboard/dashboard-news']);
          } else {
            this.toastr.error('حدث خطأ أثناء تعديل المقال');
          }
        },
        error: () => {
          this.toastr.error('حدث خطأ، تأكد من اتصالك بالإنترنت');
        }
      });
    } else {
      // Create new article
      debugger
      this._news.createNewNews(formData).subscribe({
        next: (res) => {
          if (res.success) {
            this.toastr.success('تم اضافة المقال بنجاح');
            this.router.navigate(['/dashboard/dashboard-news']);
          } else {
            this.toastr.error('حدث خطأ أثناء اضافة المقال');
          }
        },
        error: () => {
          this.toastr.error('حدث خطأ، تأكد من اتصالك بالإنترنت');
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/dashboard-news']);
  }
  uploadedAdditionalImages: string[] = [];
selectedAdditionalImages: File[] = []; // actual File objects

onAdditionalImagesChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedAdditionalImages = Array.from(input.files); // save the files
    this.uploadedAdditionalImages = [];

    // Preview images
    for (let file of this.selectedAdditionalImages) {
      if (!file.type.startsWith('image/')) {
        this.toastr.error('كل الملفات يجب أن تكون صور');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedAdditionalImages.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
}

}
