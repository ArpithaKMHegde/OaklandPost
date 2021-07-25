import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMyAdsInsertsAvailableModel, IMyAdsRunningAdsModel } from '../../models/my-ads-model';
import { DbMyAdsService } from './my-ads.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { UserSessionService } from 'src/app/shared/services/user-session-service';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.scss']
})
export class MyAdsComponent implements OnInit {

  public InsertsAvailable: IMyAdsInsertsAvailableModel[] = [];
  public AdsToBeReviewed: IMyAdsRunningAdsModel[] = [];
  public RunningAds: IMyAdsRunningAdsModel[] = [];
  public CompletedAds: IMyAdsRunningAdsModel[] = [];
  private _userId: string = "";

  constructor(
    private router: Router,
    private dbMyAdsService: DbMyAdsService,
    private _userSessionService: UserSessionService) { }

  ngOnInit(): void {
    this._userId = this._userSessionService.getSignedInUser()?.id ?? "";
    this.dbMyAdsService.getAvailableInserts(this._userId).subscribe(result => this.InsertsAvailable = result);
    this.dbMyAdsService.getAdsToBeReviewed(this._userId).subscribe(result => this.AdsToBeReviewed = result);
    this.dbMyAdsService.getRunningAds(this._userId).subscribe(result => this.RunningAds = result);
    this.dbMyAdsService.getCompletedAds(this._userId).subscribe(result => this.CompletedAds = result);
  }

  onTabChanged(event: MatTabChangeEvent) {
    let selectedTab = event.index;
    if (selectedTab == 0) {
      return this.InsertsAvailable;
    }
    else if (selectedTab == 1) {
      return this.AdsToBeReviewed;
    }
    else if (selectedTab == 2) {
      return this.RunningAds;
    }
    else {
      return this.CompletedAds;
    }
  }

  setupAd(adId: string) {
    this.router.navigateByUrl(`/client-setup-insert/${adId}`);
  }

  viewAd(adId: string) {
    this.router.navigateByUrl(`/client-view-ads/${adId}`);
  }

  navigateToClientPackageSelection(): void {
    this.router.navigateByUrl('/package-selection');
  }

  navigateToSetupAd(): void {
    this.router.navigateByUrl('/client-setup-ad');
  }
}
