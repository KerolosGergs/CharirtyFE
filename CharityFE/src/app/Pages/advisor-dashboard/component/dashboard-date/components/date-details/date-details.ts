import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { IAdvisorAvailability } from '../../../../../../Core/Interfaces/iavailability';
import { Availability } from '../../../../../../Core/Services/availability';

@Component({
  selector: 'app-date-details',
  imports: [CommonModule],
  templateUrl: './date-details.html',
  styleUrl: './date-details.scss'
})
export class DateDetails {
   availability?: IAdvisorAvailability;
  consultationTypeLabel = '';
  availabilityId! : any

  constructor(
    private route: ActivatedRoute,
    private availabilityService: Availability,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.availabilityId = Number(this.route.snapshot.paramMap.get('id'))
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    this.availabilityService.getAvailabilityById(this.availabilityId).subscribe({
      next: (res) => {
        console.log(res);
        
        this.availability = res;
        this.consultationTypeLabel = this.mapConsultationType(res.consultationType);
      }
    });
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
  // if (!this.availability || this.availability.id === undefined || this.availability.id === null) {
  //   console.error('Invalid availability or missing ID:', this.availability);
  //   return;
  // }

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
