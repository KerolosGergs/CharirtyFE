import { AddAdminService,Iuser } from './../../service/AddAdminService';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

// استخدم واجهتك/إنترفيس الموجودة (عدّل المسار لو مختلف)

// استخدم خدمتك الموجودة (عدّل المسار واسم الدالة لو مختلف)

import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AmiriFontBase64 } from '../../../../../../Core/Services/textEncode/AmiriFontBase64';

interface FilterOptions {
  searchTerm: string;
}

interface PaginationInfo {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
@Component({
  selector: 'app-admin-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-list.html',
  styleUrl: './admin-list.scss'
})
export class AdminList implements OnInit{
 private api = inject(AddAdminService);
  private toastr = inject(ToastrService);

  users: Iuser[] = [];
  filteredUsers: Iuser[] = [];

  loading = false;

  filter: FilterOptions = {
    searchTerm: ''
  };

  pagination: PaginationInfo = {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 0,
    totalPages: 0
  };

  async ngOnInit(): Promise<void> {
   await this.loadUsers(); // UPDATED: تحميل من الخدمة
  }

  // UPDATED: جلب البيانات من API
  loadUsers(): void {
    this.loading = true;
    this.api.GetAdminData().subscribe({
      next: (res: any) => {
        const data: Iuser[] = Array.isArray(res) ? res
          : Array.isArray(res?.data) ? res.data
          : [];
        this.users = data;
        this.applyFilters();
        this.loading = false;
        // this.toastr.success('تم تحميل قائمة المستخدمين');
      },
      error: _ => {
        this.loading = false;
        // this.toastr.error('فشل في تحميل قائمة المستخدمين');
      }
    });
  }

  // UPDATED: فلترة بسيطة على الاسم/الإيميل/الهاتف
  applyFilters(): void {
    const term = this.filter.searchTerm?.toLowerCase() ?? '';
    let result = [...this.users];

    if (term) {
      result = result.filter(u =>
        String(u.fullName ?? '').toLowerCase().includes(term) ||
        String(u.email ?? '').toLowerCase().includes(term) ||
        String(u.phoneNumber ?? '').toLowerCase().includes(term)
      );
    }

    this.filteredUsers = result;
    this.updatePagination();
  }

  // UPDATED: تحديث بيانات الترقيم
  updatePagination(): void {
    this.pagination.totalItems = this.filteredUsers.length;
    this.pagination.totalPages = Math.ceil(this.pagination.totalItems / this.pagination.itemsPerPage) || 1;
    if (this.pagination.currentPage > this.pagination.totalPages) {
      this.pagination.currentPage = 1;
    }
  }

  // UPDATED: إرجاع بيانات الصفحة الحالية
  getPaginatedUsers(): Iuser[] {
    const start = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
    return this.filteredUsers.slice(start, start + this.pagination.itemsPerPage);
  }

  // UPDATED: تغيير الصفحة
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.pagination.totalPages) {
      this.pagination.currentPage = page;
    }
  }

  // UPDATED: أرقام الصفحات
  getPageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.pagination.totalPages; i++) pages.push(i);
    return pages;
  }

  // UPDATED: عند تغيير قيمة البحث
  onFilterChange(): void {
    this.pagination.currentPage = 1;
    this.applyFilters();
  }

  // UPDATED: تصدير PDF بثلاث أعمدة فقط
  exportToPdf(): void {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    doc.addFileToVFS('Amiri-Regular.ttf', AmiriFontBase64);
    doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
    doc.setFont('Amiri').setFontSize(14);

    const head = [['الاسم', 'البريد الإلكتروني', 'رقم الهاتف']];
    const body = this.getPaginatedUsers().map(u => [
      u.fullName ?? '',
      u.email ?? '',
      u.phoneNumber ?? ''
    ]);

    autoTable(doc, {
      head: head,
      body: body,
      styles: { font: 'Amiri', fontSize: 12, halign: 'right' },
      margin: { top: 60 },
      didDrawPage: () => {
        doc.setFont('Amiri').setFontSize(16);
        doc.text('قائمة المستخدمين', doc.internal.pageSize.getWidth() - 40, 30, { align: 'right' });
      }
    });

    doc.save('قائمة-المستخدمين.pdf');
    this.toastr.info('تم تصدير الملف بنجاح');
  }
}