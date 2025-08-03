import { advisor } from './../../../../Core/Interfaces/advisor';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { AdvisorAvailabilityManagerComponent } from "../advisor-availability-manager/advisor-availability-manager/advisor-availability-manager.component";
import { IAdvisorResponse, ICategory } from '../../../../Core/Interfaces/advisor';
import { Advisor } from '../../../../Core/Services/advisor';
import { ToastrService } from 'ngx-toastr';
import { TakeAppointment } from '../../../../Core/Interfaces/iappointment';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../../../../Core/Services/User/appointment';

@Component({
  selector: 'app-reservation-form',
  imports: [AdvisorAvailabilityManagerComponent ,ReactiveFormsModule],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.scss'
})
export class ReservationForm implements OnInit{
  appointmentDateTime: { timeId: number ,type:number} | null = null;
  categories: ICategory[] = [];
  selectedCategoryId: number | null = null;
  isLoadingCategories: boolean = true;
  advisorId :number = 0 
  constructor(private route: ActivatedRoute,) {}
  private _advisor = inject(Advisor);
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);
  private Advice = inject(Appointment);
  private router = inject(Router)
  form: FormGroup = this.fb.group({
    notes: ['', ]
  });

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoadingCategories = true;
    this._advisor.getCategories().subscribe({
      next: (data) => {
        if (data && data.success) {
          this.categories = data.data;
        }
        this.isLoadingCategories = false;
      },
      error: () => {
        this.isLoadingCategories = false;
      }
    });
  }

  selectCategory(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
  }

  isCategorySelected(categoryId: number | null): boolean {
    return this.selectedCategoryId === categoryId;
  }

  onAppointmentChange(event: {  timeId: number ,type:number}) {
    this.appointmentDateTime = event;

  }

  isFormValid(): boolean {
    return this.selectedCategoryId !== null &&
           this.form.valid &&
           this.appointmentDateTime !== null;
  }

  submitForm() {
  this.route.queryParams.subscribe(params => {
    this.advisorId = parseInt(params['id'], 10);
  });

  if (!this.isFormValid()) {
    this.toastr.error('يرجى تعبئة جميع الحقول');
    return;
  }


  const requestBody: TakeAppointment = {
    consultationId: this.selectedCategoryId!,
    title: 'عنوان الاستشارة',
    description: this.form.value.notes,
    priority: 'عادية',
    consultationType:this.appointmentDateTime?.type!,
    advisorAvailabilityId: this.appointmentDateTime!.timeId
  };
  this.Advice.createAdviceRequest(requestBody).subscribe(
    (response) => {
      if(response.success == false) this.toastr.error('حدث خطاء في الحجز تأكد من أتصالاك بالأنترنت');
      this.toastr.success('تم الحجز بنجاح');
      this.router.navigate(['/home']);
  
      // console.log('API response:', response);
    },
    (error) => {
      this.toastr.error('حدث خطاء في الحجز تأكد من أتصالاك بالأنترنت');
    }
  );
}
convertToTimeSpan(time12h: string): string | null {
  if (!time12h) return null;

  const [time, modifier] = time12h.trim().split(' ');
  if (!time || !modifier) return null;

  let [hours, minutes] = time.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) return null;

  if (modifier.toUpperCase() === 'PM' && hours < 12) hours += 12;
  if (modifier.toUpperCase() === 'AM' && hours === 12) hours = 0;

  const hh = hours.toString().padStart(2, '0');
  const mm = minutes.toString().padStart(2, '0');
  return `${hh}:${mm}:00`;
}

}