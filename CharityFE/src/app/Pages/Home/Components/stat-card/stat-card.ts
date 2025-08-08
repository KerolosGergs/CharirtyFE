import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  imports: [],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss'
})
export class StatCard {
  @Input() statistics: { number: string; label: string; }[] = [
   
    {
      number: '150',
      label: 'مستفيد',
    },{
      number: '50',
      label: 'مشروع',
    },
     {
      number: '200',
      label: 'متطوع',
    },
    
     {
      number: '300',
      label: 'حالة'
    },
  ];
}
