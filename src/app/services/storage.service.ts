import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Images } from '../image';
import { STORAGE } from '../api';

@Injectable()
export class StorageService {
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

    pullMemes(tags: string, onResponse: (response) => void, onError: (err) => void, onComplete: () => void): Subscription {
        const formData: FormData = new FormData();
        tags = tags.replace(' ', ',');
        return this.http
            .get<Images[]>(STORAGE.PATH + STORAGE.UPLOAD_MEME + '/&q=' + tags)
            .pipe(map(response => <Images[]>response))
            .subscribe(onResponse, onError, onComplete);
    }
}
