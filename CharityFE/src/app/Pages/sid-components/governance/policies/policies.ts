import { Component } from '@angular/core';

@Component({
  selector: 'app-policies',
  imports: [],
  templateUrl: './policies.html',
  styleUrl: './policies.scss'
})
export class Policies {
  selectedPolicyIndex: number = 0;

  selectPolicy(index: number): void {
    this.selectedPolicyIndex = index;
    console.log(index);
    
  }
}
