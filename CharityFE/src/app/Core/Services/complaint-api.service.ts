import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../Config/api-routes.config';

// Complaint interfaces
export interface Complaint {
  id?: number;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  userId?: string;
  assignedTo?: string;
  createdAt?: Date;
  updatedAt?: Date;
  resolvedAt?: Date;
  response?: string;
}

export interface CreateComplaintDto {
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface UpdateComplaintDto {
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface UpdateComplaintStatusDto {
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
  response?: string;
  assignedTo?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
}

@Injectable({ providedIn: 'root' })
export class ComplaintApiService {
  constructor(private http: HttpClient) {}

  // Get all complaints
  getAllComplaints(): Observable<ApiResponse<Complaint[]>> {
    return this.http.get<ApiResponse<Complaint[]>>(ApiRoutes.Complaints.getAll);
  }

  // Get complaint by ID
  getComplaintById(id: number): Observable<ApiResponse<Complaint>> {
    return this.http.get<ApiResponse<Complaint>>(ApiRoutes.Complaints.getById(id));
  }

  // Get complaints by user
  getComplaintsByUser(userId: string): Observable<ApiResponse<Complaint[]>> {
    return this.http.get<ApiResponse<Complaint[]>>(ApiRoutes.Complaints.getByUser(userId));
  }

  // Create complaint
  createComplaint(complaintData: CreateComplaintDto): Observable<ApiResponse<Complaint>> {
    return this.http.post<ApiResponse<Complaint>>(ApiRoutes.Complaints.create, complaintData);
  }

  // Update complaint
  updateComplaint(id: number, complaintData: UpdateComplaintDto): Observable<ApiResponse<Complaint>> {
    return this.http.put<ApiResponse<Complaint>>(ApiRoutes.Complaints.update(id), complaintData);
  }

  // Delete complaint
  deleteComplaint(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(ApiRoutes.Complaints.delete(id));
  }

  // Update complaint status
  updateComplaintStatus(id: number, statusData: UpdateComplaintStatusDto): Observable<ApiResponse<Complaint>> {
    return this.http.patch<ApiResponse<Complaint>>(ApiRoutes.Complaints.updateStatus(id), statusData);
  }
} 