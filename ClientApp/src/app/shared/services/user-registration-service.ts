import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserRegistration } from 'src/app/models/user-registration';
import { IRegisterUserResponse } from 'src/app/models/register-user-response';

@Injectable({
    providedIn: 'root'
})
export class UserRegistrationService {

    private baseUrl = 'api/userregistration';

    constructor(private http: HttpClient) { }    

    create(userRegistration: IUserRegistration): Observable<IUserRegistration> {
        return this.http.put<IUserRegistration>(`${this.baseUrl}`, userRegistration);
    }

    registerUser(request: IUserRegistration): Observable<IRegisterUserResponse> {
        return this.http.post<IRegisterUserResponse>(`${this.baseUrl}/register`, request);
    }
}