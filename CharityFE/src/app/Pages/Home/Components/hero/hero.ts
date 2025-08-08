import { HomePageService } from './../../../../Core/Services/HomePage/home-page-service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCard } from "../stat-card/stat-card";
import { MainButton } from "../../../../Shared/main-button/main-button";
import { Router, RouterLink } from '@angular/router';
import { promises } from 'dns';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, MainButton, StatCard,RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero implements OnInit {
  statistics: { number: string; label: string }[] = [];

// router = inject(Router)
heroImage: string= "Images/home/bgHead.png";
 onLearnMore(): void {
    console.log('Learn more clicked');
  }
    // Method to handle button clicks
  onDiscoverServices(): void {

  }
  async ngOnInit(){
    await this.getImg();
  }
  HomePageService=inject(HomePageService)
 getImg(): void {
    this.HomePageService.getHeroSection().subscribe({
      next: (response) => {
        const data = response.data;
        this.heroImage = data.backgroundImageUrl;
        this.statistics = [
          { number: data.stats1Value.toString(), label: data.stats1Label },
          { number: data.stats2Value.toString(), label: data.stats2Label },
          { number: data.stats3Value.toString(), label: data.stats3Label },
          { number: data.stats4Value.toString(), label: data.stats4Label },
        ];
      },
      error: () => {
      },
    });
  }

}
