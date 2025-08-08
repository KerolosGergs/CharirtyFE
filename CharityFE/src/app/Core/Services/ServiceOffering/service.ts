import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../../../../Environment/environment';
import { Observable, map } from 'rxjs';
import {
  IApiResponse,
  IServiceOfferingDTO,
  IUpdateServiceOfferingDTO,
  ServiceItem,
  ICreateServiceOfferingItemDTO,
  UpdateServiceItem
} from '../../Interfaces/ServiceOffering/iservice';

@Injectable({
  providedIn: 'root'
})
export class Service {
  private baseUrl = `${Environment.apiUrl}serviceoffering`;

  constructor(private http: HttpClient) {}

  // ✅ GET: Full Service Offering (title + items)
  getAll(): Observable<IApiResponse<IServiceOfferingDTO>> {
    return this.http.get<IApiResponse<IServiceOfferingDTO>>(`${this.baseUrl}`).pipe(
      map(response => {
        response.data.serviceItem.forEach(item => {
          item.imageUrl = `${Environment.ImgUrl}${item.imageUrl}`;
        });
        return response;
      })
    );
  }
  // ✅ GET: Full Service Offering (title + items)
   getAllAvailable(): Observable<IApiResponse<IServiceOfferingDTO>> {
    return this.http.get<IApiResponse<IServiceOfferingDTO>>(`${this.baseUrl}/Avalible`).pipe(
      map(response => {
        response.data.serviceItem.forEach(item => {
          item.imageUrl = `${Environment.ImgUrl}${item.imageUrl}`;
        });
        return response;
      })
    );
  }

  // ✅ GET: Only items
  getItems(): Observable<IApiResponse<ServiceItem[]>> {
    return this.http.get<IApiResponse<ServiceItem[]>>(`${this.baseUrl}/items`).pipe(
      map(response => {
        response.data.forEach(item => {
          item.imageUrl = `${Environment.ImgUrl}${item.imageUrl}`;
        });
        return response;
      })
    );
  }

  // ✅ PUT: Update title + description
  updateMainOffering(updateData: IUpdateServiceOfferingDTO): Observable<IApiResponse<boolean>> {
    return this.http.put<IApiResponse<boolean>>(`${this.baseUrl}/title-description`, updateData);
  }

  // // ✅ GET: Service item by ID
  // getById(id: number): Observable<IApiResponse<ServiceItem>> {
  //   return this.http.get<IApiResponse<ServiceItem>>(`${this.baseUrl}/items/${id}`).pipe(
  //     map(res => {
  //       res.data.imageUrl = `${Environment.ImgUrl}${res.data.imageUrl}`;
  //       return res;
  //     })
  //   );
  // }

  // ✅ POST: Create new item
  createItem(dto: FormData): Observable<IApiResponse<ServiceItem>> {
    return this.http.post<IApiResponse<ServiceItem>>(`${this.baseUrl}/items`, dto);
  }

  // ✅ PUT: Update item
  updateItem(id: number, dto: FormData): Observable<IApiResponse<ServiceItem>> {
    return this.http.put<IApiResponse<ServiceItem>>(`${this.baseUrl}/items/${id}`, dto);
  }

  // ✅ DELETE: Delete item
  deleteItem(id: number): Observable<IApiResponse<boolean>> {
    return this.http.delete<IApiResponse<boolean>>(`${this.baseUrl}/items/${id}`);
  }


}
