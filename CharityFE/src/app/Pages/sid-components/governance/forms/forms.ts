import { Component } from '@angular/core';

@Component({
  selector: 'app-forms',
  imports: [],
  templateUrl: './forms.html',
  styleUrl: './forms.scss'
})
export class Forms {
  selectedFormIndex: number = 0;

  selectForm(index: number): void {
    this.selectedFormIndex = index;
    console.log(index);
    
  }
}
