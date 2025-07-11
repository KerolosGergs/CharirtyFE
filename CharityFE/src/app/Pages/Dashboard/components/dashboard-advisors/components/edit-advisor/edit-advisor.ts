import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { advisor, ICreateAdvisorMinimal } from '../../../../../../Core/Interfaces/advisor';
import { Advisor } from '../../../../../../Core/Services/advisor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-advisor',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-advisor.html',
  styleUrl: './edit-advisor.scss'
})
export class EditAdvisor {
  @Input() isOpenC!: boolean;
 @Input() Selectedadvisor!: advisor;

  consultantForm!: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  private _advisor = inject(Advisor);

  constructor(private fb: FormBuilder) {}
 ngOnInit(): void {
    this.initializeForm();
  }
  
   ngOnChanges(changes: SimpleChanges): void {
    if (changes['Selectedadvisor'] && this.Selectedadvisor && this.consultantForm) {
      this.patchForm(this.Selectedadvisor);
    }
  }

initializeForm(): void {
    this.consultantForm = this.fb.group({
      fullName: [null, [Validators.required, Validators.maxLength(50)]],
      specialty: [null, [Validators.required, Validators.maxLength(100)]],
      phoneNumber: [null, [Validators.required, Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
   
    });
  }

  patchForm(advisor: advisor): void {
    if (!this.consultantForm) return;

    this.consultantForm.patchValue({
      fullName: advisor.fullName || '',
      specialty: advisor.specialty || '',
      phoneNumber: advisor.phoneNumber || '',
      email: advisor.email || ''
    });
  }



  onSubmit(): void {
    if (this.consultantForm.invalid) {
      console.warn('Form invalid:', this.consultantForm.errors, this.consultantForm.value);
      this.consultantForm.markAllAsTouched(); // helpful to show validation errors
      return;
    }

    const formData = this.consultantForm.value;

    const payload: ICreateAdvisorMinimal = {
      fullName: formData.fullName,
      specialty: formData.specialty,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      password: formData.password,
      Description: formData.description,
      ZoomRoomUrl: formData.zoomUrl
    };

    this._advisor.createNewAdvisor(payload).subscribe({
      next: (res) => {
        if(res.success)
        {
          this.consultantForm.reset();
          console.log('✅ Advisor created successfully:', res);
          this.isOpenC = false;
         
        }else {
          console.error('❌ Error creating advisor:', res);
          
        }

      },
      error: (err) => {
        console.error('❌ Error creating advisor:', err);
      }
    });
  }

  onCancel(): void {
    this.isOpenC = false;
    this.consultantForm.reset();
  }
}
