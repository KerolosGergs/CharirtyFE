import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Nav } from '../Home/Components/nav/nav';
import { HeaderComponent } from '../Home/Components/header-component/header-component';
import { Footer } from '../../Shared/footer/footer';
import { Advisor } from '../../Core/Services/advisor';
import { advisor } from '../../Core/Interfaces/advisor';
import { ToastrService } from 'ngx-toastr';


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
    updatedAt: '',
    imageUrl:''
  };


  isLoading: boolean = true;
  error: string | null = null;
  tostar = inject(ToastrService);
  constructor(
    private route: ActivatedRoute,
    private advisorService: Advisor
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const advisorId = params['id'];
      if (advisorId) {
        this.loadAdvisorData(parseInt(advisorId));
      } else {
        this.tostar.error('لم يتم تحديد المستشار');
        // this.error = 'لم يتم تحديد المستشار';
        this.isLoading = false;
      }
    });
  }

  loadAdvisorData(advisorId: number): void {
    this.isLoading = true;
    this.error = null;

    this.advisorService.getAdvisorById(advisorId).subscribe({
      next: (response) => {
        if (response.success) {
          this.advisorData = response.data;
          // جلب المواعيد المتاحة بعد تحميل بيانات المستشار
          this.advisorService.getAvailableAppointments(advisorId).subscribe({
            next: (appointments) => {
              // this.appointments = appointments;
            },
            error: (err) => {
              console.error('Error loading appointments:', err);
            
            }
          });
        } else {
        // this.tostar.error(response.message);
        }
        this.isLoading = false;
      },
      error: (err) => {
        // this.tostar.error(err.error.message);
        console.error('Error loading advisor data:', err);
        this.error = 'حدث خطأ في تحميل بيانات المستشار';
        this.isLoading = false;
      }
    });
  }

}
