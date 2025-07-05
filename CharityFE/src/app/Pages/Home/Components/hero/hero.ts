import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCard } from "../stat-card/stat-card";
import { MainButton } from "../../../../Shared/main-button/main-button";

@Component({
  selector: 'app-hero',
  imports: [CommonModule, StatCard, MainButton],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {

  statistics = [
   
   
    {
      number: '150',
      label: 'مستفيد',
      icon: 'bi-heart-fill',
      color: 'warning'
    },
     {
      number: '200',
      label: 'متطوع',
      icon: 'bi-person-hearts',
      color: 'info'
    },
    {
      number: '50',
      label: 'مشروع',
      icon: 'bi-building',
      color: 'primary'
    },
     {
      number: '300',
      label: 'حالة',
      icon: 'bi-people-fill',
      color: 'success'
    },
  ];
heroImage: string= "Images/2.jpg";
 onLearnMore(): void {
    console.log('Learn more clicked');
  }
    // Method to handle button clicks
  onDiscoverServices(): void {
    console.log('Discover services clicked');
  }

}
