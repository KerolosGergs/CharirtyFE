import { AuthServ } from './../../../../Auth/Services/auth-serv';
import { Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule, NgClass, NgStyle, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Advicereques, GetRequests, IAdviceRequestDTO } from '../../../../Core/Services/advicereques';

@Component({
  selector: 'app-dashboard-main',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule],
  templateUrl: './dashboard-main.html',
  styleUrl: './dashboard-main.scss'
})
export class DashboardMain implements OnInit {
  adviceRequests: (GetRequests & { showActions?: boolean })[] = [];
  filteredRequests: (GetRequests & { showActions?: boolean })[] = [];
  searchTerm: string = '';
  selectedType: string = '';
  selectedDate: string = '';
  advisorId!: number; 
  authServ =inject(AuthServ);
  cards = [
    {
      name: 'عدد الاستشارات',
      number: '600,532',
      icon: 'bi-mic',
      bgColor: '#FFF5EB'
    },
    {
      name: 'عدد الخدمات',
      number: '600,532',
      icon: 'bi-grid',
      bgColor: '#EDF8ED'
    },
    {
      name: 'عدد المستشارين',
      number: '600,532',
      icon: 'bi-people',
      bgColor: '#EDF4FA'
    }
  ];


  constructor(
    private adviceService: Advicereques,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {

      this.advisorId = +this.authServ.getId();
      if (!this.advisorId) {
        console.error('advisorId not found in localStorage');
        return;
      }
      this.fetchAdvisorRequests(this.advisorId);
    
  }

  fetchAdvisorRequests(advisorId: number): void {
  this.adviceService.getRequestsForAdvisor(advisorId).subscribe({
    next: (res) => {
      console.log(res);
      
      const responseData = res?.data || [];
      this.adviceRequests = responseData.map((r: GetRequests) => ({ ...r, showActions: false }));
      this.filteredRequests = [...this.adviceRequests];
    },
    error: (err) => {
      console.error('Failed to fetch advisor requests:', err);
    }
  });
}


  filterRequests(): void {
  const term = this.searchTerm.toLowerCase();

  this.filteredRequests = this.adviceRequests.filter(r => {
    const matchesTitle = r.notes?.toLowerCase().includes(term);

    const matchesType =
      this.selectedType !== ''
        ? (this.selectedType === '0' && r.consultationId === 0) ||
          (this.selectedType === '1' && r.consultationId === 1)
        : true;

    const matchesDate =
      this.selectedDate
        ? r.appointmentTime?.toString().slice(0, 10) === this.selectedDate
        : true;

    return matchesTitle && matchesType && matchesDate;
  });
}

onSearchChange(): void {
  this.filterRequests();
}

onTypeChange(): void {
  this.filterRequests();
}

onDateChange(): void {
  this.filterRequests();
}

  toggleActions(index: number): void {
    this.filteredRequests.forEach((req, i) => {
      req.showActions = i === index ? !req.showActions : false;
    });
  }

  viewDetails(request: GetRequests): void {
    console.log('Request details:', request);
    // Navigate or show modal
  }

  deleteRequest(requestId: number): void {
    if (confirm('هل أنت متأكد من حذف هذه الاستشارة؟')) {
      this.adviceService.cancelRequest(requestId).subscribe({
        next: () => {
          this.adviceRequests = this.adviceRequests.filter(r => r.id !== requestId);
          this.filteredRequests = this.filteredRequests.filter(r => r.id !== requestId);
        },
        error: (err) => console.error('فشل في حذف الاستشارة:', err)
      });
    }
  }

  trackById(index: number, item: IAdviceRequestDTO): number {
    return item.id;
  }
}
