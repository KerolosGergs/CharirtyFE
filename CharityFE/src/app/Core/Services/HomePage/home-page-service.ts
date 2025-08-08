import { ITrendSection } from './../../Interfaces/HomePage/ihome-page';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../../../../Environment/environment';
import { GeneralResponse, IHeroSection, IVideoSection } from '../../Interfaces/HomePage/ihome-page';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  _httpClient = inject(HttpClient);
  protected readonly _environment = Environment;


  getHeroSection(): Observable<GeneralResponse<IHeroSection>> {
    return this._httpClient.get<GeneralResponse<IHeroSection>>(this._environment.apiUrl + 'HomePage/hero-section').pipe(
      map(response => {
        
          response.data.backgroundImageUrl = `${this._environment.ImgUrl}${response.data.backgroundImageUrl}`;
        
        return response;  // <-- You need to return the modified response
      })
    );
  }
  putHeroSection(HeroData: FormData): Observable<GeneralResponse<IHeroSection>> {
    return this._httpClient.put<GeneralResponse<IHeroSection>>(this._environment.apiUrl + 'HomePage/hero-section', HeroData);
  }

  getVideoSection(): Observable<GeneralResponse<IVideoSection>> {
    return this._httpClient.get<GeneralResponse<IVideoSection>>(this._environment.apiUrl + 'HomePage/video-section');
  }
  putVideoSection(VideoData: FormData): Observable<GeneralResponse<IVideoSection>> {
    return this._httpClient.put<GeneralResponse<IVideoSection>>(this._environment.apiUrl + 'HomePage/video-section', VideoData);
  }
  getTrendSection(): Observable<GeneralResponse<ITrendSection>> {
    return this._httpClient.get<GeneralResponse<ITrendSection>>(this._environment.apiUrl + 'HomePage/trend-section').pipe(
      map(response => {
        
          response.data.imageUrl = `${this._environment.ImgUrl}${response.data.imageUrl}`;
        
        return response;  // <-- You need to return the modified response
      })
    );
  }
  putTrendSection(TrendData: FormData): Observable<GeneralResponse<ITrendSection>> {
    return this._httpClient.put<GeneralResponse<ITrendSection>>(this._environment.apiUrl + 'HomePage/trend-section', TrendData);
  }
}
