import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardStats } from './../dashboard-main';
import { Environment } from '../../../../../../Environment/environment';
@Injectable({
  providedIn: 'root'
})
export class StatesService {

  private readonly apiUrl = Environment.apiUrl; // Change this to your actual API

  constructor(private http: HttpClient) {}

  getStats(): Observable<{ success: boolean; message: string; data: DashboardStats }> {
    return this.http.get<{ success: boolean; message: string; data: DashboardStats }>(this.apiUrl+'Admin/dashboard/statistics');
  }
}
