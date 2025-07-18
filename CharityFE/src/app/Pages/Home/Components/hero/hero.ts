import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCard } from "../stat-card/stat-card";
import { MainButton } from "../../../../Shared/main-button/main-button";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, MainButton, StatCard,RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {

// router = inject(Router)
heroImage: string= "Images/2.jpg";
 onLearnMore(): void {
    console.log('Learn more clicked');
  }
    // Method to handle button clicks
  onDiscoverServices(): void {

  }

}
