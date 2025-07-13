import { Component, inject, OnInit } from '@angular/core';
import { Advisor } from '../../../../Core/Services/advisor';
import { advisor,  IAdvisorResponse, ICategory } from '../../../../Core/Interfaces/advisor';
import { CommonModule } from '@angular/common';
import { Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-dashboard-advisors',
  standalone: true,
  imports: [CommonModule, RouterLink ],
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
  isOpenEdit = false;
  isOpenDetails = false;

  selectedAdvisor!: advisor ;


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
    this._router.navigate(['dashboard/dashboard-advisor-new']);    
  }

  openEdit(advisor:advisor){
      
    this.selectedAdvisor = advisor    
    this.isOpenEdit = !this.isOpenEdit;

  }

  openDetails(advisor:advisor){
    this.isOpenDetails = !this.isOpenDetails;
    this.selectedAdvisor = advisor
  }


  deleteAdvisor(ID: number) {
    debugger
    this._advisor.deleteAdvisor(ID).subscribe({
      next: (res) => {
        if(res.success){
          console.log('Advisor deleted successfully:', res);
          this.loadAdvisors();
        }else{
          console.error('Error deleting advisor:', res);
        }
      },
      error: (err) => {
        console.error('Error deleting advisor:', err);
      }
    })
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
