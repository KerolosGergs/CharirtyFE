import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-strategic-plan',
  standalone: true,
  templateUrl: './strategic-plan.component.html',
  styleUrl: './strategic-plan.component.scss'
})
export class StrategicPlanComponent {
  pdfUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/Files/الخطة الاستراتيجية.pdf');
  }
} 