import { Component, OnInit } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { IUserAd } from '../../models/user-ad';
import { AdFileUploadService } from '../../shared/services/ad-file-upload.service';
import { AdService } from '../../shared/services/ad-service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { IUserFileUpload } from '../../models/user-file-upload';
import { ReviewAdService } from 'src/app/shared/services/review-ad-service';
import { IReviewAd } from 'src/app/models/review-ad';
import { IClientViewAd } from 'src/app/models/client-view-ad';
import { IPackage } from 'src/app/models/package';

@Component({
  selector: 'app-admin-ad-review',
  templateUrl: './admin-ad-review.component.html',
  styleUrls: ['./admin-ad-review.component.scss']
})
export class AdminAdReviewComponent implements OnInit {

  public viewModel: IViewModel = {} as IViewModel;
  private _adId: string = "";
  public _ad?: IUserAd;
  public _adInfo: IClientViewAd = {} as IClientViewAd;
  private _loading: boolean = true;
  public _packageInfo: IPackage = {} as IPackage;
  public _userEmail: string = '';
  public _adComments: string = '';

  constructor(
    private _adFileUploadService: AdFileUploadService,
    private _adService: AdService,
    private _route: ActivatedRoute,
    private reviewAdService: ReviewAdService,
    private _router: Router) { }

  ngOnInit(): void {
    this.setupViewModel();

    this._route.params.subscribe({
      next: x => {
        this._adId = x['id'];

        this._adService.getAd(this._adId).subscribe(y => {
          this._ad = y;
          this.setupViewModel();
        })
        this._adService.getClientViewAd(this._adId).subscribe(adInfo => {
          this._adInfo = adInfo;
        })
        this._adService.getEmailByUserAdId(this._adId).subscribe(email => {
          this._userEmail = email;
        })
      }
    })
  }

  setupViewModel() {
    if (!this._ad) {
      this.viewModel = {
        files: [],
        selectedAdLocation: "",
        startDate: null,
        endDate: null,
        startDateString: "",
        endDateString: "",
        isColor: true,
        adSubmitting: false,
        ad: undefined,
        loading: this._loading,
        calendarRange: undefined
      }
      return;
    }

    const startDate = moment(this._ad?.startDate);
    const endDate = moment(this._ad?.endDate);
    this.viewModel = {
      files: this._ad?.files.map(x => x.userFileUpload) ?? [],
      selectedAdLocation: this._ad?.location ?? "Not Selected",
      startDate: moment(this._ad?.startDate) as Moment,
      endDate: moment(this._ad?.endDate) as Moment,
      startDateString: startDate.format("MM/DD/YYYY"),
      endDateString: endDate.format("MM/DD/YYYY"),
      isColor: true,
      adSubmitting: false,
      ad: this._ad,
      loading: this._loading,
      calendarRange: new DateRange<Moment>(startDate, endDate)
    }
  }

  downloadFile(fileId: string) {
    this._adFileUploadService.download(fileId);
  }

  submitAd(accepted: boolean) {
    const reviewAdStatus = {
      id: '00000000-0000-0000-0000-000000000000',
      userAd: this._ad,
      comments: this._adComments,
      approved: accepted,
      rejected: !accepted
    } as IReviewAd

    this.reviewAdService.review(reviewAdStatus).subscribe(() => {
      this._router.navigateByUrl("/admin-ad-reviews-list")
    });
  }
}

interface IViewModel {
  files: IUserFileUpload[];
  selectedAdLocation: string;
  startDate: Moment | undefined | null;
  endDate: Moment | undefined | null;
  calendarRange?: DateRange<Moment>;
  startDateString: string;
  endDateString: string;
  isColor: boolean;
  adSubmitting: boolean;
  ad?: IUserAd;
  loading: boolean;
}
