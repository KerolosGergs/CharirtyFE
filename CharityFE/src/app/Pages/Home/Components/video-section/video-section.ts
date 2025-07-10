import { Component, OnInit } from '@angular/core';
import { School } from "../school/school";

@Component({
  selector: 'app-video-section',
  imports: [School],
  templateUrl: './video-section.html',
  styleUrl: './video-section.scss'
})
export class VideoSection implements OnInit {
videoUrl: string = '';
  isVideoLoaded: boolean = false;
  showPlayButton: boolean = true;

  constructor() { }

  ngOnInit(): void {
    // You can set a default video URL here
    // this.videoUrl = 'https://www.youtube.com/embed/your-video-id';
  }

  setVideoUrl(url: string): void {
    this.videoUrl = url;
    this.isVideoLoaded = true;
  }

  playVideo(): void {
    this.showPlayButton = false;
    // Additional logic for video play can be added here
  }

  onVideoLoad(): void {
    this.isVideoLoaded = true;
  }

  onVideoError(): void {
    console.error('Video failed to load');
    this.isVideoLoaded = false;
  }
  
}

