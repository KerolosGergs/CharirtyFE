import { RouterLink } from '@angular/router';
import { HomePageService } from './../../../../Core/Services/HomePage/home-page-service';
import { Component, inject, OnInit } from '@angular/core';

export interface DonationData {
  mainTitle: string;
  description: string;
  buttonText: string;
  backgroundImage: string;
  buttonUrl: string;
}
@Component({
  selector: 'app-school',
  imports: [RouterLink],
  templateUrl: './school.html',
  styleUrl: './school.scss'
})
export class School implements OnInit {

donationData: DonationData = {
  mainTitle: 'بيدك تصنع فرقاً... وبتبرعك تحيي أملاً',
  description: 'تبرعك اليوم قد يطعم جائعاً أو يعلم طفلاً أو يوفر مأوى لعائلة محتاجة. ساهم في صناعة الأثر وكن سبباً في حياة كريمة لغيرك.',
  buttonText: 'تبرع',
  backgroundImage:'Images/3.jpg',
  buttonUrl: ''
};

  HomePageService = inject(HomePageService)
  constructor() { }

  async ngOnInit(): Promise<void> {
    await this.getDataSection();
  }

  onDonate(): void {
    // Handle donation action
    console.log('Donation button clicked');
  }

  onLearnMore(): void {
    // Handle learn more action
    console.log('Learn more button clicked');
  }
  getDataSection(){
    this.HomePageService.getTrendSection().subscribe((response) => {
      if (response.success) {
        const data = response.data;
        this.donationData.mainTitle = data.title;
        this.donationData.description = data.description;
        this.donationData.buttonText = data.buttonText;
        this.donationData.backgroundImage = data.imageUrl;

      }
    });
  }
}

