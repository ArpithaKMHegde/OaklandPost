import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPackage } from 'src/app/models/package';
import { IUserAd } from 'src/app/models/user-ad';
import { AdService } from 'src/app/shared/services/ad-service';

@Component({
  selector: 'app-admin-view-confirmed-ad-details',
  templateUrl: './admin-view-confirmed-ad-details.component.html',
  styleUrls: ['./admin-view-confirmed-ad-details.component.scss']
})
export class AdminViewConfirmedAdDetailsComponent implements OnInit {

  _userAd: IUserAd = {} as IUserAd;
  _pageType = '';
  _package: IPackage = {} as IPackage;
  _adId = '';
  _adStatus = '';
  _adReviewedDate = '';
  _fileLength = 0;

  constructor(
    private _route: ActivatedRoute,
    private _adService: AdService) { }

  ngOnInit(): void {
    this._route.params.subscribe({
      next: ad => {
        this._adId = ad['id'];
        this._adService.getClientViewAd(this._adId).subscribe(adDetails => {
          this._userAd = adDetails.userAd;
          this._pageType = adDetails.pageType;
          this._package = adDetails.package;
          this._fileLength = adDetails.userAd.files.length;
          if (this._userAd.reviewedAd.approved) {
            this._adStatus = 'Approved';
          } else {
            this._adStatus = 'Rejected';
          }
        })
      }
    })
  }
}
