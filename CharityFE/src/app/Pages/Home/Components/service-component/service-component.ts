import { routes } from './../../../../app.routes';
import { Component, OnInit } from '@angular/core';
import { MainButton } from "../../../../Shared/main-button/main-button";
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-service-component',
  imports: [MainButton,RouterLink],
  templateUrl: './service-component.html',
  styleUrl: './service-component.scss'
})
export class ServiceComponent  implements OnInit{
    constructor(private router: Router) {}
onDiscoverServices() {
  
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
      image: 'Images/home/Est4rat.jpeg'
    },
    {
      id: '03',
      title: 'رعاية الأيتام',
      image: 'Images/3.jpg'
    }
  ];

  ngOnInit() {

  }

   nextSlide() {
    
    this.isAnimating = true;
    this.currentSlide = (this.currentSlide + 1) % this.services.length;
    console.log(this.currentSlide);

  }

  prevSlide() {
    
    this.isAnimating = true;
    this.currentSlide = this.currentSlide === 0 ? this.services.length - 1 : this.currentSlide - 1;
    console.log(this.currentSlide);
 
  }
  goToSlide(index: number) {
    
    this.isAnimating = true;
    this.currentSlide = index;
    
  }


}

