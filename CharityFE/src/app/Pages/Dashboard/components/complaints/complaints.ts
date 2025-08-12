import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ComplaintCategory, IComplaintDTO } from '../../../../Core/Interfaces/icomplaint';
import { Complaint } from '../../../../Core/Services/complaint';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TostarServ } from '../../../../Shared/tostar-serv';
import { error } from 'console';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CairoFontBase64 } from '../../../../Core/Services/textEncode/cairo-font';
import { AmiriFontBase64 } from '../../../../Core/Services/textEncode/AmiriFontBase64';

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
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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
exportToComplaintsPdf(): void {
  if (!isPlatformBrowser(this.platformId)) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  doc.addFileToVFS('Amiri-Regular.ttf', AmiriFontBase64);
  doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
  doc.setFont('Amiri');
  doc.setFontSize(14);

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, '0')}/${
      (date.getMonth() + 1).toString().padStart(2, '0')
    }/${date.getFullYear()}`;
  };

 

  const body = this.complaints?.map((c) => [
    formatDate(c.createdAt),
    c.status === 'Active' ? 'نشطة' : 'غير نشطة',
    c.phoneNumber,
    c.email,
    c.userName,
  ]) || [];

autoTable(doc, {
  //  head: [['تاريخ', 'Status', 'Phone Number', 'Email', 'Name'] , ...body],
  body,
  styles: {
    font: 'Amiri',
    fontSize: 12,
    halign: 'right',
  },
  headStyles: {
    font: 'Amiri',
    fontSize: 12,
    halign: 'right',
    fillColor: [41, 128, 185],
    textColor: 255,
  },
  margin: { top: 60 },
  didDrawPage: () => {
    doc.setFont('Amiri');
    doc.setFontSize(16);
    doc.text('قائمة الشكاوى', doc.internal.pageSize.getWidth() - 40, 30, {
      align: 'right',
    });

    // DEBUG LINE
    doc.setFontSize(10);
    doc.text('قائمة الشكاوى', 40, 50); // test if text renders
  },
});


  doc.save('قائمة-الشكاوى.pdf');
}

splitDescription(desc: string | null | undefined): { title: string; message: string } {
  const raw = (desc ?? '').trim();
  if (!raw) return { title: '', message: '' };

  // نفصل على أول سطر فاضي أو أول \n
  const parts = raw.split(/\n\s*\n/); // يلتقط فاصل سطر فاضي
  if (parts.length > 1) {
    const [first, ...rest] = parts;
    return { title: first.trim(), message: rest.join('\n\n').trim() };
  }

  // لو مفيش سطر فاضي، استخدم أول سطر كعنوان لو في أكتر من سطر
  const lines = raw.split(/\n/);
  if (lines.length > 1) {
    const [first, ...rest] = lines;
    return { title: first.trim(), message: rest.join('\n').trim() };
  }

  // نص واحد: اعتبره رسالة بدون عنوان
  return { title: '', message: raw };
}
}
