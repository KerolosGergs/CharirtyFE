import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../../../../Environment/environment';
import { map, Observable } from 'rxjs';
import { GeneralResponse, ImageItem, VideoItem } from '../../Interfaces/ILibrary/ilibrary';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  _httpClient = inject(HttpClient);
  protected readonly _environment = Environment;


  GetImages(): Observable<GeneralResponse<ImageItem[]>> {
    return this._httpClient.get<GeneralResponse<ImageItem[]>>(this._environment.apiUrl + 'ImageLibrary').pipe(
      map(response => {
        response.data.forEach(element => {
          element.imageUrl = `${this._environment.ImgUrl}${element.imageUrl}`;
        });
        return response;  // <-- You need to return the modified response
      })
    );
  }

  getActiveImages(): Observable<GeneralResponse<ImageItem[]>> {
    return this._httpClient.get<GeneralResponse<ImageItem[]>>(this._environment.apiUrl + 'ImageLibrary/active').pipe(
      map(response => {
        response.data.forEach(element => {
          element.imageUrl = `${this._environment.ImgUrl}${element.imageUrl}`;
        });
        return response;  // <-- You need to return the modified response
      })
    );
  }
  getImageById(id: number): Observable<GeneralResponse<ImageItem>> {
    return this._httpClient.get<GeneralResponse<ImageItem>>(this._environment.apiUrl + 'ImageLibrary/' + id);
  }
  postImage(data: FormData): Observable<GeneralResponse<ImageItem>> {
    return this._httpClient.post<GeneralResponse<ImageItem>>(this._environment.apiUrl + 'ImageLibrary', data);
  }
  updateImage(id: number, data: FormData): Observable<GeneralResponse<ImageItem>> {
    return this._httpClient.put<GeneralResponse<ImageItem>>(this._environment.apiUrl + 'ImageLibrary/' + id, data);
  }
  deleteImage(id: number): Observable<GeneralResponse<ImageItem>> {
    return this._httpClient.delete<GeneralResponse<ImageItem>>(this._environment.apiUrl + 'ImageLibrary/' + id);
  }
  getVideos(): Observable<GeneralResponse<VideoItem[]>> {
    return this._httpClient.get<GeneralResponse<VideoItem[]>>(this._environment.apiUrl + 'VideosLibrary');
  }
  getVideosActive(): Observable<GeneralResponse<VideoItem[]>> {
    return this._httpClient.get<GeneralResponse<VideoItem[]>>(this._environment.apiUrl + 'VideosLibrary/active');
  }
  getVideoById(id: number): Observable<GeneralResponse<VideoItem>> {
    return this._httpClient.get<GeneralResponse<VideoItem>>(this._environment.apiUrl + 'VideosLibrary/' + id);
  }
  postVideo(data: FormData): Observable<GeneralResponse<VideoItem>> {
    return this._httpClient.post<GeneralResponse<VideoItem>>(this._environment.apiUrl + 'VideosLibrary', data);
  }
  updateVideo(id: number, data: FormData): Observable<GeneralResponse<VideoItem>> {
    return this._httpClient.put<GeneralResponse<VideoItem>>(this._environment.apiUrl + 'VideosLibrary/' + id, data);
  }
  deleteVideo(id: number): Observable<GeneralResponse<VideoItem>> {
    return this._httpClient.delete<GeneralResponse<VideoItem>>(this._environment.apiUrl + 'VideosLibrary/' + id);
  }

}
