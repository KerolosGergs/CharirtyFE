import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiResponse, CreateLecture, LectureType } from '../../../../../../Core/Interfaces/ilecture';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Lecture } from '../../../../../../Core/Services/lecture';
import { Video } from './models/video-model';
import { VideoService } from './services/video-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-video',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './add-new-video.html',
  styleUrl: './add-new-video.scss'
})
export class AddNewVideo {
  form: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private videoService: VideoService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(150)]],
      videoUrl: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const videoData: Video = {
      title: this.form.value.title,
      description: this.form.value.description,
      videoUrl: this.form.value.videoUrl
    };

    this.videoService.addVideo(videoData).subscribe({
      next: () => {
        this.toastr.success('تم إضافة الفيديو بنجاح');
        this.isSubmitting = false;
        this.form.reset();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('حدث خطأ أثناء إضافة الفيديو');
        this.isSubmitting = false;
      }
    });
  }
}