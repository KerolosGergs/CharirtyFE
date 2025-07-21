import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [NgxExtendedPdfViewerModule],
  templateUrl: './report.html',
  styleUrl: './report.scss'
})
export class Report {
  isBrowser = false;

constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  this.isBrowser = isPlatformBrowser(platformId);
}

}
