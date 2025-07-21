import { TostarServ } from './../../../../Shared/tostar-serv';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConsultationAppointment, IConsultantData } from '../../../../Core/Interfaces/consultant';
import { ConsultationServ } from '../../../../Core/Services/ConcloutionMangement/consultation-serv';
import { ConsultationCard } from "./components/consultation-card/consultation-card";
import { Spinner } from "../../../../Shared/spinner/spinner";

@Component({
  selector: 'app-consultation-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ConsultationCard, Spinner],
  templateUrl: './consultation-management.component.html',
  styleUrls: ['./consultation-management.component.scss']
})
export class ConsultationManagementComponent implements OnInit {
  consultationTypes!: IConsultantData[];
  appointments: ConsultationAppointment[] = [];
  filteredAppointments: ConsultationAppointment[] = [];

  searchTerm: string = '';
  currentPage: number = 1;
  concloutionServ = inject(ConsultationServ);
  tostarServ = inject(TostarServ);
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

  loadAppointments(): void {
    // Mock data for appointments
    this.appointments = [
      {
        id: 1,
        consultant: 'د. فهد العتيبي',
        userName: 'سعيد أحمد',
        email: 'Sa123ah@gmail.com',
        consultationType: 'نوع الاستشارة',
        date: '23/2/25',
        time: '3:30 PM',
        showActions: false
      },
      {
        id: 2,
        consultant: 'د. فهد العتيبي',
        userName: 'سعيد أحمد',
        email: 'Sa123ah@gmail.com',
        consultationType: 'نوع الاستشارة',
        date: '23/2/25',
        time: '3:30 PM',
        showActions: false
      },
      {
        id: 3,
        consultant: 'د. فهد العتيبي',
        userName: 'سعيد أحمد',
        email: 'Sa123ah@gmail.com',
        consultationType: 'نوع الاستشارة',
        date: '23/2/25',
        time: '3:30 PM',
        showActions: false
      },
      {
        id: 4,
        consultant: 'د. فهد العتيبي',
        userName: 'سعيد أحمد',
        email: 'Sa123ah@gmail.com',
        consultationType: 'نوع الاستشارة',
        date: '23/2/25',
        time: '3:30 PM',
        showActions: false
      }
    ];
    this.filteredAppointments = [...this.appointments];
  }
  ngOnInit(): void {
    this.loadConsultationTypes();
    this.loadAppointments();
  }


  filterAppointments(): void {
    if (!this.searchTerm.trim()) {
      this.filteredAppointments = [...this.appointments];
    } else {
      this.filteredAppointments = this.appointments.filter(appointment =>
        appointment.consultant.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        appointment.userName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        appointment.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        appointment.consultationType.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }



  toggleAppointmentActions(index: number): void {
    // Close all other action menus
    this.filteredAppointments.forEach((appointment, i) => {
      if (i !== index) {
        appointment.showActions = false;
      }
    });

    // Toggle current action menu
    this.filteredAppointments[index].showActions = !this.filteredAppointments[index].showActions;
  }



  changeAppointment(appointment: ConsultationAppointment): void {
    console.log('Changing appointment for:', appointment.userName);
    appointment.showActions = false;
  }

  cancelAppointment(appointment: ConsultationAppointment): void {
    if (confirm(`هل أنت متأكد من إلغاء الموعد للمستخدم ${appointment.userName}؟`)) {
      this.appointments = this.appointments.filter(a => a.id !== appointment.id);
      this.filterAppointments();
      console.log('Appointment cancelled for:', appointment.userName);
    }
    appointment.showActions = false;
  }



  exportData(): void {
    console.log('Exporting consultation data');
    // هنا يمكن إضافة منطق تصدير البيانات
  }



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