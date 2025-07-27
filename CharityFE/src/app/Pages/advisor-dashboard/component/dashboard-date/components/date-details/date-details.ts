import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IAdvisorAvailability } from '../../../../../../Core/Interfaces/iavailability';
import { Availability } from '../../../../../../Core/Services/availability';

@Component({
  selector: 'app-date-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-details.html',
  styleUrl: './date-details.scss'
})
export class DateDetails {
  availability!: IAdvisorAvailability;
  consultationTypeLabel = '';
  availabilityId!: number;

  constructor(
    private route: ActivatedRoute,
    private availabilityService: Availability,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['slot']) {
      this.availability = navigation.extras.state['slot'];
      this.availabilityId = this.availability.id;
      this.consultationTypeLabel = this.mapConsultationType(this.availability.consultationType);
    }
  }

  ngOnInit(): void {
    if (!this.availability) {
      this.availabilityId = Number(this.route.snapshot.paramMap.get('id'));
      this.availabilityService.getAvailabilityById(this.availabilityId).subscribe({
        next: (res) => {
          console.log(res);
          this.availability = res;
          this.consultationTypeLabel = this.mapConsultationType(res.consultationType);
        },
        error: (err) => {
          console.error('Failed to load availability:', err);
        }
      });
    }
  }

  mapConsultationType(type: number): string {
    switch (type) {
      case 0: return 'اونلاين';
      case 1: return 'حضوري';
      case 2: return 'كلاهما';
      default: return 'غير معروف';
    }
  }

  deleteAvailability(): void {
    if (!this.availabilityId) return;

    if (confirm('هل أنت متأكد من حذف هذا الموعد؟')) {
      this.availabilityService.deleteAvailability(this.availabilityId).subscribe({
        next: (res) => {
          console.log(res);          
          alert('تم حذف الموعد بنجاح');
          this.router.navigate(['/advisor-dashboard/dashboard-date']);
        },
        error: (err) => {
          console.error('Error deleting availability:', err);
        }
      });
    }
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  formatTime(timeStr: string): string {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(+hours, +minutes);
    return date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: true });
  }
}
