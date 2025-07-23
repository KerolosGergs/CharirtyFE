import { Component, Pipe, PipeTransform  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Footer } from "../../../../Shared/footer/footer";
import { HeaderComponent } from "../../../Home/Components/header-component/header-component";
import { Nav } from "../../../Home/Components/nav/nav";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Spinner } from "../../../../Shared/spinner/spinner";
// @Pipe({
//   name: 'safeUrl'
// })
// export class SafeUrlPipe implements PipeTransform {
//   constructor(private sanitizer: DomSanitizer) {}
//   transform(url: string): SafeUrl {
//     return this.sanitizer.bypassSecurityTrustUrl(url);
//   }
// }
@Component({
  selector: 'app-achive',
  imports: [CommonModule, ReactiveFormsModule, Footer, HeaderComponent, Nav, Spinner],
  templateUrl: './achive.html',
  styleUrl: './achive.scss'
})
export class Achive  {
  title = 'الإنجازات في أرقام';
  imagePath: string = 'Images/1.png';
  
  // PDF viewer properties
  selectedPdf: string = '';
  showPdfViewer: boolean = false;
  pdfZoom: number = 1.0;
  
  // PDF paths
  achievementsReportPdf: string = '1.pdf';
  statisticsReportPdf: string = '2.pdf';

  constructor() {}

  ngOnInit() {
    // Component initialization
  }

  // Show achievements report PDF
  showAchievementsReport() {
    // this.selectedPdf = this.achievementsReportPdf;
    this.showPdfViewer = true;
  }

  // Show statistics report PDF
  showStatisticsReport() {
    // this.selectedPdf = this.statisticsReportPdf;
    this.showPdfViewer = false;
  }

  // Hide PDF viewer
  hidePdfViewer() {
    this.showPdfViewer = false;
    this.selectedPdf = '';
  }

  // Zoom controls
  zoomIn() {
    this.pdfZoom += 0.25;
  }

  zoomOut() {
    if (this.pdfZoom > 0.5) {
      this.pdfZoom -= 0.25;
    }
  }

  resetZoom() {
    this.pdfZoom = 1.0;
  }
}