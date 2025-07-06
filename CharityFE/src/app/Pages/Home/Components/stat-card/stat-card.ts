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
      icon: 'bi-heart-fill',
      color: 'warning'
    },
     {
      number: '200',
      label: 'متطوع',
      icon: 'bi-person-hearts',
      color: 'info'
    },
    {
      number: '50',
      label: 'مشروع',
      icon: 'bi-building',
      color: 'primary'
    },
     {
      number: '300',
      label: 'حالة',
      icon: 'bi-people-fill',
      color: 'success'
    },
  ];
}
