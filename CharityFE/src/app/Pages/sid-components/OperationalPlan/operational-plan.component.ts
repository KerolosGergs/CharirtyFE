import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-operational-plan',
  standalone: true,
  templateUrl: './operational-plan.component.html',
  styleUrl: './operational-plan.component.scss'
})
export class OperationalPlanComponent {
  planUrl: SafeResourceUrl;
  goalsUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.planUrl = this.sanitizer.bypassSecurityTrustResourceUrl('Pdf/الخطة التشغيلية.pdf');
    this.goalsUrl = this.sanitizer.bypassSecurityTrustResourceUrl('Pdf/الأهداف.pdf');
  }
} 