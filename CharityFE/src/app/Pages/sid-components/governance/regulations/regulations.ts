import { Component } from '@angular/core';

@Component({
  selector: 'app-regulations',
  imports: [],
  templateUrl: './regulations.html',
  styleUrl: './regulations.scss'
})
export class Regulations {
  selectedReportIndex: number = 0;

  selectReport(index: number): void {
    this.selectedReportIndex = index;
    console.log(index);
    
  }
}
