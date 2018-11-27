import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Images } from './image';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public image: HTMLImageElement;
  private query: string;
  private API_KEY: string = environment.MEME_API_KEY;
  private imageUrl: string = environment.MEME_API_URL;
  private URL: string = this.imageUrl + '&api_key=' + this.API_KEY + '&q=';
  // private perPage: string = '&per_page=5';

  constructor(private http: Http) {}
  getImage(query): Observable<Images[]> {
    console.log(this.URL + query);
    return this.http
      .get(this.URL + query)
      .pipe(map(response => <Images[]>response.json()));
  }

  }

