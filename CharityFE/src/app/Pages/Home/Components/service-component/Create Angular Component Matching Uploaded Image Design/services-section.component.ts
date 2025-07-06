// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-services-section',
//   templateUrl: './services-section.component.html',
//   styleUrls: ['./services-section.component.css']
// })
// export class ServicesSectionComponent implements OnInit {
//   currentSlide = 0;
//   isAnimating = false;
  
//   services = [
//     {
//       id: '01',
//       title: 'دعم الأسر المحتاجة',
//       image: 'assets/images/service1.jpg'
//     },
//     {
//       id: '02',
//       title: 'الاستشارات المجانية',
//       image: 'assets/images/service2.jpg'
//     },
//     {
//       id: '03',
//       title: 'رعاية الأيتام',
//       image: 'assets/images/service3.jpg'
//     }
//   ];

//   ngOnInit() {
//     // Auto-slide functionality (optional)
//     // setInterval(() => {
//     //   this.nextSlide();
//     // }, 5000);
//   }

//   nextSlide() {
//     if (this.isAnimating) return;
    
//     this.isAnimating = true;
//     this.currentSlide = (this.currentSlide + 1) % this.services.length;
    
//     setTimeout(() => {
//       this.isAnimating = false;
//     }, 600);
//   }

//   prevSlide() {
//     if (this.isAnimating) return;
    
//     this.isAnimating = true;
//     this.currentSlide = this.currentSlide === 0 ? this.services.length - 1 : this.currentSlide - 1;
    
//     setTimeout(() => {
//       this.isAnimating = false;
//     }, 600);
//   }

//   goToSlide(index: number) {
//     if (this.isAnimating || index === this.currentSlide) return;
    
//     this.isAnimating = true;
//     this.currentSlide = index;
    
//     setTimeout(() => {
//       this.isAnimating = false;
//     }, 600);
//   }
// }

