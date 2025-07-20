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
      icon: 'bi-person-heart',
      color: 'warning'
    },{
      number: '50',
      label: 'مشروع',
      icon: 'bi-journal-check',
      color: 'primary'
    },
     {
      number: '200',
      label: 'متطوع',
      icon: 'bi-person-fill',
      color: 'info'
    },
    
     {
      number: '300',
      label: 'حالة',
      icon: 'bi-clipboard-pulse',
      color: 'success'
    },
  ];
}
