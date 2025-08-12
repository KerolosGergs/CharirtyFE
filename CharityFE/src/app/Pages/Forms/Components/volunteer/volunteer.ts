import { TostarServ } from './../../../../Shared/tostar-serv';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { VolunteerService } from './service/VolunteerService';
import { Volunteer } from './model/IVolunteer';
import { Footer } from "../../../../Shared/footer/footer";
import { Spinner } from "../../../../Shared/spinner/spinner";
import { HeaderComponent } from "../../../Home/Components/header-component/header-component";
import { HeaderComponentConsultant } from "../../../Consultant/Components/header-component-consultant/header-component-consultant";
import { Nav } from "../../../Home/Components/nav/nav";
import { ContactInfoComponent } from "../contact-info/contact-info";

export function minTwoWordsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const words = control.value.trim().split(/\s+/);
    return words.length >= 2 ? null : { minTwoWords: true };
  };
}
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
      fullName: ['', [Validators.required, minTwoWordsValidator()]],
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
      const fullName = this.volunteerForm.value.fullName.trim();
      const nameParts = fullName.split(/\s+/);
      const firstName = nameParts.shift() || '';
      const lastName = nameParts.join(' ') || '';

      const formData: Volunteer = {
        firstName,
        lastName,
        email: this.volunteerForm.value.email,
        phoneNumber: this.volunteerForm.value.phoneNumber,
        dateOfBirth: this.volunteerForm.value.dateOfBirth,
        address: this.volunteerForm.value.address,
        education: this.volunteerForm.value.education
      };

      this.volunteerService.submitVolunteerForm(formData).subscribe({
        next: (response) => {
          if (response.success === false) {
            this.TostarServ.showError('هذا الايميل لديه طلب بالفعل');
          } else {
            this.TostarServ.showSuccess('تم إرسال طلب التطوع بنجاح!');
            this.volunteerForm.reset();
          }
        },
        error: () => {
          this.TostarServ.showError('خطاء في ارسال طلب التطوع');
        }
      });
    }
  }
}