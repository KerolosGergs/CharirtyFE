import { Environment } from './../../../Environment/environment';
import { inject, Injectable } from '@angular/core';
import { IAdvisor, IAdvisorResponse, ICategory, ICategoryResponse } from '../Interfaces/advisor'; // Assuming you have a model for Advisor
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Advisor {
  
  
  _httpClient = inject(HttpClient);
  protected readonly _environment = Environment;
  
  _baseUrl = this._environment.apiUrl;

  getAllAdvisors(): Observable<IAdvisorResponse> {
    const url = `${this._baseUrl}Advisor/with-availability`;
    console.log('Calling getAllAdvisors with URL:', url);
    
    return this._httpClient.get<IAdvisorResponse>(url).pipe(
      map(data => {
            return data;
          }),
     
    );
  }

  getAdvisorById(id: number): Observable<any> {
    const url = `${this._baseUrl}Advisor/${id}`;
    console.log('Calling getAdvisorById with URL:', url);
    
    return this._httpClient.get<any>(url).pipe(
      map(data => {
        return data;
      }),
    );
  }

  getCategories(): Observable<ICategoryResponse> {
    const url = `${this._baseUrl}Consultation`;
    console.log('Calling getCategories with URL:', url);
    
    return this._httpClient.get<ICategoryResponse>(url).pipe(
      map(data => {
        return data;
      }),
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
