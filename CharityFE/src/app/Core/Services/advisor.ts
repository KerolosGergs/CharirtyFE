import { Environment } from './../../../Environment/environment';
import { inject, Injectable } from '@angular/core';
import { IAdvisorResponse, ICategoryResponse, getAdvisorByIdResponse, DeleateAdvisorResponse } from '../Interfaces/advisor'; // Assuming you have a model for Advisor
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map, Observable, catchError, throwError } from 'rxjs';
import { AvailbityResponse } from '../Interfaces/iappointment';
import { ConsultationType } from './makingrequest';
import { AdvisorAvailabilityDTOO, ApiResponse } from '../Interfaces/iadvisorappointment';
import { AdvisorRequest, AdvisorRequestApiResponse } from '../Interfaces/iadvisorrequest';

  @Injectable({
    providedIn: 'root'
  })
  export class Advisor {
    
    
    
    _httpClient = inject(HttpClient);
    protected readonly _environment = Environment;
    
    _baseUrl = this._environment.apiUrl;

    getAllAdvisors(): Observable<IAdvisorResponse> {
      const url = `${this._baseUrl}Advisor/with-availability`;
      
      return this._httpClient.get<IAdvisorResponse>(url).pipe(
        map(data => {
          data.data.forEach(advisor => {
            advisor.imageUrl = `${this._environment.ImgUrl}${advisor.imageUrl}`
          })
              return data;
            }),
      
      );
    }
    createNewAdvisor(advisor: FormData): Observable<IAdvisorResponse> {
      debugger
      const url = `${this._baseUrl}Advisor`;
      return this._httpClient.post<IAdvisorResponse>(url, advisor);
    }

    deleteAdvisor(ID: number): Observable<DeleateAdvisorResponse> {
      const url = `${this._baseUrl}Advisor/${ID}`;
      return this._httpClient.delete<DeleateAdvisorResponse>(url);
    }
    getAdvisorById(id: number): Observable<getAdvisorByIdResponse> {
      const url = `${this._baseUrl}Advisor/${id}`;
      // console.log('Calling getAdvisorById with URL:', url);
      
      return this._httpClient.get<getAdvisorByIdResponse>(url).pipe(
        map(data => {
          data.data.imageUrl = `${this._environment.ImgUrl}${data.data.imageUrl}`
          return data;
        }),
      );
    }

    getCategories(): Observable<ICategoryResponse> {
      const url = `${this._baseUrl}Consultation`;
      // console.log('Calling getCategories with URL:', url);
      
      return this._httpClient.get<ICategoryResponse>(url).pipe(
        map(data => {
          return data;
        }),
      );
    }

 getAvailableAppointments(advisorId: number): Observable<AvailbityResponse> {
  const url = `${this._baseUrl}Advisor/${advisorId}/availability`;
  console.log('Fetching:', url);

  return this._httpClient.get<AvailbityResponse>(url).pipe(
    catchError(error => {
      console.error('❌ API Fetch Error:', error);
      return throwError(() => error);
    })
  );
}

    updateAdvisor(id: number, advisor: FormData): Observable<any> {
      debugger
    const url = `${this._baseUrl}Advisor/${id}`;
    return this._httpClient.put<any>(url, advisor).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Update failed:', error);
        return throwError(() => error);
      })
    );
  }

  getAvailableSlots(advisorId: number, date: Date): Observable<AdvisorAvailabilityDTOO[]> {
  const dateString = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`; // ✅ Format to MM-DD-YYYY

  const params = new HttpParams().set('date', dateString);

  return this._httpClient.get<ApiResponse<AdvisorAvailabilityDTOO[]>>(
    `${this._baseUrl}Advisor/${advisorId}/available-slots`, // ✅ Matches backend route
    { params }
  ).pipe(
    map(response => response.data)
  );
}

getRequestsByAdvisorId(id: number): Observable<AdvisorRequest[]> {
  return this._httpClient
    .get<AdvisorRequestApiResponse>(`${this._baseUrl}Advisor/${id}/requests`)
    .pipe(map(response => response.data));
}


  getAvailableSlotsByType(advisorId: number, date: Date, consultationType: ConsultationType): Observable<AdvisorAvailabilityDTOO[]> {
    const dateString = date.toISOString();
    let params = new HttpParams()
      .set('date', dateString)
      .set('consultationType', consultationType.toString());

    return this._httpClient.get<ApiResponse<AdvisorAvailabilityDTOO[]>>(`${this._baseUrl}${advisorId}/available-slots-by-type`, { params } )
      .pipe(
        map(response => response.data)
      );
  }


  //     Consultants:IAdvisor[] = [
  //   {
  //     id: 1,
  //     name: 'د. أحمد السعدي',
  //     description: 'خبير في تصميم وتنفيذ البرامج المجتمعية المستدامة، مع خبرة تتجاوز 15 عامًا في العمل الخيري.',
  //     status: 'متاح هذا الأسبوع'
  //   },
  //   {
  //     id: 2,
  //     name: 'م. سارة عبدالعزيز',
  //     description: 'متخصصة في إدارة المشاريع التنموية وتطوير الأداء المؤسسي باستخدام منهجيات حديثة.',
  //     status: 'غير متاح'
  //   },
  //   {
  //     id: 3,
  //     name: 'أ. خالد العتيبي',
  //     description: 'مستشار في تطوير مبادرات التمكين الاقتصادي وتمويل المشاريع الصغيرة للأسر المنتجة.',
  //     status: 'متاح هذا الأسبوع'
  //   },
  //   {
  //     id: 4,
  //     name: 'د. ليلى الشمري',
  //     description: 'خبيرة في تصميم المناهج غير الرسمية وبرامج التعليم المجتمعي للفئات المهمشة.',
  //     status: 'غير متاح'
  //   },
  //   {
  //     id: 5,
  //     name: 'أ. يوسف الحربي',
  //     description: 'مدرب ومستشار في بناء القدرات القيادية ووضع الخطط الاستراتيجية للمنظمات غير الربحية.',
  //     status: 'متاح هذا الأسبوع'
  //   },
  //   {
  //     id: 6,
  //     name: 'م. ريم الزهراني',
  //     description: 'متخصصة في التحول الرقمي للمنظمات الخيرية وتطوير الحلول التقنية لخدمة المستفيدين.',
  //     status: 'متاح هذا الأسبوع'
  //   },
  //   {
  //     id: 7,
  //     name: 'د. ناصر القحطاني',
  //     description: 'مستشار في تطوير أنظمة الحوكمة وتعزيز الشفافية والمساءلة في العمل المؤسسي.',
  //     status: 'غير متاح'
  //   },
  //   {
  //     id: 8,
  //     name: 'أ. منى العبدالله',
  //     description: 'خبيرة في تصميم استراتيجيات التطوع وبناء فرق العمل التطوعية الفعالة.',
  //     status: 'متاح هذا الأسبوع'
  //   }
  // ];

    constructor() { }
  }
