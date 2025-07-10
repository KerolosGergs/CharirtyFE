import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Nav } from '../Home/Components/nav/nav';
import { HeaderComponent } from '../Home/Components/header-component/header-component';
import { Footer } from '../../Shared/footer/footer';
import { Advisor } from '../../Core/Services/advisor';
import { advisor } from '../../Core/Interfaces/advisor';
import { Appointment } from '../../Core/Interfaces/advisor';

@Component({
  selector: 'app-advisor-details',
  standalone: true,
  imports: [RouterLink, CommonModule, Nav, HeaderComponent, Footer],
  templateUrl: './advisor-details.html',
  styleUrl: './advisor-details.scss'
})
export class AdvisorDetails implements OnInit {
  
  advisorData: advisor = {
    id: 0,
    fullName: '',
    description: '',
    specialty: '',
    email: '',
    phoneNumber: '',
    isAvailable: false,
    consultationName: '',
    totalConsultations: 0,
    pendingRequests: 0,
    averageRating: 0,
    zoomRoomUrl: '',
    consultationId: 0,
    userId: '',
    userName: '',
    firstName: '',
    lastName: '',
    isActive: false,
    createdAt: '',
    updatedAt: ''
  };

  appointments: Appointment[] = [];

  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private advisorService: Advisor
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.route.queryParams.subscribe(params => {
      const advisorId = params['id'];
      if (advisorId) {
        this.loadAdvisorData(parseInt(advisorId));
      } else {
        this.error = 'لم يتم تحديد المستشار';
        this.isLoading = false;
      }
    });
  }

  loadAdvisorData(advisorId: number): void {
    this.isLoading = true;
    this.error = null;

    this.advisorService.getAdvisorById(advisorId).subscribe({
      next: (response) => {
        if (response && response.success) {
          this.advisorData = response.data;
          // جلب المواعيد المتاحة بعد تحميل بيانات المستشار
          this.advisorService.getAvailableAppointments(advisorId).subscribe({
            next: (appointments) => {
              this.appointments = appointments;
            },
            error: (err) => {
              console.error('Error loading appointments:', err);
              this.appointments = [];
            }
          });
        } else {
          this.error = 'فشل في تحميل بيانات المستشار';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading advisor data:', err);
        this.error = 'حدث خطأ في تحميل بيانات المستشار';
        this.isLoading = false;
      }
    });
  }

  getRatingStars(): string {
    const rating = this.advisorData.averageRating || 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(emptyStars);
  }
}
