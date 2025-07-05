import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  imports: [],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss'
})
export class StatCard {
  number = input<string> ();
  label= input<String> ();
  iconNumber = input<String> ();
}
