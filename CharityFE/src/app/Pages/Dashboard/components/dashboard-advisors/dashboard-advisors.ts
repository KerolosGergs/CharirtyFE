import { Component, inject, OnInit } from '@angular/core';
import { NewAdvisor } from "./components/new-advisor/new-advisor";
import { Advisor } from '../../../../Core/Services/advisor';
import { IAdvisor, IAdvisorResponse, ICategory } from '../../../../Core/Interfaces/advisor';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-advisors',
  standalone: true,
  imports: [CommonModule, NewAdvisor],
  templateUrl: './dashboard-advisors.html',
  styleUrl: './dashboard-advisors.scss'
})
export class DashboardAdvisors implements OnInit {

  advisors: IAdvisorResponse | null = null;
  categories: ICategory[] = [];
  selectedCategoryId: number | null = null;
  filteredAdvisors: any[] = [];
  isLoadingCategories: boolean = true;
  isLoadingAdvisors: boolean = true;
  _advisor = inject(Advisor);
  _router = inject(Router)
  isOpen = false;

  ngOnInit(): void {
    this.loadAdvisors()
  }
   loadAdvisors(): void {
    this.isLoadingAdvisors = true;
    this._advisor.getAllAdvisors().subscribe({
      next: (data) => {
        if (data && data.success) {
          this.advisors = data;
          this.filteredAdvisors = data.data;
        }
        this.isLoadingAdvisors = false;
      },
      error: () => {
        this.isLoadingAdvisors = false;
      }
    });
  }

  openCreateNew() {
    this.isOpen = !this.isOpen;
  }

  loadAdvisorDetails(id: number): void {
    this._advisor.getAdvisorById(id).subscribe({
      next: (data) => {
        console.log('Advisor Details:', data);

        this._router.navigate
      },
      error: (err) => {
        console.error('Error loading advisor details:', err);
      }
    });
  }
}
