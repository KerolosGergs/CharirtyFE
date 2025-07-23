import { Component } from '@angular/core';
import { TostarServ } from '../../../../Shared/tostar-serv';
import { HelpRequest } from '../dashboard-help/models/help-request.model';
import { HelpRequestService } from '../dashboard-help/services/help-request.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Volunteer, VolunteerResponse } from './Model/Volunteer-request.model';
import { VolunteerRequestService } from './service/help-request.service';

@Component({
  selector: 'app-dashboard-volunteer',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-volunteer.html',
  styleUrl: './dashboard-volunteer.scss'
})
export class DashboardVolunteer {
  helpRequests: Volunteer[] = [];
  filteredRequests: Volunteer[] = [];
  paginatedRequests: Volunteer[] = [];

  searchTerm: string = '';
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private volunteerRequestService: VolunteerRequestService,
    private tostarServ: TostarServ
  ) {}

  ngOnInit() {
    this.loadHelpRequests();
  }

  loadHelpRequests() {
    this.volunteerRequestService.getVolunteerRequests().subscribe({
      next: (response) => {
        this.helpRequests = response.data; // Assuming data comes as response.data
        this.applyFilters();
      },
      error: () => {
        // this.tostarServ.showError('فشل تحميل بيانات التطوع');
      }
    });
  }

  onSearchChange() {
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters() {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredRequests = this.helpRequests.filter((req) =>
      req.firstName.toLowerCase().includes(term) ||
      req.lastName.toLowerCase().includes(term) ||
      req.email.toLowerCase().includes(term) ||
      req.phoneNumber.toLowerCase().includes(term)
    );
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredRequests.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedRequests = this.filteredRequests.slice(start, end);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getStartIndex(): number {
    return this.filteredRequests.length === 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredRequests.length);
  }

  deleteRequest(id: number): void {
    if (confirm('هل أنت متأكد أنك تريد حذف هذا الطلب؟')) {
      this.volunteerRequestService.deleteVolunteerRequest(id).subscribe({
        next: () => {
          this.helpRequests = this.helpRequests.filter(r => r.id !== id);
          this.applyFilters();
          this.tostarServ.showSuccess('تم حذف الطلب بنجاح');
        },
        error: () => {
          this.tostarServ.showError('حدث خطأ أثناء حذف الطلب');
        }
      });
    }
  }
}