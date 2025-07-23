import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HelpType } from '../models/help-type.model';
import { Environment } from '../../../../../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HelpTypeService {
  private apiUrl = Environment.apiUrl+'HelpType'; // Replace with your actual API URL
  
  // Mock data for demonstration
 

  constructor(private http: HttpClient) { }

  // Get all help types
  getHelpTypes(): Observable<HelpType[]> {
    // For now, return mock data. Replace with actual API call:
    return this.http.get<HelpType[]>(this.apiUrl);
  }

  // Get help type by ID
  getHelpType(id: number): Observable<HelpType> {
    return this.http.get<HelpType>(`${this.apiUrl}/${id}`);
    // const helpType = this.mockHelpTypes.find(ht => ht.id === id);
    // return of(helpType!);
  }

  // Create new help type
  createHelpType(helpType: HelpType): Observable<HelpType> {
    return this.http.post<HelpType>(this.apiUrl, helpType);
  }

  // Update help type
  updateHelpType(id: number, helpType: HelpType): Observable<HelpType> {
    return this.http.put<HelpType>(`${this.apiUrl}/${id}`, helpType);
  }

  // Delete help type
  deleteHelpType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
    // const index = this.mockHelpTypes.findIndex(ht => ht.id === id);
    // if (index !== -1) {
    //   this.mockHelpTypes.splice(index, 1);
    // }
    // return of();
  }
}

