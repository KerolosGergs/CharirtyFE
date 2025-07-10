// import { Component, inject, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { VolunteerService } from '../../services/volunteer.service';
// import { CommonModule } from '@angular/common';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatNativeDateModule } from '@angular/material/core';

// @Component({
//   selector: 'app-volunteer-application',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     MatDatepickerModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatNativeDateModule
//   ],
//   templateUrl: './volunteer-application.component.html',
//   styleUrls: ['./volunteer-application.component.scss']
// })
// export class VolunteerApplicationComponent implements OnInit {
//   volunteerForm!: FormGroup;
//   isSubmitting = false;
//   submitSuccess = false;
//   submitError = '';
// volunteerService = inject(VolunteerService)

//   constructor(
//     private fb: FormBuilder,
//   ) {}

//   ngOnInit(): void {
//     this.volunteerForm = this.fb.group({
//       firstName: ['', [Validators.required, Validators.maxLength(50)]],
//       lastName: ['', [Validators.required, Validators.maxLength(50)]],
//       email: ['', [Validators.required, Validators.email]],
//       phoneNumber: ['', [Validators.required, Validators.maxLength(20)]],
//       dateOfBirth: ['', Validators.required],
//       address: ['', [Validators.required, Validators.maxLength(200)]],
//       education: ['', [Validators.required, Validators.maxLength(100)]]
//     });
//   }

//   onSubmit() {
//     this.submitSuccess = false;
//     this.submitError = '';
//     if (this.volunteerForm.invalid) {
//       this.volunteerForm.markAllAsTouched();
//       return;
//     }
//     this.isSubmitting = true;
//     this.volunteerService.submitApplication(this.volunteerForm.value)
//       .subscribe({
//         next: () => {
//           this.submitSuccess = true;
//           this.volunteerForm.reset();
//         },
//         error: () => {
//           this.submitError = 'حدث خطأ أثناء الإرسال. حاول مرة أخرى.';
//         }
//       }).add(() => this.isSubmitting = false);
//   }
// }
