import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-investment-plan',
  standalone: true,
  templateUrl: './investment-plan.component.html',
  styleUrl: './investment-plan.component.scss'
})
export class InvestmentPlanComponent {
  planUrl: SafeResourceUrl;
  associationPlanUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.planUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/Files/الخطة الاستثمارية.pdf');
    this.associationPlanUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/Files/خطة الاستثمار بالجمعية.pdf');
  }
} 