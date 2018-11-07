import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API } from '../api';

@Injectable()
export class AuthenticationService {
    private SIGNUP_API = '/sign-up';
    private LOGIN_API = '/login';
    private API_URL = '/api';

    constructor(private http: HttpClient) { }

    /** POST: add a new user to the server */
    create(email: string, password: string, onResponse: (response) => void, onError: (err) => void, onComplete: () => void): Subscription {
        const formData: FormData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        console.log(API + this.API_URL  + this.SIGNUP_API);
        return this.http
            .post(API + this.API_URL + this.SIGNUP_API, formData, { responseType: 'text' })
            .subscribe(onResponse, onError, onComplete);
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { email: email, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
