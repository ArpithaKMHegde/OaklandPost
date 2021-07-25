import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMyAdsInsertsAvailableModel } from '../../models/my-ads-model';
import { IMyAdsRunningAdsModel } from '../../models/my-ads-model';

@Injectable({
  providedIn: 'root'
})
export class DbMyAdsService {

  private baseUrl = 'api/myads';

  constructor(private httpClient: HttpClient) { }

  public getAvailableInserts(userId: string): Observable<IMyAdsInsertsAvailableModel[]> {
    return this.httpClient.get<IMyAdsInsertsAvailableModel[]>(`${this.baseUrl}/getAvailableInserts/${userId}`);
  }

  public getAdsToBeReviewed(userId: string): Observable<IMyAdsRunningAdsModel[]> {
    return this.httpClient.get<IMyAdsRunningAdsModel[]>(`${this.baseUrl}/getAdsToBeReviewed/${userId}`);
  }

  public getRunningAds(userId: string): Observable<IMyAdsRunningAdsModel[]> {
    return this.httpClient.get<IMyAdsRunningAdsModel[]>(`${this.baseUrl}/getRunningAds/${userId}`);
  }

  public getCompletedAds(userId: string): Observable<IMyAdsRunningAdsModel[]> {
    return this.httpClient.get<IMyAdsRunningAdsModel[]>(`${this.baseUrl}/getCompletedAds/${userId}`);
  }
}
