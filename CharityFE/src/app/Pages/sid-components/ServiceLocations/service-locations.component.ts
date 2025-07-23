import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface LocationItem {
  icon: string;
  text: string;
}

@Component({
  selector: 'app-service-locations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-locations.component.html',
  styleUrl: './service-locations.component.scss'
})
export class ServiceLocationsComponent {
  locations: LocationItem[] = [
    { icon: 'bi-geo-alt', text: 'مقر الجمعية الخيرية بمكة المكرمة' },
    { icon: 'bi-hospital', text: 'المستوصف الخيري لغسيل الكلى' },
    { icon: 'bi-ear', text: 'مركز السمع والنطق بالنوارية' },
    { icon: 'bi-pen', text: 'معهد الخط العربي بشارع الستين' },
    { icon: 'bi-box-seam', text: 'المستودع' },
  ];
} 