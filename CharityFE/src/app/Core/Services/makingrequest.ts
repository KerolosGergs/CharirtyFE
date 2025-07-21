import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, Observable, throwError } from 'rxjs';
import { Environment } from '../../../Environment/environment';
// Interfaces
export interface CreateAvailabilityDTO {
  advisorId: number;
  date: string; // ISO format: "2025-08-21T00:00:00Z"
  time: string; // Format: "13:30:00"
  duration: string; // Format: "00:30:00"
  consultationType: number; // 0 = Online, 1 = InPerson
  notes: string;
}

export interface BulkAvailabilityDTO {
  availabilities: CreateAvailabilityDTO[];
}

export interface AdvisorAvailabilityDTO {
  id: number;
  advisorId: number;
  date: string;
  time: string;
  duration: string;
  consultationType: number;
  notes: string;
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
  timestamp: string;
}

export interface OperationStatus {
  isLoading: boolean;
  error?: string;
  success?: string;
}

export type ConsultationType = 'online' | 'inperson';

/**
 * خدمة إدارة توفر المستشارين
 * تتعامل مع جميع عمليات API المتعلقة بالتوفر
 */
@Injectable({
  providedIn: 'root'
})
export class AdvisorAvailabilityService {
  private readonly baseUrl = Environment.apiUrl;
  private readonly availabilityEndpoint = '/advisor/availability';
  private readonly bulkAvailabilityEndpoint = '/advisor/bulk-availability';
  
  // حالة العملية
  private operationStatusSubject = new BehaviorSubject<OperationStatus>({ isLoading: false });
  public operationStatus$ = this.operationStatusSubject.asObservable();

  constructor(private http: HttpClient) {
    console.log('🔧 AdvisorAvailabilityService initialized');
    console.log('🌐 Base URL:', this.baseUrl);
  }

  // ===== HTTP HEADERS =====

  /**
   * إنشاء headers للطلبات
   */
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    // إضافة رمز التحقق إذا كان متوفراً
    const token = this.getAuthToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  /**
   * الحصول على رمز التحقق من localStorage أو sessionStorage
   */
  private getAuthToken(): string | null {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  }

  // ===== OPERATION STATUS MANAGEMENT =====

  /**
   * تحديث حالة العملية
   */
  private updateOperationStatus(status: OperationStatus): void {
    this.operationStatusSubject.next(status);
  }

  /**
   * بدء عملية تحميل
   */
  private startLoading(): void {
    this.updateOperationStatus({ isLoading: true });
  }

  /**
   * إنهاء عملية تحميل بنجاح
   */
  private finishSuccess(message: string): void {
    this.updateOperationStatus({ isLoading: false, success: message });
    
    // مسح رسالة النجاح بعد 3 ثوان
    setTimeout(() => {
      this.updateOperationStatus({ isLoading: false });
    }, 3000);
  }

  /**
   * إنهاء عملية تحميل بخطأ
   */
  private finishError(error: string): void {
    this.updateOperationStatus({ isLoading: false, error });
    
    // مسح رسالة الخطأ بعد 5 ثوان
    setTimeout(() => {
      this.updateOperationStatus({ isLoading: false });
    }, 5000);
  }

  // ===== API ENDPOINTS =====

  /**
   * إنشاء توفر واحد
   * POST: /api/advisor/availability
   */
  createAvailability(availability: CreateAvailabilityDTO): Observable<ApiResponse<AdvisorAvailabilityDTO>> {
    console.log('📤 Creating single availability:', availability);
    
    this.startLoading();
    
    const url = `${this.baseUrl}${this.availabilityEndpoint}`;
    
    return this.http.post<ApiResponse<AdvisorAvailabilityDTO>>(url, availability, {
      headers: this.getHeaders()
    }).pipe(
      map(response => {
        console.log('✅ Availability created successfully:', response);
        this.finishSuccess('تم إنشاء التوفر بنجاح');
        return response;
      }),
      catchError(error => {
        console.error('❌ Failed to create availability:', error);
        const errorMessage = this.extractErrorMessage(error);
        this.finishError(errorMessage);
        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {
        console.log('🏁 Create availability request completed');
      })
    );
  }

  /**
   * إنشاء توفر متعدد (bulk)
   * POST: /api/advisor/bulk-availability
   */
  createBulkAvailability(bulkAvailability: BulkAvailabilityDTO): Observable<ApiResponse<AdvisorAvailabilityDTO[]>> {
    console.log('📤 Creating bulk availability:', bulkAvailability);
    
    this.startLoading();
    
    const url = `${this.baseUrl}${this.bulkAvailabilityEndpoint}`;
    
    return this.http.post<ApiResponse<AdvisorAvailabilityDTO[]>>(url, bulkAvailability, {
      headers: this.getHeaders()
    }).pipe(
      map(response => {
        console.log('✅ Bulk availability created successfully:', response);
        this.finishSuccess(`تم إنشاء ${response.data.length} توفر بنجاح`);
        return response;
      }),
      catchError(error => {
        console.error('❌ Failed to create bulk availability:', error);
        const errorMessage = this.extractErrorMessage(error);
        this.finishError(errorMessage);
        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {
        console.log('🏁 Create bulk availability request completed');
      })
    );
  }

  /**
   * الحصول على توفر مستشار
   * GET: /api/advisor/availability/{id}
   */
  getAdvisorAvailability(advisorId: number): Observable<ApiResponse<AdvisorAvailabilityDTO[]>> {
    console.log('📥 Getting advisor availability for ID:', advisorId);
    
    this.startLoading();
    
    const url = `${this.baseUrl}${this.availabilityEndpoint}/${advisorId}`;
    
    return this.http.get<ApiResponse<AdvisorAvailabilityDTO[]>>(url, {
      headers: this.getHeaders()
    }).pipe(
      map(response => {
        console.log('✅ Advisor availability retrieved successfully:', response);
        this.finishSuccess('تم جلب التوفر بنجاح');
        return response;
      }),
      catchError(error => {
        console.error('❌ Failed to get advisor availability:', error);
        const errorMessage = this.extractErrorMessage(error);
        this.finishError(errorMessage);
        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {
        console.log('🏁 Get advisor availability request completed');
      })
    );
  }

  /**
   * تحديث توفر موجود
   * PUT: /api/advisor/availability/{id}
   */
  updateAvailability(id: number, availability: CreateAvailabilityDTO): Observable<ApiResponse<AdvisorAvailabilityDTO>> {
    console.log('📝 Updating availability ID:', id, availability);
    
    this.startLoading();
    
    const url = `${this.baseUrl}${this.availabilityEndpoint}/${id}`;
    
    return this.http.put<ApiResponse<AdvisorAvailabilityDTO>>(url, availability, {
      headers: this.getHeaders()
    }).pipe(
      map(response => {
        console.log('✅ Availability updated successfully:', response);
        this.finishSuccess('تم تحديث التوفر بنجاح');
        return response;
      }),
      catchError(error => {
        console.error('❌ Failed to update availability:', error);
        const errorMessage = this.extractErrorMessage(error);
        this.finishError(errorMessage);
        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {
        console.log('🏁 Update availability request completed');
      })
    );
  }

  /**
   * حذف توفر
   * DELETE: /api/advisor/availability/{id}
   */
  deleteAvailability(id: number): Observable<ApiResponse<boolean>> {
    console.log('🗑️ Deleting availability ID:', id);
    
    this.startLoading();
    
    const url = `${this.baseUrl}${this.availabilityEndpoint}/${id}`;
    
    return this.http.delete<ApiResponse<boolean>>(url, {
      headers: this.getHeaders()
    }).pipe(
      map(response => {
        console.log('✅ Availability deleted successfully:', response);
        this.finishSuccess('تم حذف التوفر بنجاح');
        return response;
      }),
      catchError(error => {
        console.error('❌ Failed to delete availability:', error);
        const errorMessage = this.extractErrorMessage(error);
        this.finishError(errorMessage);
        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {
        console.log('🏁 Delete availability request completed');
      })
    );
  }

  // ===== UTILITY METHODS =====

  /**
   * إنشاء DTO للتوفر
   */
  createAvailabilityDTO(
    advisorId: number,
    date: Date,
    startTime: string,
    endTime: string,
    consultationType: ConsultationType,
    notes: string = ''
  ): CreateAvailabilityDTO {
    // تحويل التاريخ إلى تنسيق ISO
    const isoDate = date.toISOString();
    
    // حساب المدة
    const duration = this.calculateDuration(startTime, endTime);
    
    // تحويل نوع الاستشارة إلى رقم
    const consultationTypeNumber = consultationType === 'online' ? 0 : 1;
    
    const dto: CreateAvailabilityDTO = {
      advisorId,
      date: isoDate,
      time: startTime + ':00', // إضافة الثواني
      duration,
      consultationType: consultationTypeNumber,
      notes: notes || `Available for ${consultationType} consultation`
    };
    
    console.log('🔧 Created availability DTO:', dto);
    return dto;
  }

  /**
   * حساب المدة بين وقتين
   */
  private calculateDuration(startTime: string, endTime: string): string {
    const start = new Date(`2000-01-01T${startTime}:00`);
    const end = new Date(`2000-01-01T${endTime}:00`);
    
    const diffMs = end.getTime() - start.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
  }

  /**
   * استخراج رسالة الخطأ من استجابة HTTP
   */
  private extractErrorMessage(error: HttpErrorResponse): string {
    if (error.error && error.error.message) {
      return error.error.message;
    }
    
    switch (error.status) {
      case 0:
        return 'لا يمكن الاتصال بالخادم. تحقق من اتصال الإنترنت.';
      case 400:
        return 'بيانات غير صحيحة. يرجى التحقق من المدخلات.';
      case 401:
        return 'غير مخول. يرجى تسجيل الدخول مرة أخرى.';
      case 403:
        return 'ممنوع. ليس لديك صلاحية لهذه العملية.';
      case 404:
        return 'المورد غير موجود.';
      case 409:
        return 'تعارض في البيانات. قد يكون التوفر موجود مسبقاً.';
      case 422:
        return 'بيانات غير صالحة للمعالجة.';
      case 500:
        return 'خطأ في الخادم. يرجى المحاولة لاحقاً.';
      case 502:
        return 'خطأ في البوابة. الخادم غير متاح مؤقتاً.';
      case 503:
        return 'الخدمة غير متاحة مؤقتاً.';
      default:
        return `خطأ غير متوقع (${error.status}): ${error.message}`;
    }
  }

  /**
   * التحقق من صحة DTO
   */
  validateAvailabilityDTO(dto: CreateAvailabilityDTO): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!dto.advisorId || dto.advisorId <= 0) {
      errors.push('معرف المستشار مطلوب ويجب أن يكون أكبر من صفر');
    }
    
    if (!dto.date) {
      errors.push('التاريخ مطلوب');
    } else {
      const date = new Date(dto.date);
      if (isNaN(date.getTime())) {
        errors.push('تنسيق التاريخ غير صحيح');
      }
    }
    
    if (!dto.time) {
      errors.push('الوقت مطلوب');
    } else if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(dto.time)) {
      errors.push('تنسيق الوقت غير صحيح (يجب أن يكون HH:MM:SS)');
    }
    
    if (!dto.duration) {
      errors.push('المدة مطلوبة');
    } else if (!/^([0-9]+):[0-5][0-9]:[0-5][0-9]$/.test(dto.duration)) {
      errors.push('تنسيق المدة غير صحيح (يجب أن يكون HH:MM:SS)');
    }
    
    if (dto.consultationType !== 0 && dto.consultationType !== 1) {
      errors.push('نوع الاستشارة يجب أن يكون 0 (أونلاين) أو 1 (حضوري)');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * تحويل ConsultationType إلى رقم
   */
  consultationTypeToNumber(type: ConsultationType): number {
    return type === 'online' ? 0 : 1;
  }

  /**
   * تحويل رقم إلى ConsultationType
   */
  numberToConsultationType(type: number): ConsultationType {
    return type === 0 ? 'online' : 'inperson';
  }

  /**
   * تنسيق التاريخ للعرض
   */
  formatDateForDisplay(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * تنسيق الوقت للعرض
   */
  formatTimeForDisplay(timeString: string): string {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  }

  /**
   * تنسيق المدة للعرض
   */
  formatDurationForDisplay(durationString: string): string {
    const [hours, minutes] = durationString.split(':');
    const hoursNum = parseInt(hours);
    const minutesNum = parseInt(minutes);
    
    if (hoursNum > 0) {
      return `${hoursNum} ساعة و ${minutesNum} دقيقة`;
    } else {
      return `${minutesNum} دقيقة`;
    }
  }

  /**
   * الحصول على حالة العملية الحالية
   */
  getCurrentOperationStatus(): OperationStatus {
    return this.operationStatusSubject.value;
  }

  /**
   * مسح حالة العملية
   */
  clearOperationStatus(): void {
    this.updateOperationStatus({ isLoading: false });
  }

  /**
   * اختبار الاتصال بالخادم
   */
  testConnection(): Observable<boolean> {
    console.log('🔌 Testing connection to server...');
    
    const url = `${this.baseUrl}/health`; // افتراض وجود endpoint للصحة
    
    return this.http.get(url, {
      headers: this.getHeaders(),
      observe: 'response'
    }).pipe(
      map(response => {
        console.log('✅ Connection test successful:', response.status);
        return response.status === 200;
      }),
      catchError(error => {
        console.error('❌ Connection test failed:', error);
        return throwError(() => new Error('فشل في الاتصال بالخادم'));
      })
    );
  }
}
