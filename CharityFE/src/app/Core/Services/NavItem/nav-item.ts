import { inject, Injectable } from '@angular/core';
import { ApiResponse, NavItemDto, NavItems, PageDto, Pages } from '../../Interfaces/NavItem/nav-item';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../../../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class NavItemService {
 private http = inject(HttpClient);
  // لو عندك Route [Route("api/[controller]")] في الكنترولر واسم الكنترولر NavController
  private base = `${Environment.apiUrl}Nav/`;

  /** ======= NavItems ======= */

  /** GET: api/nav/navitems */
  getAllNavItems(): Observable<ApiResponse<NavItemDto[]>> {
    return this.http.get<ApiResponse<NavItemDto[]>>(`${this.base}navitems`);
  }

  /** GET: api/nav/navitems/{id} */
  getNavItem(id: number): Observable<ApiResponse<NavItemDto>> {
    return this.http.get<ApiResponse<NavItemDto>>(`${this.base}navitems/${id}`);
  }

  /** POST: api/nav/navitems  (يرجع ApiResponse<NavItems>) */
  addNavItem(payload: NavItems): Observable<ApiResponse<NavItems>> {
    return this.http.post<ApiResponse<NavItems>>(`${this.base}navitems`, payload);
  }

  /** PUT: api/nav/navitems/{id}  (يرجع ApiResponse<NavItems>) */
  updateNavItem(id: number, payload: NavItems): Observable<ApiResponse<NavItems>> {
    return this.http.put<ApiResponse<NavItems>>(`${this.base}navitems/${id}`, payload);
  }

  /** DELETE: api/nav/navitems/{id}  (يرجع ApiResponse<object>) */
  deleteNavItem(id: number): Observable<ApiResponse<unknown>> {
    return this.http.delete<ApiResponse<unknown>>(`${this.base}navitems/${id}`);
  }

  /** ======= Pages ======= */

  /** GET: api/nav/navitems/{navItemId}/pages */
  getPages(navItemId: number): Observable<ApiResponse<PageDto[]>> {
    return this.http.get<ApiResponse<PageDto[]>>(`${this.base}navitems/${navItemId}/pages`);
  }

  /** POST: api/nav/navitems/{navItemId}/pages  (يرجع ApiResponse<Pages>) */
  addPage(navItemId: number, page: Pages): Observable<ApiResponse<Pages>> {
    return this.http.post<ApiResponse<Pages>>(`${this.base}navitems/${navItemId}/pages`, page);
  }

  /** PUT: api/nav/pages/{id}  (يرجع ApiResponse<Pages>) */
  updatePage(id: number, page: Pages): Observable<ApiResponse<Pages>> {
    return this.http.put<ApiResponse<Pages>>(`${this.base}pages/${id}`, page);
  }

  /** DELETE: api/nav/pages/{id}  (يرجع ApiResponse<object>) */
  deletePage(id: number): Observable<ApiResponse<unknown>> {
    return this.http.delete<ApiResponse<unknown>>(`${this.base}pages/${id}`);
  }

  /** ======= مساعدات اختيارية لو عايز الداتا فقط بدون اللفافة ======= */

  /** أمثلة: 
   * this.navService.getAllNavItemsData().subscribe(items => { ... });
   */
  getAllNavItemsData() {
    return this.getAllNavItems().pipe(map(res => res.data ?? []));
  }

  getNavItemData(id: number) {
    return this.getNavItem(id).pipe(map(res => res.data!));
  }

  getPagesData(navItemId: number) {
    return this.getPages(navItemId).pipe(map(res => res.data ?? []));
  }
}