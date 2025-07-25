import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IReconcileRequestDTO } from '../../../../Core/Interfaces/ireconcilerequest';
import { Reconcilerequest } from '../../../../Core/Services/reconcilerequest';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-reconcile-main',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reconcile-main.html',
  styleUrl: './reconcile-main.scss'
})
export class ReconcileMain implements OnInit {
  requests: IReconcileRequestDTO[] = [];
  searchText: string = '';
  sections: string[] = ['الكل', 'موافقة', 'مرفوضة', 'بانتظار المراجعة'];
  selectedSection: string = 'الكل';

  constructor(private reconcileService: Reconcilerequest) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.reconcileService.getAll().subscribe({
      next: (res) => {
        if (res.success) {
          this.requests = res.data;
        }
      },
      error: (err) => console.error('فشل تحميل الطلبات', err)
    });
  }

 get filteredRequests(): IReconcileRequestDTO[] {
  return this.requests.filter(r => {
    const matchesSection = this.selectedSection === 'الكل'; // No status field, so default match
    const search = this.searchText.toLowerCase();
    const matchesSearch =
      r.name?.toLowerCase().includes(search) ||
      r.email?.toLowerCase().includes(search) ||
      r.phoneNumber?.includes(search) ||
      r.requestText?.toLowerCase().includes(search);

    return matchesSection && matchesSearch;
  });
}

  selectSection(section: string): void {
    this.selectedSection = section;
  }

  deleteRequest(request: IReconcileRequestDTO): void {
    if (confirm(`هل أنت متأكد من حذف الطلب المقدم من ${request.name}؟`)) {
      this.reconcileService.deleteById(request.id).subscribe({
        next: (res) => {
          if (res.success) {
            this.requests = this.requests.filter(r => r.id !== request.id);
          }
        },
        error: (err) => console.error('فشل حذف الطلب', err)
      });
    }
  }
}