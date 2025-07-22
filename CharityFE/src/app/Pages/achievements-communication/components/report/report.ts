import { isPlatformBrowser, NgIf } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [NgxExtendedPdfViewerModule,NgIf],
  templateUrl: './report.html',
  styleUrl: './report.scss'
})
export class Report {
  isBrowser = false;
  pdfSrc = 'https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf';


constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  this.isBrowser = isPlatformBrowser(platformId);

}

}
