import { TostarServ } from './../../../../Shared/tostar-serv';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { VolunteerService } from './service/VolunteerService';
import { Volunteer } from './model/IVolunteer';
import { Footer } from "../../../../Shared/footer/footer";
import { Spinner } from "../../../../Shared/spinner/spinner";
import { HeaderComponent } from "../../../Home/Components/header-component/header-component";
import { HeaderComponentConsultant } from "../../../Consultant/Components/header-component-consultant/header-component-consultant";
import { Nav } from "../../../Home/Components/nav/nav";
import { ContactInfoComponent } from "../contact-info/contact-info";

@Component({
  imports: [Footer, Spinner, HeaderComponent, Nav, HeaderComponentConsultant, ReactiveFormsModule, FormsModule, ContactInfoComponent],
  templateUrl: './volunteer.html',
  styleUrl: './volunteer.scss'
})
export class VolunteerComponent implements OnInit {
volunteerForm: FormGroup;
  title = 'طلب التطوع';
  description = 'قدم بياناتك للانضمام إلى فريق التطوع';
  formSection = { title: 'نموذج التطوع' };
  TostarServ = inject(TostarServ);

  constructor(private fb: FormBuilder, private volunteerService: VolunteerService) {
    this.volunteerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: ['', Validators.required],
      education: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.volunteerForm.valid) {
      const formData: Volunteer = this.volunteerForm.value;
      this.volunteerService.submitVolunteerForm(formData).subscribe({
        next: (response) => {
          if(response.success === false){
            this.TostarServ.showError('هذا الايميل لديه طلب بالفعل');
          }else{
            this.TostarServ.showSuccess('تم إرسال طلب التطوع بنجاح!');
            this.volunteerForm.reset();

          }
          
        },
        error: (error) => {
          this.TostarServ.showError('خطاء في ارسال طلب التطوع');
        }
      });
    }
  }
}