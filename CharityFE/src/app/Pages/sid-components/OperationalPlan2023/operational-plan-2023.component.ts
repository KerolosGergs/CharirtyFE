import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-operational-plan-2023',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './operational-plan-2023.component.html',
  styleUrl: './operational-plan-2023.component.scss'
})
export class OperationalPlan2023Component {
  pdfUrl: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/Files/الخطة التشغيلية لعام 2023.pdf');
  }
} 