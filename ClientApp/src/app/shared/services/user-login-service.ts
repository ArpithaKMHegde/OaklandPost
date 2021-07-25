import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { IUserLogin } from "src/app/models/user-login";
import { Injectable } from "@angular/core";
import { ILoginResponse } from "src/app/models/login-response";
import { IUser } from "src/app/models/user";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private baseUrl = 'api/login';

    constructor(private http: HttpClient) { }

    login(login: IUserLogin): Observable<ILoginResponse> {
        return this.http.post<ILoginResponse>(`${this.baseUrl}`, login);
    }

    updateAccountInfo(accountInfo: IUser): Observable<Object> {
        return this.http.post(`${this.baseUrl}/update`, accountInfo);
    }
}
