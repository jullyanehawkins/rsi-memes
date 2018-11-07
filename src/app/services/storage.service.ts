import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API } from '../api';

@Injectable()
export class StorageService {
    private STORAGE_API = '/storage';
    private UPLOAD_BLANK_MEME = '/upload-blank-meme';

    constructor(private http: HttpClient) { }

    /** POST: add a new user to the server */
    upload(file, onResponse: (response) => void, onError: (err) => void, onComplete: () => void): Subscription {
        const formData: FormData = new FormData();
        formData.append('file', file);
        return this.http
            .post(API.API + this.STORAGE_API + this.UPLOAD_BLANK_MEME, formData, { responseType: 'text' })
            .subscribe(onResponse, onError, onComplete);
    }
}
