import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { BookedAppointment, AvailableSlot, ApiResponse, NewAppointment, AddAvailableSlot } from '../mocdels/callender-model'
import { Environment } from '../../../../../../../../Environment/environment';
import { HttpClient } from '@angular/common/http';
import { AuthServ } from '../../../../../../../Auth/Services/auth-serv';

@Injectable({
  providedIn: 'root'
})
export class CallenderService {

   private bookedAppointments: BookedAppointment[] = [];
  private availableSlots: AvailableSlot[] = [];
   Api = Environment.apiUrl;
   http = inject (HttpClient);
  Auth = inject(AuthServ);
  constructor() {
    // Mock data for demonstration - replace with actual HTTP calls
    // this.loadMockData();
  }

  // private loadMockData(): void {
  //   // Mock booked appointments data
  //   this.bookedAppointments = [
  //     {
  //       id: 1006,
  //       userId: "92af6d3a-656b-4577-9c85-f0437f952f8c",
  //       userFullName: "د. أحمد الطيب",
  //       userEmail: "ahmad1@example.com",
  //       advisorId: 10,
  //       advisorFullName: "د. أحمد الطيب",
  //       consultationId: 1,
  //       consultationName: "استشارات طبية",
  //       date: "2025-08-10T00:00:00",
  //       time: "07:45:00",
  //       duration: "01:00:00",
  //       notes: "Slot 1 for advisor 10",
  //       status: "Confirmed"
  //     },
  //     {
  //       id: 6,
  //       userId: "541dc2a9-3a75-4539-ac99-21f547918dac",
  //       userFullName: "kerolos Gerges",
  //       userEmail: "k@gmail.com",
  //       advisorId: 10,
  //       advisorFullName: "د. أحمد الطيب",
  //       consultationId: 1,
  //       consultationName: "استشارات طبية",
  //       date: "2025-07-22T00:00:00",
  //       time: "09:00:00",
  //       duration: "01:00:00",
  //       notes: "جلسة رقم 6 للمستشار 10",
  //       status: "Pending"
  //     }
  //   ];

  //   // Mock available slots data
  //   this.availableSlots = [
  //     {
  //       id: 42,
  //       advisorId: 10,
  //       advisorName: null,
  //       date: "2025-07-22T00:00:00",
  //       time: "10:00:00",
  //       duration: "00:30:00",
  //       consultationType: 0,
  //       isBooked: false,
  //       notes: "استشارة عامة",
  //       createdAt: "2025-07-21T17:50:17.1035669",
  //       updatedAt: null
  //     },
  //     {
  //       id: 8,
  //       advisorId: 10,
  //       advisorName: null,
  //       date: "2025-07-23T00:00:00",
  //       time: "10:00:00",
  //       duration: "01:00:00",
  //       consultationType: 1,
  //       isBooked: false,
  //       notes: "جلسة رقم 7 للمستشار 10",
  //       createdAt: "2025-07-16T21:54:54.384277",
  //       updatedAt: null
  //     }
  //   ];
  // }
//  getAllAvailability(advisorId: number): Observable<{data:IAdvisorAvailability[]}> {
//     return this.http.get<{data:IAdvisorAvailability[]}>(`${this.baseUrl}/${advisorId}/availability`);
//   }
  getBookedAppointments(): Observable<ApiResponse<BookedAppointment>> {
  return this.http.get<{ data: BookedAppointment[] }>(`${this.Api}Advisor/${this.Auth.getId()}/requests`).pipe(
    map(response => ({
      success: true,
      message: 'Success',
      data: response.data,
      statusCode: 200,
      errors: []
    }))
  );
}

getAvailableSlots(): Observable<ApiResponse<AvailableSlot>> {
  return this.http.get<{ data: AvailableSlot[] }>(`${this.Api}advisor/${this.Auth.getId()}/availability`).pipe(
    map(response => ({
      success: true,
      message: 'Success',
      data: response.data,
      statusCode: 200,
      errors: []
    }))
  );
}

  addNewSlot(newSlot: NewAppointment): Observable<boolean> {
    const slot: AddAvailableSlot = {
      advisorId: 10,
      date: newSlot.date,
      time: newSlot.time,
      duration: newSlot.duration,
      consultationType: newSlot.consultationType || 0,
      notes: newSlot.notes,
    };
  return this.http.post<{success:boolean}>(`${this.Api}Advisor/availability`, slot).pipe(
    map(response => response.success)
  );
    // this.availableSlots.push(slot);
    // return of(success);
  }

  // In real implementation, replace these with HTTP calls:
  // getBookedAppointments(): Observable<ApiResponse<BookedAppointment>> {
  //   return this.http.get<ApiResponse<BookedAppointment>>('/api/appointments');
  // }
  
  // getAvailableSlots(): Observable<ApiResponse<AvailableSlot>> {
  //   return this.http.get<ApiResponse<AvailableSlot>>('/api/slots');
  // }
}