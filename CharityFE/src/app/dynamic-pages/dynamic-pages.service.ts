import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../Core/Config/api-routes.config';

// Frontend interfaces that match backend DTOs
export interface ContentItem {
  id?: number;
  dynamicPageId?: number;
  type: 'text' | 'image_text' | 'file';
  content: string;
  imageUrl?: string;
  fileUrl?: string;
  fileName?: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DynamicPage {
  id?: number;
  pageName: string;
  description?: string;
  slug?: string;
  isActive?: boolean;
  items?: ContentItem[];
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
}

// DTOs for API requests
export interface CreateDynamicPageDto {
  pageName: string;
  description?: string;
  slug?: string;
  items: CreateContentItemDto[];
}

export interface CreateContentItemDto {
  type: 'text' | 'image_text' | 'file';
  content: string;
  imageUrl?: string;
  fileUrl?: string;
  fileName?: string;
  order: number;
}

export interface UpdateDynamicPageDto {
  pageName: string;
  description?: string;
  slug?: string;
  items: UpdateContentItemDto[];
}

export interface UpdateContentItemDto {
  id?: number; // null for new items
  dynamicPageId?: number;
  type: 'text' | 'image_text' | 'file';
  content: string;
  imageUrl?: string;
  fileUrl?: string;
  fileName?: string;
  order: number;
}

export interface FileUploadResponse {
  url: string;
  fileName: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
}

@Injectable({ providedIn: 'root' })
export class DynamicPagesService {
  constructor(private http: HttpClient) {}

  // Get all pages
  getPages(): Observable<ApiResponse<DynamicPage[]>> {
    return this.http.get<ApiResponse<DynamicPage[]>>(ApiRoutes.DynamicPages.getAll);
  }

  // Get all active pages
  getActivePages(): Observable<ApiResponse<DynamicPage[]>> {
    return this.http.get<ApiResponse<DynamicPage[]>>(ApiRoutes.DynamicPages.getAllActive);
  }

  // Get page by ID
  getPageById(id: number): Observable<ApiResponse<DynamicPage>> {
    return this.http.get<ApiResponse<DynamicPage>>(ApiRoutes.DynamicPages.getById(id));
  }

  // Get page by slug
  getPageBySlug(slug: string): Observable<ApiResponse<DynamicPage>> {
    return this.http.get<ApiResponse<DynamicPage>>(ApiRoutes.DynamicPages.getBySlug(slug));
  }

  // Get items for a specific page
  getItems(pageId: number): Observable<ApiResponse<ContentItem[]>> {
    return this.http.get<ApiResponse<ContentItem[]>>(ApiRoutes.DynamicPages.getItems(pageId));
  }

  // Create a new page
  createPage(pageData: CreateDynamicPageDto): Observable<ApiResponse<DynamicPage>> {
    return this.http.post<ApiResponse<DynamicPage>>(ApiRoutes.DynamicPages.create, pageData);
  }

  // Update page
  updatePage(id: number, pageData: UpdateDynamicPageDto): Observable<ApiResponse<DynamicPage>> {
    return this.http.put<ApiResponse<DynamicPage>>(ApiRoutes.DynamicPages.update(id), pageData);
  }

  // Delete page
  deletePage(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(ApiRoutes.DynamicPages.delete(id));
  }

  // Toggle page active status
  toggleActive(id: number): Observable<ApiResponse<DynamicPage>> {
    return this.http.patch<ApiResponse<DynamicPage>>(ApiRoutes.DynamicPages.toggleActive(id), {});
  }

  // Upload file
  uploadFile(file: File, fileType: string = 'general'): Observable<ApiResponse<FileUploadResponse>> {
    const formData = new FormData();
    formData.append('file', file);
    const url = ApiRoutes.buildUrl(ApiRoutes.DynamicPages.uploadFile, { fileType });
    return this.http.post<ApiResponse<FileUploadResponse>>(url, formData);
  }

  // Delete file
  deleteFile(fileUrl: string): Observable<ApiResponse<void>> {
    const url = ApiRoutes.buildUrl(ApiRoutes.DynamicPages.deleteFile, { fileUrl });
    return this.http.delete<ApiResponse<void>>(url);
  }
}
