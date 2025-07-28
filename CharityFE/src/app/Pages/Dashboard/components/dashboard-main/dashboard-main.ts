import { NgClass, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StatesService } from './Service/states-service';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData } from 'chart.js';

export interface DashboardStats {
  complaintCount: number;
  reconcileRequestCount: number;
  volunteerCount: number;
  advisorCount: number;
  lectureCount: number;
  adviceRequestCount: number;
  serviceOfferingCount: number;
}

@Component({
  selector: 'app-dashboard-main',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './dashboard-main.html',
  styleUrl: './dashboard-main.scss'
})
export class DashboardMain implements OnInit {
  stats!: DashboardStats;

  pieChartLabels: string[] = [];
  pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: []
  };

  barChartLabels: string[] = [];

  barChartData: ChartData<'bar', number[], string> = {
    labels: [],
    datasets: []
  };

  constructor(private dashboardService: StatesService) { }

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe((res) => {
      this.stats = res.data;

      const labels = [
        'شكاوى',
        'طلبات إصلاح ذات البين',
        'متطوعين',
        'مستشارين',
        'محاضرات',
        'استشارات',
        'خدمات',
      ];

      const values = [
        this.stats.complaintCount,
        this.stats.reconcileRequestCount,
        this.stats.volunteerCount,
        this.stats.advisorCount,
        this.stats.lectureCount,
        this.stats.adviceRequestCount,
        this.stats.serviceOfferingCount,
      ];

      this.pieChartData = {
        labels,
        datasets: [
          {
            label: 'النسب',
            data: values,
            backgroundColor: [
              '#dc3545', '#ffc107', '#28a745', '#17a2b8', '#007bff', '#343a40', '#6c757d'
            ]
          }
        ]
      };

      this.barChartData = {
        labels,
        datasets: [
          {
            label: 'الإحصائيات',
            data: values,
            backgroundColor: [
              '#dc3545', '#ffc107', '#28a745', '#17a2b8', '#007bff', '#343a40', '#6c757d'
            ]
          }
        ]
      };
    });
  }

}