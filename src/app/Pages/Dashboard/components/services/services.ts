import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IServiceOfferingDTO } from '../../../../Core/Interfaces/iservice';
import { Service } from '../../../../Core/Services/service';

@Component({
  selector: 'app-services',
  templateUrl: './services.html',
  styleUrls: ['./services.scss']
})
export class ServicesComponent implements OnInit {
  serviceOfferings: IServiceOfferingDTO[] = [];
  loading = false;

  constructor(
    private serviceOfferingService: Service,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.loading = true;
    this.serviceOfferingService.getAll().subscribe({
      next: (res) => {
        console.log(res);
        console.log(res.data);
        
        this.serviceOfferings = res.data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
        
        alert('حدث خطأ أثناء تحميل الخدمات');
      }
    });
  }

  addService(): void {
    this.router.navigate(['/dashboard/dashboard-new-services']);
  }

  editService(service: IServiceOfferingDTO): void {
    this.router.navigate(['/dashboard/dashboard-edit-services', service.id]);
  }

  deleteService(service: IServiceOfferingDTO): void {
    if (confirm(`هل أنت متأكد من حذف الخدمة "${service.name}"؟`)) {
      this.serviceOfferingService.delete(service.id).subscribe({
        next: () => {
          this.serviceOfferings = this.serviceOfferings.filter(s => s.id !== service.id);
        },
        error: () => alert('فشل في حذف الخدمة')
      });
    }
  }
}
