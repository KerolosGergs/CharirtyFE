import { Component } from '@angular/core';

@Component({
  selector: 'app-budget',
  imports: [],
  templateUrl: './budget.html',
  styleUrl: './budget.scss'
})
export class Budget {
  selectedBudgetIndex: number = 0;

  selectBudget(index: number): void {
    this.selectedBudgetIndex = index;
    console.log(index);
    
  }
}
