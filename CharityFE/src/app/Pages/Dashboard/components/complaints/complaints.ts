import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ComplaintCategory, IComplaintDTO } from '../../../../Core/Interfaces/icomplaint';
import { Complaint } from '../../../../Core/Services/complaint';
import { CommonModule } from '@angular/common';
import { TostarServ } from '../../../../Shared/tostar-serv';
import { error } from 'console';

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
  private _tostar =inject(TostarServ)
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
    this._complaintService.getAllComplaints().subscribe({
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

    const search = this.searchText.toLowerCase();
    const matchesSearch =
      c.title?.toLowerCase().includes(search) ||
      c.description?.toLowerCase().includes(search) ||
      c.userName?.toLowerCase().includes(search) ||
      c.email?.toLowerCase().includes(search) ||
      c.phoneNumber?.includes(search);

    return matchesSection && matchesSearch;
  });
}


  selectSection(section: string) {
    this.selectedSection = section;
  }

  deleteComplaint(complaint: IComplaintDTO) {
    this.complaints = this.complaints.filter(c => c.id !== complaint.id);
    this._complaintService.deleteComplaint(complaint.id).subscribe(
      next => this._tostar.showSuccess("تم حذف الشكوى بنجاح"),
      
      error => {
        this._tostar.showError("خطاء في حذف الشكوى")
      }
    );

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
