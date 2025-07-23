import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-registration-certificate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registration-certificate.component.html',
  styleUrl: './registration-certificate.component.scss'
})
export class RegistrationCertificateComponent {

  selectedImage: string = '';

  images = [
    'Images/registration-certificate/شهادة تسجيل 1.png',
    'Images/registration-certificate/شهادة تسجيل 2.jpg',
    'Images/registration-certificate/شهادة تسجيل 3.png',
  ];

  openModal(img: string) {
    this.selectedImage = img;
  }
} 