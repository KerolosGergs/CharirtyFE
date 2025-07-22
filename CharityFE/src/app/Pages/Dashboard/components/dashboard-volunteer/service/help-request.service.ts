import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {  VolunteerResponse } from '../Model/Volunteer-request.model';
import { Environment } from '../../../../../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class VolunteerRequestService {
  private apiUrl = Environment.apiUrl; // Replace with your actual API URL
  
 

  constructor(private http: HttpClient) { }

  // Get all help requests
  getVolunteerRequests(): Observable<VolunteerResponse> {
    // For now, return mock data. Replace with actual API call:
    return this.http.get<VolunteerResponse>(this.apiUrl+'Volunteer');
  }
deleteVolunteerRequest(id: number): Observable<void> {
  return this.http.delete<void>(this.apiUrl+'Volunteer/'+`${id}`);
}
}

