import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Images } from '../image';
import { STORAGE } from '../api';

@Injectable()
export class StorageService {
    httpOptions = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*'
        })
    };

    constructor(private http: HttpClient) { }

    /** POST: add a new image to the server */
    uploadMeme(file, tags: string, onResponse: (response) => void, onError: (err) => void, onComplete: () => void): Subscription {
        const formData: FormData = new FormData();
        formData.append('file', file);
        formData.append('tags', tags);
        return this.http
            .post(STORAGE.PATH + STORAGE.UPLOAD_MEME, formData, { responseType: 'text' })
            .subscribe(onResponse, onError, onComplete);
    }

    /** GET: pull images */
    pullMemes(tags: string, onResponse: (response) => void, onError: (err) => void, onComplete: () => void): Subscription {
        const formData: FormData = new FormData();
        tags = tags.replace(' ', ',');
        return this.http
            .get<Images[]>(STORAGE.PATH + STORAGE.UPLOAD_MEME + '/&q=' + tags, this.httpOptions)
            .pipe(map(response => <Images[]>response))
            .subscribe(onResponse, onError, onComplete);
    }
}
