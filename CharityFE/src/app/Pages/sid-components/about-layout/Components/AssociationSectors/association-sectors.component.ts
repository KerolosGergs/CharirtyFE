import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-association-sectors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './association-sectors.component.html',
  styleUrl: './association-sectors.component.scss'
})
export class AssociationSectorsComponent {
  pdfUrl: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/Files/قطاعات الجمعية.pdf');
  }
} 