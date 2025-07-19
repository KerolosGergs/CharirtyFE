import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ComplaintCategory, IComplaintDTO } from '../../../../Core/Interfaces/icomplaint';
import { Complaint } from '../../../../Core/Services/complaint';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './complaints.html',
  styleUrl: './complaints.scss'
})
export class Complaints {
  private _router = inject(Router);
  private _complaintService = inject(Complaint);

  sections: string[] = [
    'الكل',
    'شكوى عن موظف',
    'شكوى عن خدمة',
    'شكوى عن مرفق',
    'شكوى أخرى'
  ];

  selectedSection: string = 'الكل';
  searchText: string = '';
  complaints: IComplaintDTO[] = [];

  ngOnInit() {
    this._complaintService.getUserComplaints().subscribe({
      next: (res) => {
        console.log(res);
        
        if (res.success) {
          console.log(res);
          
          this.complaints = res.data;
        }
      },
      error: (err) =>{
        console.log(err);
        
      }
    });
  }

  get filteredComplaints(): IComplaintDTO[] {
    return this.complaints.filter(c => {
      const typeLabel = this.getCategoryLabel(c.category);
      const matchesSection = this.selectedSection === 'الكل' || typeLabel === this.selectedSection;
      const matchesSearch =
        c.description.includes(this.searchText) || c.title.includes(this.searchText);
      return matchesSection && matchesSearch;
    });
  }

  selectSection(section: string) {
    this.selectedSection = section;
  }

  deleteComplaint(complaint: IComplaintDTO) {
    this.complaints = this.complaints.filter(c => c.id !== complaint.id);
    // Optional: Call service to delete from backend
    // this._complaintService.deleteComplaint(complaint.id).subscribe();
  }

  openComplaintDetails(complaint: IComplaintDTO) {
    this._router.navigate(['/complaints/details'], { queryParams: { id: complaint.id } });
  }

  getCategoryLabel(category: ComplaintCategory): string {
    switch (category) {
      case ComplaintCategory.Employee: return 'شكوى عن موظف';
      case ComplaintCategory.Service: return 'شكوى عن خدمة';
      case ComplaintCategory.Facility: return 'شكوى عن مرفق';
      case ComplaintCategory.Other: return 'شكوى أخرى';
      default: return '';
    }
  }
}
