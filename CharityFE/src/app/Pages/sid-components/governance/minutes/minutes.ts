import { Component } from '@angular/core';

@Component({
  selector: 'app-minutes',
  imports: [],
  templateUrl: './minutes.html',
  styleUrl: './minutes.scss'
})
export class Minutes {
  selectedMinutesIndex: number = 0;
  selectedCommitteeMinutesIndex: number = 0;
  selectedGeneralAssemblyMinutesIndex: number = 0;

  selectMinutes(index: number): void {
    this.selectedMinutesIndex = index;

  }
  selectCommitteeMinutes(index: number): void {
  this.selectedCommitteeMinutesIndex = index;
}
selectGeneralAssemblyMinutes(index: number): void {
  this.selectedGeneralAssemblyMinutesIndex = index;
}
}
