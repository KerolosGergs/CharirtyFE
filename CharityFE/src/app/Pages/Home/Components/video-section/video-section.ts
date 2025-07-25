import { Component, OnInit } from '@angular/core';
import { School } from "../school/school";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-section',
  imports: [School],
  templateUrl: './video-section.html',
  styleUrl: './video-section.scss'
})
export class VideoSection implements OnInit {
  videoUrlRaw: string = 'https://www.youtube.com/embed/nnhrUthpfI8?si=_U2ZcqqyAnqRBOL4';
  videoUrl: SafeResourceUrl | null = null;
  isVideoLoaded: boolean = false;
  showPlayButton: boolean = true;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrlRaw);
  }

  playVideo(): void {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrlRaw);
    this.showPlayButton = false;
    this.isVideoLoaded = true;
  }
}