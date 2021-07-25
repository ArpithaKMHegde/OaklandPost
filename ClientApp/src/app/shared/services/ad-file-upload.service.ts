import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAdUploadFileResponse } from 'src/app/models/ad-upload-file-response';

@Injectable({
    providedIn: 'root'
})
export class AdFileUploadService {

    private baseUrl = 'api/adfile';

    constructor(private http: HttpClient) { }

    upload(file: File): Observable<HttpEvent<IAdUploadFileResponse>> {
        const formData: FormData = new FormData();

        formData.append('file', file);

        const req = new HttpRequest('POST', `${this.baseUrl}/upload/file`, formData, {
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request<IAdUploadFileResponse>(req);
    }

    download(fileId: string) {
        window.open(`${this.baseUrl}/download/file/${fileId}`, "_blank");
    }
}