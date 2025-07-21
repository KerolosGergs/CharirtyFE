import { Component, EventEmitter, inject, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { IConsultantData } from '../../../../../../Core/Interfaces/consultant';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConsultationServ } from '../../../../../../Core/Services/ConcloutionMangement/consultation-serv';
import { TostarServ } from '../../../../../../Shared/tostar-serv';
import { CommonModule } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'app-consultation-card',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './consultation-card.html',
  styleUrl: './consultation-card.scss'
})
export class ConsultationCard implements OnInit {

  consultationTypes: IConsultantData[] = [];
  selectedType: IConsultantData | null = null;
  editForm: FormGroup;
  concloutionServ = inject(ConsultationServ);
  tostarServ = inject(TostarServ);
  @Output() editConsultation = new EventEmitter<{ id: number; formData: FormData }>();
  @Output() deleteConsultation = new EventEmitter<number>();
@Input() consultations!: IConsultantData[];

ngOnChanges(changes: SimpleChanges): void {
  if (changes['consultations']) {
    this.consultationTypes = this.consultations;
  }
}
   constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      consultationName: ['', Validators.required],
      description: [''],
      isActive: [false]
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  
 

   openEditPopup(type: IConsultantData) {
    this.selectedType = type;
    this.editForm.patchValue({
      consultationName: type.consultationName,
      description: type.description,
      isActive: type.isActive
    });
  }

  closePopup() {
    this.selectedType = null;
  }

  saveEdit() {
    if (!this.selectedType) return;

    // Object.assign(this.selectedType, this.editForm.value);
    // this.selectedType.updatedAt = new Date().toISOString();
    // const formData = new FormData();
 const formData = new FormData();
  formData.append('consultationName', this.editForm.get('consultationName')?.value);
  formData.append('description', this.editForm.get('description')?.value);
  formData.append('isActive', this.editForm.get('isActive')?.value);

  this.editConsultation.emit({ id: this.selectedType.id, formData });


     
    // Optionally call API to update backend
    this.closePopup();
  }

deleteConsultationType(id: number) {
  if (confirm('هل أنت متأكد من حذف نوع الاستشارة؟')) {
    this.deleteConsultation.emit(id);
  }
}

}
