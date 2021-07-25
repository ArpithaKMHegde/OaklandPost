import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserAd } from 'src/app/models/user-ad';
import { ILinkAdFilesRequest } from 'src/app/models/link-ad-files-request';
import { ICreateUserPackageRequest } from 'src/app/models/create-user-package-request';
import { IClientViewAd } from 'src/app/models/client-view-ad';
import { IInsertInfo } from 'src/app/models/insert-info';
import { IUserAdCreate } from 'src/app/models/ad-create';

@Injectable({
    providedIn: 'root'
})
export class AdService {
    private baseUrl = 'api/ad';

    constructor(private http: HttpClient) { }

    create(userAd: IUserAdCreate): Observable<IUserAd> {
        return this.http.put<IUserAd>(`${this.baseUrl}`, userAd);
    }

    linkAdFiles(request: ILinkAdFilesRequest): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/link/ad/files`, request);
    }

    getAd(id: string): Observable<IUserAd> {
        return this.http.get<IUserAd>(`${this.baseUrl}/review/open/${id}`);
    }

    getClientViewAd(id: string): Observable<IClientViewAd> {
        return this.http.get<IClientViewAd>(`${this.baseUrl}/review/detail/${id}`);
    }

    createUserPackage(userPackage: ICreateUserPackageRequest): Observable<Object> {
        return this.http.put(`${this.baseUrl}/user/package`, userPackage);
    }

    getInsert(insertId: any) {
        return this.http.get<IInsertInfo>(`${this.baseUrl}/insertinfo/${insertId}`);
    }

    getEmailByUserAdId(userAdId: string): Observable<string> {
        return this.http.get<string>(`${this.baseUrl}/user/email/${userAdId}`);
    }
}
