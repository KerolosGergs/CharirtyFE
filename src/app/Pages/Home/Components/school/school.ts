import { Component, OnInit } from '@angular/core';

export interface DonationData {
  mainTitle: string;
  description: string;
  buttonText: string;
  schoolCouponsTitle: string;
  schoolCouponsDescription: string;
  schoolCouponsButtonText: string;
  backgroundImage: string;
  schoolCouponsImage:string;
}
@Component({
  selector: 'app-school',
  imports: [],
  templateUrl: './school.html',
  styleUrl: './school.scss'
})
export class School implements OnInit {

donationData: DonationData = {
  mainTitle: 'بيدك تصنع فرقاً... وبتبرعك تحيي أملاً',
  description: 'تبرعك اليوم قد يطعم جائعاً أو يعلم طفلاً أو يوفر مأوى لعائلة محتاجة. ساهم في صناعة الأثر وكن سبباً في حياة كريمة لغيرك.',
  buttonText: 'تبرع',
  schoolCouponsTitle: 'كوبونات المدارس',
  schoolCouponsDescription: 'برنامج "قلم ودفتر" هو مبادرة خيرية تهدف إلى توفير الدعم للطلاب المحتاجين في بداية العام الدراسي،',
  schoolCouponsButtonText: 'اعرف المزيد',
  schoolCouponsImage: 'Images/3.jpg',
  backgroundImage:'Images/3.jpg',
};


  constructor() { }

  ngOnInit(): void {
  }

  onDonate(): void {
    // Handle donation action
    console.log('Donation button clicked');
  }

  onLearnMore(): void {
    // Handle learn more action
    console.log('Learn more button clicked');
  }
}

