import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiResponse, CreateLecture, LectureType } from '../../../../../../Core/Interfaces/ilecture';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Lecture } from '../../../../../../Core/Services/lecture';

@Component({
  selector: 'app-add-new-video',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './add-new-video.html',
  styleUrl: './add-new-video.scss'
})
export class AddNewVideo {
  form: FormGroup;
  selectedFile: File | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private lectureService: Lecture,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', [Validators.required, Validators.maxLength(150)]],
      videoLink: ['']
    });
  }

  triggerFileBrowse(): void {
    const input = document.getElementById('videoFile') as HTMLInputElement;
    input?.click();
  }

  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
      this.selectedFile = target.files[0];
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files?.length) {
      this.selectedFile = event.dataTransfer.files[0];
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const { title, description, videoLink } = this.form.value;

    this.isSubmitting = true;

    if (this.selectedFile) {
      // Upload via file
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('speaker', 'Unknown'); // Replace if needed
      formData.append('type', LectureType.Video);
      formData.append('videoFile', this.selectedFile);
      formData.append('tags', JSON.stringify([])); // Optional
      // formData.append('consultationId', ...); // Optional

      this.lectureService.uploadLectureVideo(formData).subscribe({
        next: (res: ApiResponse<any>) => {
          console.log(res);
          
          this.isSubmitting = false;
          if (res.success) this.router.navigate(['/dashboard/dashboard-awareness']);
        },
        error: (err) => {
          console.log(err);
          
          this.isSubmitting = false;
          alert('فشل في رفع الفيديو.');
        }
      });

    } else if (videoLink?.trim()) {
      // Upload via link
      const lecture: CreateLecture = {
        title,
        description,
        speaker: 'Unknown',
        type: LectureType.Video,
        videoUrl: videoLink,
        tags: [],
      };

      this.lectureService.createLectureByLink(lecture).subscribe({
        next: (res: ApiResponse<any>) => {
          this.isSubmitting = false;
          if (res.success) this.router.navigate(['/dashboard/dashboard-awareness']);
        },
        error: () => {
          this.isSubmitting = false;
          alert('فشل في إرسال الرابط.');
        }
      });
    } else {
      this.isSubmitting = false;
      alert('الرجاء تحديد ملف أو إدخال رابط.');
    }
  }
}
