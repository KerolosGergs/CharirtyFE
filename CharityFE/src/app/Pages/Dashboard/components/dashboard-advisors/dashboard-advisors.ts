import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Advisor } from '../../../../Core/Services/advisor';
import { advisor, IAdvisorResponse, ICategory } from '../../../../Core/Interfaces/advisor';
import { TostarServ } from '../../../../Shared/tostar-serv';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AmiriFontBase64 } from '../../../../Core/Services/textEncode/AmiriFontBase64';

@Component({
  selector: 'app-dashboard-advisors',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-advisors.html',
  styleUrl: './dashboard-advisors.scss',
})
export class DashboardAdvisors implements OnInit {
  advisors: IAdvisorResponse | null = null;
  filteredAdvisors: any[] = [];
  isLoadingAdvisors = true;

  private _advisor = inject(Advisor);
  private _router = inject(Router);
  private tostar = inject(TostarServ);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.loadAdvisors();
  }

  loadAdvisors(): void {
    this.isLoadingAdvisors = true;
    this._advisor.getAllAdvisors().subscribe({
      next: (data) => {
        if (data?.success) {
          this.advisors = data;
          this.filteredAdvisors = data.data;
        }
        this.isLoadingAdvisors = false;
      },
      error: () => (this.isLoadingAdvisors = false),
    });
  }

  openCreateNew() {
    this._router.navigate(['dashboard/dashboard-advisor-new']);
  }

  deleteAdvisor(id: number): void {
    this._advisor.deleteAdvisor(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.tostar.showSuccess('تم حذف المستشار بنجاح');
          this.loadAdvisors();
        } else {
          this.tostar.showError('خطاء في حذف المستشار');
        }
      },
      error: () => this.tostar.showError('تأكد من أتصالك بالأنترنت'),
    });
  }

exportToPdf(): void {
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

  const formatArabicDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, '0')}/${
      (date.getMonth() + 1).toString().padStart(2, '0')
    }/${date.getFullYear()}`;
  };

  const data = this.advisors?.data || [];

  const body: any[] = [
    // ✅ Manual Arabic header row as data
    // [
    //   { content: 'تاريخ الانضمام', styles: { fillColor: [40, 60, 90], textColor: 255, fontStyle: 'bold' } },
    //   { content: 'الحالة', styles: { fillColor: [40, 60, 90], textColor: 255, fontStyle: 'bold' } },
    //   { content: 'البريد الإلكتروني', styles: { fillColor: [40, 60, 90], textColor: 255, fontStyle: 'bold' } },
    //   { content: 'الاسم', styles: { fillColor: [40, 60, 90], textColor: 255, fontStyle: 'bold' } }
    // ],
    // ✅ Advisor data
    ...data.map((item) => [
      formatArabicDate(item.createdAt),
      item.isActive ? 'نشط' : 'غير نشط',
      item.email,
      item.fullName,
    ]),
  ];

  autoTable(doc, {
    body,
    styles: {
      font: 'Amiri',
      fontSize: 12,
      halign: 'right',
    },
    columnStyles: {
      0: { halign: 'right' },
      1: { halign: 'right' },
      2: { halign: 'right' },
      3: { halign: 'right' },
    },
    margin: { top: 60 },
    didDrawPage: () => {
      doc.setFont('Amiri');
      doc.setFontSize(16);
      doc.text('قائمة المستشارين', doc.internal.pageSize.getWidth() - 40, 30, {
        align: 'right',
      });
    },
  });

  doc.save('جدول-المستشارين.pdf');
}




}
