import { Component } from '@angular/core';

@Component({
  selector: 'app-financial-reports',
  standalone: true,
  imports: [],
  templateUrl: './financial-reports.html',
  styleUrl: './financial-reports.scss'
})
export class FinancialReports {
  selectedReportIndex: number = 0;

  selectReport(index: number): void {
    this.selectedReportIndex = index;
    console.log(index);
    
  }
}
