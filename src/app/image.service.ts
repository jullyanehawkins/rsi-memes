import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Image } from './image';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private query: string;
  private API_KEY: string = environment.MEME_API_KEY;
  private imageUrl: string = environment.MEME_API_URL;
  private URL: string = this.imageUrl + this.API_KEY + '&q=';
  private perPage: string = '&per_page=5';

  constructor(private http: HttpClient) { }
  getImage(query) {
    return this.http.get(this.URL + query + this.perPage)
    .map(res => res.json());
  }
  }




