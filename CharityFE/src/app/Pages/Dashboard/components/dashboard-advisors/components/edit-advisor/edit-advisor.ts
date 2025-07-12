import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { advisor, ICreateAdvisorMinimal } from '../../../../../../Core/Interfaces/advisor';
import { Advisor } from '../../../../../../Core/Services/advisor';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-advisor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-advisor.html',
  styleUrl: './edit-advisor.scss'
})
export class EditAdvisor {
  consultantForm!: FormGroup;
  advisorId!: number;

  private fb = inject(FormBuilder);
  private _advisor = inject(Advisor);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.initializeForm();

    // Get ID from route
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.advisorId = +idParam;
        this.loadAdvisor(this.advisorId);
      }
    });
  }

  initializeForm(): void {
    this.consultantForm = this.fb.group({
      fullName: [null, [Validators.required, Validators.maxLength(50)]],
      specialty: [null, [Validators.required, Validators.maxLength(100)]],
      phoneNumber: [null, [Validators.required, Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  loadAdvisor(id: number): void {
    this._advisor.getAdvisorById(id).subscribe({
      next: (res) => {
        const advisor: advisor = res.data;
        this.patchForm(advisor);
      },
      error: (err) => {
        console.error('❌ Failed to load advisor:', err);
      }
    });
  }

  patchForm(advisor: advisor): void {
    this.consultantForm.patchValue({
      fullName: advisor.fullName || '',
      specialty: advisor.specialty || '',
      phoneNumber: advisor.phoneNumber || '',
      email: advisor.email || ''
    });
  }

  onSubmit(): void {
    if (this.consultantForm.invalid || !this.advisorId) {
      console.warn('❌ Form invalid or missing advisor ID:', this.consultantForm.errors);
      this.consultantForm.markAllAsTouched();
      return;
    }

    const payload: Partial<ICreateAdvisorMinimal> = {
      fullName: this.consultantForm.value.fullName,
      specialty: this.consultantForm.value.specialty,
      phoneNumber: this.consultantForm.value.phoneNumber,
      email: this.consultantForm.value.email,
    };

    this._advisor.updateAdvisor(this.advisorId, payload).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('✅ Advisor updated:', res);
          this.router.navigate(['/dashboard/dashboard-advisors']);
        } else {
          console.error('❌ Update error:', res.message);
        }
      },
      error: (err) => {
        console.error('❌ API Error:', err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard/dashboard-advisors']);
  }
}
