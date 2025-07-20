import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration-certificate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registration-certificate.component.html',
  styleUrl: './registration-certificate.component.scss'
})
export class RegistrationCertificateComponent {
  images = [
    '/Files/شهادة تسجيل 1.png',
    '/Files/شهادة تسجيل 2.jpg',
    '/Files/شهادة تسجيل 3.png',
  ];
} 