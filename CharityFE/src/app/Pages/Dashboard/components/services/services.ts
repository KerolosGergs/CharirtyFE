import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IServiceOfferingDTO, IUpdateServiceOfferingDTO, ServiceItem } from '../../../../Core/Interfaces/ServiceOffering/iservice';
import { Service } from '../../../../Core/Services/ServiceOffering/service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-services',
  imports:[ReactiveFormsModule,FormsModule],
  templateUrl: './services.html',
  styleUrls: ['./services.scss']
})
export class ServicesComponent implements OnInit {
  serviceOfferings!: IServiceOfferingDTO;
  filteredItems: ServiceItem[] = [];
  displayedItems: ServiceItem[] = [];

  loading = false;
  editForm!: FormGroup;

  // filter + pagination
  filter: 'all' | 'active' | 'inactive' = 'all';
  currentPage = 1;
  pageSize = 6;
  totalPages = 1;

  constructor(
    private serviceOfferingService: Service,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.loading = true;
    this.serviceOfferingService.getAll().subscribe({
      next: (res) => {
        this.serviceOfferings = res.data;

        this.editForm = this.fb.group({
          title: [this.serviceOfferings.title || '', [Validators.required, Validators.maxLength(100)]],
          description: [this.serviceOfferings.description || '', [Validators.required, Validators.maxLength(500)]]
        });

        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.toastr.error('فشل تحميل البيانات');
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    const items = this.serviceOfferings.serviceItem;

    this.filteredItems = this.filter === 'all'
      ? items
      : items.filter(i => this.filter === 'active' ? i.isActive : !i.isActive);

    this.totalPages = Math.ceil(this.filteredItems.length / this.pageSize);
    this.currentPage = 1;
    this.paginate();
  }

  paginate(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedItems = this.filteredItems.slice(start, end);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginate();
    }
  }

  changeFilter(value: 'all' | 'active' | 'inactive'): void {
    this.filter = value;
    this.applyFilters();
  }

  updateServiceOffering(): void {
    if (this.editForm.invalid) {
      this.toastr.error('تأكد من صحة البيانات');
      return;
    }

    const updateData: IUpdateServiceOfferingDTO = this.editForm.value;

    this.serviceOfferingService.updateMainOffering(updateData).subscribe({
      next: () => {
        this.toastr.success('تم تحديث البيانات بنجاح');
        this.serviceOfferings.title = updateData.title;
        this.serviceOfferings.description = updateData.description;
      },
      error: () => {
        this.toastr.error('فشل التحديث');
      }
    });
  }

  addService(): void {
    this.router.navigate(['/dashboard/dashboard-new-services']);
  }

  editService(service: ServiceItem): void {
    this.router.navigate(['/dashboard/dashboard-edit-services', service.id]);
  }

  deleteService(service: ServiceItem): void {
    if (confirm(`هل أنت متأكد من حذف الخدمة "${service.name}"؟`)) {
      this.serviceOfferingService.deleteItem(service.id).subscribe({
        next: () => {
          this.serviceOfferings.serviceItem = this.serviceOfferings.serviceItem.filter(s => s.id !== service.id);
          this.toastr.success('تم حذف الخدمة بنجاح');
          this.applyFilters();
        },
        error: () => this.toastr.error('فشل في حذف الخدمة')
      });
    }
  }
}