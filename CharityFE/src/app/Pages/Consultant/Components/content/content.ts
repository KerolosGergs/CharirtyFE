import { Component, inject, OnInit } from '@angular/core';
import { CardItem } from "../card-item/card-item";
import { IAdvisor, IAdvisorResponse, ICategory, ICategoryResponse } from '../../../../Core/Interfaces/advisor';
import { Advisor } from '../../../../Core/Services/advisor';

@Component({
  selector: 'app-content-consultant',
  imports: [CardItem],
  templateUrl: './content.html',
  styleUrl: './content.scss',
  standalone: true
})
export class ContentConsultant implements OnInit {

  advisors: IAdvisorResponse | null = null;
  categories: ICategory[] = [];
  selectedCategoryId: number | null = null;
  filteredAdvisors: any[] = [];
  isLoadingCategories: boolean = true;
  isLoadingAdvisors: boolean = true;

  private _advisor = inject(Advisor);

  ngOnInit(): void {
    this.loadCategories();
    this.loadAdvisors();
  }

  loadCategories(): void {
    this.isLoadingCategories = true;
    this._advisor.getCategories().subscribe({
      next: (data) => {
        if (data && data.success) {
          this.categories = data.data;
        }
        this.isLoadingCategories = false;
      },
      error: () => {
        this.isLoadingCategories = false;
      }
    });
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

  selectCategory(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    
    if (!this.advisors?.data) return;
    
    if (categoryId === null) {
      this.filteredAdvisors = this.advisors.data;
    } else {
      this.filteredAdvisors = this.advisors.data.filter(advisor => 
        advisor.consultationId === categoryId
      );
    }
  }

  isCategorySelected(categoryId: number | null): boolean {
    return this.selectedCategoryId === categoryId;
  }

  get isPageLoading(): boolean {
    return this.isLoadingCategories || this.isLoadingAdvisors;
  }

}
