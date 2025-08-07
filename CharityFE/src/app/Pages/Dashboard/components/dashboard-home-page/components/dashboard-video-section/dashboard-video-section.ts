import { HomePageService } from './../../../../../../Core/Services/HomePage/home-page-service';
import { Component } from '@angular/core';
import { putVideoSection } from '../../../../../../Core/Interfaces/HomePage/ihome-page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard-video-section',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './dashboard-video-section.html',
  styleUrl: './dashboard-video-section.scss'
})
export class DashboardVideoSection {
 videoData: putVideoSection = {
    Title: '',
    Description: '',
    VideoUrl: ''
  };

  loading = false;
  updating = false;
  successMessage = '';
  errorMessage = '';
  IvideoUrl: any;

  constructor(private HomePageService: HomePageService,  private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.loadVideoData();
  }

  loadVideoData() {
    this.loading = true;
    this.HomePageService.getVideoSection().subscribe({
      next: (response) => {
        if (response.success) {
          const data = response.data;
          this.videoData = {
            Title: data.title,
            Description: data.description,
            VideoUrl: data.videoUrl
          };
          this.playVideo();
        }
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'حدث خطأ أثناء تحميل البيانات';
        this.loading = false;
      }
    });
  }

  updateVideoSection() {
    this.updating = true;
    this.successMessage = '';
    this.errorMessage = '';
    const Data = new FormData();
    Data.append('Title', this.videoData.Title);
    Data.append('Description', this.videoData.Description);
    Data.append('VideoUrl', this.videoData.VideoUrl);

    this.HomePageService.putVideoSection(Data).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = 'تم حفظ التغييرات بنجاح';
          setTimeout(() => this.successMessage = '', 3000);
        } else {
          this.errorMessage = response.message || 'حدث خطأ أثناء الحفظ';
        }
        this.updating = false;
      },
      error: (error) => {
        this.errorMessage = 'حدث خطأ أثناء الحفظ';
        this.updating = false;
      }
    });
  }
  playVideo(): void {
  const videoId = this.extractYouTubeId(this.videoData.VideoUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  this.IvideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
}

extractYouTubeId(url: string): string {
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : '';
}

}