import { TostarServ } from './../../../../Shared/tostar-serv';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IConsultantData, RequstedData } from '../../../../Core/Interfaces/consultant';
import { ConsultationServ } from '../../../../Core/Services/ConcloutionMangement/consultation-serv';
import { ConsultationCard } from "./components/consultation-card/consultation-card";
import { Spinner } from "../../../../Shared/spinner/spinner";
import { RequestedComponent } from "./components/requested-component/requested-component";
enum ConsultationType {
  Online = 0,
  InPerson = 1,
  Both = 2,
}
@Component({
  selector: 'app-consultation-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ConsultationCard, Spinner, RequestedComponent],
  templateUrl: './consultation-management.component.html',
  styleUrls: ['./consultation-management.component.scss']
})
export class ConsultationManagementComponent implements OnInit {

  concloutionServ = inject(ConsultationServ);
  tostarServ = inject(TostarServ);
  consultationTypes!: IConsultantData[];

  searchTerm: string = '';
  currentPage: number = 1;
  
  showAddPopup = false;
  addForm: FormGroup;
  ShowConsultationTypes = false

  constructor(private fb: FormBuilder) {
    this.addForm = this.fb.group({
      consultationName: ['', Validators.required],
      description: [''],
      isActive: [true]
    });
  }
  loadConsultationTypes(): void {
    this.concloutionServ.getAllConsultations().subscribe(data => {
      if (data && data.success) {
        this.consultationTypes = data.data;
        this.ShowConsultationTypes = true
      }
    })
    // Mock data for consultation types

  }


  ngOnInit(): void {
    this.loadConsultationTypes();
    // this.loadAppointments();
  }




 getStatusClass(status: string): string {
    switch (status) {
      case 'Pending': return 'badge bg-warning text-dark';
      case 'Completed': return 'badge bg-success';
      case 'Rejected': return 'badge bg-danger';
      case 'InProgress': return 'badge bg-info text-dark';
      default: return 'badge bg-secondary';
    }
  }

  getTypeLabel(type: number): string {
    return type === 0 ? 'أونلاين' : 'حضوري';
  }

  // toggleActions(index: number): void {
  //   this.filteredAppointments.forEach((app, i) => {
  //     if (i !== index) app.showActions = false;
  //   });
  //   this.filteredAppointments[index].showActions = !this.filteredAppointments[index].showActions;
  // }






  openAddPopup() {
    this.showAddPopup = true;
    this.addForm.reset({
      consultationName: '',
      description: '',
      isActive: true
    });
    // document.body.style.overflow = 'hidden'; // Lock scroll

  }

  closeAddPopup() {
    this.showAddPopup = false;
    document.body.style.overflow = ''; // Restore scroll

  }

  addConsultation() {
    if (this.addForm.invalid) return;

    const formData = new FormData();

    // Append form fields
    formData.append('consultationName', this.addForm.get('consultationName')?.value);
    formData.append('description', this.addForm.get('description')?.value);
    formData.append('isActive', this.addForm.get('isActive')?.value);

    this.concloutionServ.createConsultation(formData).subscribe({
      next: (res) => {
        if (res && res.success) {
          this.tostarServ.showSuccess('تم اضافة الاستشارة بنجاح');
          this.loadConsultationTypes();
        } else {
          this.tostarServ.showError('حدث خطاء تاكد من البيانات');
        }
        // Add to the local list, refresh UI, etc.
        this.closeAddPopup();
      },
      error: (err) => {
        console.error(err);
      }
    });


  }


  onEditConsultation(event: { id: number; formData: FormData }) {
    this.concloutionServ.updateConsultation(event.id, event.formData).subscribe({
      next: (res) => {
        if (res && res.success) {
          this.tostarServ.showSuccess('تم التعديل بنجاح');
          this.loadConsultationTypes();
        } else {
          this.tostarServ.showError('حدث خطأ تأكد من البيانات');
        }
      },
      error: () => {
        this.tostarServ.showError('حدث خطأ أثناء التعديل');
      }
    });
  }

  onDeleteConsultation(id: number) {
    this.concloutionServ.DeleteConsultation(id).subscribe({
      next: (res) => {
        if (res && res.success) {
          this.tostarServ.showSuccess('تم الحذف بنجاح');
          this.loadConsultationTypes();
        } else {
          this.tostarServ.showError('تعذر حذف نوع الاستشارة');
        }
      },
      error: () => {
        this.tostarServ.showError('حدث خطأ أثناء الحذف');
      }
    });
  }
}