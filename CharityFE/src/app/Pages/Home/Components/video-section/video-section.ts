import { HomePageService } from './../../../../Core/Services/HomePage/home-page-service';
import { Component, inject, OnInit } from '@angular/core';
import { School } from "../school/school";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-section',
  imports: [School],
  templateUrl: './video-section.html',
  styleUrl: './video-section.scss'
})
export class VideoSection implements OnInit {
  videoUrlRaw: string = 'https://www.youtube.com/watch?v=nnhrUthpfI8';
  videoUrl: SafeResourceUrl | null = null;
  isVideoLoaded: boolean = true;
  showPlayButton: boolean = false;
  Title:string ='شاهد... كيف يصنع عطاؤك الفرق';
  Description:string =` ندعوك لمشاهدة هذا الفيديو التوعوي الذي يجسد أثر العمل الخيري في حياة الأسر المحتاجة،
          ويبرز كيف يمكن للتبرع البسيط أن يزرع الأمل ويغير الواقع. قصص حقيقية... مشاهد مؤثرة...
          وإنسانية تستحق أن تُروى.`;
  HomePageService=inject(HomePageService)
  constructor(private sanitizer: DomSanitizer) {}

  async ngOnInit(): Promise<void> {
    await this.getVideoSection();
    // this.playVideo();
  }

  playVideo(): void {
  const videoId = this.extractYouTubeId(this.videoUrlRaw);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
}

extractYouTubeId(url: string): string {
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : '';
}
  getVideoSection() {
    this.HomePageService.getVideoSection().subscribe((response) => {
      if (response.success) {
        const data = response.data;
        this.Title = data.title;
        this.Description = data.description;
        this.videoUrlRaw = data.videoUrl;
        this.playVideo();
      }
    });
  }
}