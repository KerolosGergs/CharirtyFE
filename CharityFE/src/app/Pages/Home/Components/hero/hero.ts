import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCard } from "../stat-card/stat-card";
import { MainButton } from "../../../../Shared/main-button/main-button";

@Component({
  selector: 'app-hero',
  imports: [CommonModule, MainButton, StatCard],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {


heroImage: string= "Images/2.jpg";
 onLearnMore(): void {
    console.log('Learn more clicked');
  }
    // Method to handle button clicks
  onDiscoverServices(): void {
    
   const element = document.getElementById('services' );
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
