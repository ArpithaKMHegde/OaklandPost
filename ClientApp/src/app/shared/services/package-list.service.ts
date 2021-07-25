import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPackage } from 'src/app/models/package';
import { IPackageListResponse } from 'src/app/models/package-list-response';

@Injectable({
  providedIn: 'root'
})
export class PackageListService {

  private baseUrl = 'api/packagelist';

  constructor(private http: HttpClient) { }

  submitPackage(packageInfo: IPackage): Observable<Object> {
    return this.http.post<Object>(`${this.baseUrl}`, packageInfo);
  }

  getListOfPackages(): Observable<IPackageListResponse> {
    return this.http.get<IPackageListResponse>(`${this.baseUrl}`);
  }

  invalidatePackage(packageId: string): Observable<Object> {
    return this.http.post(`${this.baseUrl}/invalidate/${packageId}`, {});
  }

  getPackage(packageId: any): Observable<IPackage> {
    return this.http.get<IPackage>(`${this.baseUrl}/package/${packageId}`);
  }
}
