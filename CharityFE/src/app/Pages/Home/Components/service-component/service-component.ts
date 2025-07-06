import { Component, OnInit } from '@angular/core';
import { MainButton } from "../../../../Shared/main-button/main-button";

@Component({
  selector: 'app-service-component',
  imports: [MainButton],
  templateUrl: './service-component.html',
  styleUrl: './service-component.scss'
})
export class ServiceComponent  implements OnInit{
onDiscoverServices() {
throw new Error('Method not implemented.');
}
 currentSlide = 0;
  isAnimating = false;
  
  services = [
    {
      id: '01',
      title: 'دعم الأسر المحتاجة',
      image: 'Images/1.jpg'
    },
    {
      id: '02',
      title: 'الاستشارات المجانية',
      image: 'Images/2.jpg'
    },
    {
      id: '03',
      title: 'رعاية الأيتام',
      image: 'Images/3.jpg'
    }
  ];

  ngOnInit() {
    // Auto-slide functionality (optional)
    // setInterval(() => {
    //   this.nextSlide();
    // }, 5000);
  }

   nextSlide() {
    // if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.currentSlide = (this.currentSlide + 1) % this.services.length;
    console.log(this.currentSlide);
    // setTimeout(() => {
    //   this.isAnimating = false;
    // }, 600);
  }

  prevSlide() {
    // if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.currentSlide = this.currentSlide === 0 ? this.services.length - 1 : this.currentSlide - 1;
    console.log(this.currentSlide);
    // setTimeout(() => {
    //   this.isAnimating = false;
    // }, 600);
  }
  goToSlide(index: number) {
    
    this.isAnimating = true;
    this.currentSlide = index;
    
  }


}

