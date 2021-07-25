import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { IAdminAdReviewsListModel } from '../../models/admin-ad-reviews-list-model';
import { DbAdminAdReviewsListService } from './admin-ad-reviews-list.service';

@Component({
  selector: 'app-admin-ad-reviews-view',
  templateUrl: './admin-ad-reviews-list.component.html',
  styleUrls: ['./admin-ad-reviews-list.component.scss']
})
export class AdminAdReviewsListViewComponent implements OnInit {
  public OpenAds: IAdminAdReviewsListModel[] = [];
  public ConfirmedAds: IAdminAdReviewsListModel[] = [];
  public DeniedAds: IAdminAdReviewsListModel[] = [];

  constructor(
    private dbAdminAdReviewsListService: DbAdminAdReviewsListService,
    private router: Router) { }

  ngOnInit(): void {
    this.dbAdminAdReviewsListService.getOpenAdReviewsListData().subscribe(result => this.OpenAds = result);
    this.dbAdminAdReviewsListService.getConfirmedAdReviewsListData().subscribe(result => this.ConfirmedAds = result);
    this.dbAdminAdReviewsListService.getDeniedAdReviewsListData().subscribe(result => this.DeniedAds = result);
  }

  onTabChanged(event: MatTabChangeEvent) {
    let clickedIndex = event.index;
    if (clickedIndex == 0) {
      return this.OpenAds;
    }
    if (clickedIndex == 1) {
      return this.ConfirmedAds;
    }
    else {
      return this.DeniedAds;
    }
  }

  viewOpenAd(adId: string) {
    this.router.navigateByUrl(`/admin-ad-review/${adId}`);
  }

  viewConfirmedAd(adId: string) {
    this.router.navigateByUrl(`/admin-view-confirmed-ad-details/${adId}`);
  }
}
