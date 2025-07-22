import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HelpRequest } from '../models/help-request.model';
import { Environment } from '../../../../../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HelpRequestService {
  private apiUrl = Environment.apiUrl; // Replace with your actual API URL
  
  // Mock data for demonstration
  private mockHelpRequests: HelpRequest[] = [
    {
      id: 1,
      name: 'محمد أحمد',
      email: 'sa123@gmail.com',
      phoneNumber: '23/2/25',
      notes: 'مساعدة',
      helpTypeId: 1,
      helpTypeName: 'Technical Support',
      createdAt: new Date('2025-01-15'),
      updatedAt: new Date('2025-01-15')
    },
    {
      id: 2,
      name: 'سعد محمد',
      email: 'sa123@gmail.com',
      phoneNumber: '23/2/25',
      notes: 'مساعدة',
      helpTypeId: 2,
      helpTypeName: 'General Inquiry',
      createdAt: new Date('2025-01-16'),
      updatedAt: new Date('2025-01-16')
    },
    {
      id: 3,
      name: 'أحمد سالم',
      email: 'sa123@gmail.com',
      phoneNumber: '23/2/25',
      notes: 'مساعدة',
      helpTypeId: 1,
      helpTypeName: 'Technical Support',
      createdAt: new Date('2025-01-17'),
      updatedAt: new Date('2025-01-17')
    },
    {
      id: 4,
      name: 'علي حسن',
      email: 'sa123@gmail.com',
      phoneNumber: '23/2/25',
      notes: 'مساعدة',
      helpTypeId: 3,
      helpTypeName: 'Billing Support',
      createdAt: new Date('2025-01-18'),
      updatedAt: new Date('2025-01-18')
    },
    {
      id: 5,
      name: 'فاطمة عبدالله',
      email: 'sa123@gmail.com',
      phoneNumber: '23/2/25',
      notes: 'مساعدة',
      helpTypeId: 2,
      helpTypeName: 'General Inquiry',
      createdAt: new Date('2025-01-19'),
      updatedAt: new Date('2025-01-19')
    }
  ];

  constructor(private http: HttpClient) { }

  // Get all help requests
  getHelpRequests(): Observable<HelpRequest[]> {
    // For now, return mock data. Replace with actual API call:
    return this.http.get<HelpRequest[]>(this.apiUrl+'HelpRequest');
    return of(this.mockHelpRequests);
  }
deleteHelpRequest(id: number): Observable<void> {
  return this.http.delete<void>(this.apiUrl+'HelpRequest/'+`${id}`);
}
}

