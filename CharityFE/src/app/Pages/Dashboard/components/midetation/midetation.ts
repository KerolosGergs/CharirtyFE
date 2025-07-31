import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Advisor } from '../../../../Core/Services/advisor';
import { advisor, IAdvisorResponse, ICategory } from '../../../../Core/Interfaces/advisor';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TostarServ } from '../../../../Shared/tostar-serv';
import { IMeditation, IMeditationResponse } from '../../../../Core/Interfaces/imeditaion';
import { MidetationServ } from '../../../../Core/Services/MidetationService/midetation-serv';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CairoFontBase64 } from '../../../../Core/Services/textEncode/cairo-font';
import { AmiriFontBase64 } from '../../../../Core/Services/textEncode/AmiriFontBase64';

@Component({
  selector: 'app-midetation',
  imports: [RouterLink, CommonModule],
  templateUrl: './midetation.html',
  styleUrl: './midetation.scss'
})
export class Midetation implements OnInit {
  midetation: IMeditationResponse | null = null;
  filteredMeditations: IMeditation[] = [];
  isLoadingMidetations: boolean = true;
  _Meditation = inject(MidetationServ);
  _router = inject(Router)
  isOpen = false;
  isOpenEdit = false;
  isOpenDetails = false;

  selectedAdvisor!: advisor;
  tostar = inject(TostarServ);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.loadAdvisors()
  }
  loadAdvisors(): void {
    this.isLoadingMidetations = true;
    this._Meditation.getAllmidetations().subscribe({
      next: (data) => {
        console.log(data);
        if (data && data.success) {
          this.midetation = data;
          this.filteredMeditations = data.data;
        }
        this.isLoadingMidetations = false;
      },
      error: () => {
        this.isLoadingMidetations = false;
      }
    });
  }


  openCreateNew() {
    this._router.navigate(['dashboard/dashboard-midetation-new']);
  }




  deleteMeditation(ID: number) {

    this._Meditation.deletemidetation(ID).subscribe({
      next: (res) => {
        if (res.success) {
          this.tostar.showSuccess('تم حذف المستشار بنجاح');
          // console.log('Advisor deleted successfully:', res);
          this.loadAdvisors();

        } else {
          this.tostar.showError('خطاء في حذف المستشار');
          console.error('Error deleting advisor:', res);
        }
      },
      error: (err) => {
        this.tostar.showError('تأكد من أتصالك بالأنترنت');

        console.error('Error deleting advisor:', err);
      }
    })
  }
  loadAdvisorDetails(id: number): void {
    this._Meditation.getMidetationById(id).subscribe({
      next: (data) => {
        console.log('Advisor Details:', data);

        this._router.navigate
      },
      error: (err) => {
        console.error('Error loading advisor details:', err);
      }
    });
  }
exportToPdf(): void {
  if (!isPlatformBrowser(this.platformId)) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  // ✅ Register Arabic font
  doc.addFileToVFS('Amiri-Regular.ttf', AmiriFontBase64);
  doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
  doc.setFont('Amiri');
  doc.setFontSize(14);

  // ✅ Format date to DD/MM/YYYY
  const formatArabicDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, '0')}/${
      (date.getMonth() + 1).toString().padStart(2, '0')
    }/${date.getFullYear()}`;
  };

  // ✅ Prepare body (no head row!)
  const body =
    this.midetation?.data?.map((item) => [
      formatArabicDate(item.createdAt),
      item.isActive ? 'نشط' : 'غير نشط',
      item.email,
      item.fullName,
    ]) || [];

  // ✅ AutoTable with no headers
  autoTable(doc, {
    body,
    styles: {
      font: 'Amiri',
      fontSize: 12,
      halign: 'right',
    },
    columnStyles: {
      0: { halign: 'right' }, // التاريخ
      1: { halign: 'right' }, // الحالة
      2: { halign: 'right' }, // البريد الإلكتروني
      3: { halign: 'right' }, // الاسم
    },
    margin: { top: 60 },
    didDrawPage: () => {
      doc.setFont('Amiri');
      doc.setFontSize(16);
      doc.text('قائمة المستشارين', doc.internal.pageSize.getWidth() - 40, 30, {
        align: 'right',
      });
    },
    showHead: 'never', // ✅ Disable auto-generated header
  });

  doc.save('جدول-المستشارين.pdf');
}



}
