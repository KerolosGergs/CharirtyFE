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
      advisorId: this.Auth.getId(),
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
  removeSlot(slotId: number): Observable<boolean> {
    return this.http.delete<{success:boolean}>(`${this.Api}Advisor/availability/${slotId}`).pipe(
      map(response => response.success)
    );
  }
  // In real implementation, replace these with HTTP calls:
  // getBookedAppointments(): Observable<ApiResponse<BookedAppointment>> {
  //   return this.http.get<ApiResponse<BookedAppointment>>('/api/appointments');
  // }
  
  // getAvailableSlots(): Observable<ApiResponse<AvailableSlot>> {
  //   return this.http.get<ApiResponse<AvailableSlot>>('/api/slots');
  // }
}