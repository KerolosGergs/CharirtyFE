import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
export class ReconcileMain {
  requests: IReconcileRequestDTO[] = [];
  searchText: string = '';

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
      error: (err) => console.error('Failed to load requests', err)
    });
  }

  get filteredRequests(): IReconcileRequestDTO[] {
    return this.requests.filter(r =>
      r.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      r.email.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  deleteRequest(request: IReconcileRequestDTO): void {
    if (confirm(`هل أنت متأكد من حذف الطلب المقدم من ${request.name}؟`)) {
      this.reconcileService.deleteById(request.id).subscribe({
        next: (res) => {
          if (res.success) {
            this.requests = this.requests.filter(r => r.id !== request.id);
          }
        },
        error: (err) => console.error('Failed to delete request', err)
      });
    }
  }

}
