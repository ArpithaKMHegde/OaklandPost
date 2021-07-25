import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IAdminUserListResponse } from "src/app/models/admin-user-list-response";

@Injectable({
    providedIn: 'root'
})
export class UserInfoService {

    private baseUrl = 'api/userinfo'

    constructor(private http: HttpClient) { }

    getAdmins(): Observable<IAdminUserListResponse> {
        return this.http.get<IAdminUserListResponse>(`${this.baseUrl}`);
    }
}
