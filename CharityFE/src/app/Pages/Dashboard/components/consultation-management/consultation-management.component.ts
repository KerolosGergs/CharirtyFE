import { TostarServ } from './../../../../Shared/tostar-serv';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import{ ConsultationType, ConsultationAppointment, IConsultantData } from '../../../../Core/Interfaces/consultant';
import { ConsultationServ } from '../../../../Core/Services/ConcloutionMangement/consultation-serv';


@Component({
  selector: 'app-consultation-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultation-management.component.html',
  styleUrls: ['./consultation-management.component.scss']
})
export class ConsultationManagementComponent implements OnInit {
  consultationTypes: IConsultantData[] = [];
  appointments: ConsultationAppointment[] = [];
  filteredAppointments: ConsultationAppointment[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  concloutionServ = inject(ConsultationServ);
  tostarServ = inject(TostarServ);
  constructor() {}

  ngOnInit(): void {
    this.loadConsultationTypes();
    this.loadAppointments();
  }

  loadConsultationTypes(): void {
    this.concloutionServ.getAllConsultations().subscribe(data => 
      {
        if(data && data.success)
        {
          this.consultationTypes = data.data;

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

  toggleConsultationTypeActions(index: number): void {
    // Close all other action menus
    // this.consultationTypes.forEach((type, i) => {
    //   if (i !== index) {
    //     type.showActions = false;
    //   }
    // });
    
    // // Toggle current action menu
    // this.consultationTypes[index].showActions = !this.consultationTypes[index].showActions;
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

  editConsultationType(type: IConsultantData): void {
    // console.log('Editing consultation type:', type.consultationName);
    type.isActive = false;
  }

  deleteConsultationType(type: IConsultantData): void {
   
    type.isActive = false;
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

  addConsultationType(): void {
    console.log('Adding new consultation type');
    // هنا يمكن إضافة منطق إضافة نوع استشارة جديد
  }

  exportData(): void {
    console.log('Exporting consultation data');
    // هنا يمكن إضافة منطق تصدير البيانات
  }
} 