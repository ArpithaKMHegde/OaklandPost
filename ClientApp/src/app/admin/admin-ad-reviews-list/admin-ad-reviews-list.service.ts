import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAdminAdReviewsListModel } from '../../models/admin-ad-reviews-list-model';

@Injectable({
  providedIn: 'root'
})
export class DbAdminAdReviewsListService {

  private baseUrl = 'api/adminadreviewslist';
  
  constructor(private httpClient: HttpClient) { }

  public getOpenAdReviewsListData(): Observable<IAdminAdReviewsListModel[]> {
    return this.httpClient.get<IAdminAdReviewsListModel[]>(`${this.baseUrl}/getOpenAds`);
  }

  public getConfirmedAdReviewsListData(): Observable<IAdminAdReviewsListModel[]> {
    return this.httpClient.get<IAdminAdReviewsListModel[]>(`${this.baseUrl}/getConfirmedAds`);
  }

  public getDeniedAdReviewsListData(): Observable<IAdminAdReviewsListModel[]> {
    return this.httpClient.get<IAdminAdReviewsListModel[]>(`${this.baseUrl}/getDeniedAds`);
  }

}
