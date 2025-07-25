import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-medical-center',
  imports: [CommonModule],
  templateUrl: './medical-center.html',
  styleUrl: './medical-center.scss'
})
export class MedicalCenter {
 selectedImage: string = '';

  openImageModal(event: Event) {
    const target = event.target as HTMLImageElement;
    this.selectedImage = target.src;
    
   
  }

  openMap() {
    // Open Google Maps with the location
    const address = 'مكة المكرمة شارع الستين';
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
  }
}

