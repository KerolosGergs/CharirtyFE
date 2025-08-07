import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../Config/api-routes.config';

// Dashboard interfaces
export interface DashboardStats {
  totalUsers: number;
  totalAdvisors: number;
  totalConsultations: number;
  totalComplaints: number;
  totalNews: number;
  totalVolunteers: number;
  totalHelpRequests: number;
  activePages: number;
}

export interface RecentActivity {
  id: number;
  type: 'user_registration' | 'consultation_created' | 'complaint_submitted' | 'news_published' | 'volunteer_application';
  title: string;
  description: string;
  timestamp: Date;
  userId?: string;
  userName?: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
  }[];
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: Date;
  userId?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardApiService {
  constructor(private http: HttpClient) {}

  // Get dashboard statistics
  getDashboardStats(): Observable<ApiResponse<DashboardStats>> {
    return this.http.get<ApiResponse<DashboardStats>>(ApiRoutes.Dashboard.getStats);
  }

  // Get recent activity
  getRecentActivity(): Observable<ApiResponse<RecentActivity[]>> {
    return this.http.get<ApiResponse<RecentActivity[]>>(ApiRoutes.Dashboard.getRecentActivity);
  }

  // Get chart data
  getChartData(): Observable<ApiResponse<ChartData>> {
    return this.http.get<ApiResponse<ChartData>>(ApiRoutes.Dashboard.getCharts);
  }

  // Get notifications
  getNotifications(): Observable<ApiResponse<Notification[]>> {
    return this.http.get<ApiResponse<Notification[]>>(ApiRoutes.Dashboard.getNotifications);
  }
} 