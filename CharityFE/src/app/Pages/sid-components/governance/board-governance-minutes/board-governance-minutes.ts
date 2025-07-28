import { Component } from '@angular/core';

@Component({
  selector: 'app-board-governance-minutes',
  imports: [],
  templateUrl: './board-governance-minutes.html',
  styleUrl: './board-governance-minutes.scss'
})
export class BoardGovernanceMinutes {
  selectedMinutesIndex: number = 0;

  selectMinutes(index: number): void {
    this.selectedMinutesIndex = index;

  }
}
