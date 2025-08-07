import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  imports: [],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss'
})
export class StatCard {

    statistics = [
   
   
    {
      number: '150',
      label: 'مستفيد',
      icon: 'bi-stars',
      color: 'warning'
    },{
      number: '50',
      label: 'مشروع',
      icon: 'bi-stars',
      color: 'primary'
    },
     {
      number: '200',
      label: 'متطوع',
      icon: 'bi-stars',
      color: 'info'
    },
    
     {
      number: '300',
      label: 'حالة',
      icon: 'bi-stars',
      color: 'success'
    },
  ];
}
