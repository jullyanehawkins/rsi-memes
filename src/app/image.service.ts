import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  // getImage() Observable<Image[]>() {
  //   return  this.httpClient.get(`${'this.http://version1.api.memegenerator.net/#MgImages_Search'}/image`);
  }
}



