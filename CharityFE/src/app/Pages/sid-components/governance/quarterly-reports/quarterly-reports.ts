import { Component } from '@angular/core';

@Component({
  selector: 'app-quarterly-reports',
  imports: [],
  templateUrl: './quarterly-reports.html',
  styleUrl: './quarterly-reports.scss'
})
export class QuarterlyReports {
selectedReportIndex: number = 0;

  selectReport(index: number): void {
    this.selectedReportIndex = index;
    console.log(index);
    
  }
}
