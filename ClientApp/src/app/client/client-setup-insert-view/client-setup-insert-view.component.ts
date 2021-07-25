import { Component, OnInit } from '@angular/core';
import { DateRange, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { AdService } from 'src/app/shared/services/ad-service';
import { AdFileUploadService } from 'src/app/shared/services/ad-file-upload.service';
import { IInsertInfo } from 'src/app/models/insert-info';
import { IUserAd } from 'src/app/models/user-ad';
import { forkJoin } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IAdUploadFileResponse } from 'src/app/models/ad-upload-file-response';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-client-setup-insert-view',
  templateUrl: './client-setup-insert-view.component.html',
  styleUrls: ['./client-setup-insert-view.component.scss']
})
export class ClientSetupInsertViewComponent implements OnInit {
  private document;
  private adTypeLocations: { [adType: string]: string[] } = {
    "Full-Page": ["Page"],
    "Half-Page": ["Top", "Bottom"],
    "Quarter-Page": ["Top Left", "Top Right", "Bottom Left", "Bottom Right"]
  }

  public viewModel: IViewModel = {} as IViewModel;
  public insertInfo: IInsertInfo = {} as IInsertInfo;

  constructor(private router: Router,
    private _route: ActivatedRoute,
    private _adService: AdService,
    private _adFileUploadService: AdFileUploadService,
    @Inject(DOCUMENT) document: Document) {
    this.document = document;
  }

  ngOnInit(): void {
    this._route.params.subscribe(x => {
      var insertId = x['id'];

      this._adService.getInsert(insertId).subscribe(x => {
        this.insertInfo = x;
        this.refreshViewModel();
      });
    });
  }

  refreshViewModel() {
    this.viewModel = {
      adLocations: this.adTypeLocations[this.insertInfo?.insert.pageType ?? ""],
      files: [],
      selectedAdLocation: "Not Selected",
      startDate: null,
      endDate: null,
      startDateString: "",
      endDateString: "",
      isColor: this.insertInfo.package.isColor,
      adSubmitting: false,
      submittedDate: new Date(),
    }
  }

  radioChanged(event: any) {
    this.viewModel.selectedAdLocation = event.value;
  }

  startDateChanged(event: MatDatepickerInputEvent<Moment, DateRange<any>>) {
    this.viewModel.startDate = event.value;
    this.viewModel.startDateString = event.value?.format("MM/DD/YYYY") ?? "";
  }

  endDateChanged(event: MatDatepickerInputEvent<Moment, DateRange<any>>) {
    this.viewModel.endDate = event.value;
    this.viewModel.endDateString = event.value?.format("MM/DD/YYYY") ?? "";
  }

  submitAd() {
    const userAd = {
      submittedDate: this.viewModel.submittedDate,
      startDate: this.viewModel.startDate?.toDate(),
      endDate: this.viewModel.endDate?.toDate(),
      location: this.viewModel.selectedAdLocation
    } as IUserAd;

    let fileObservables = this.viewModel.files.map(file => this._adFileUploadService.upload(file));

    this.viewModel.adSubmitting = true;
    forkJoin([forkJoin([...fileObservables]), this._adService.create({
      insertId: this.insertInfo.insert.id,
      userAd: userAd,
      userInsertId: this.insertInfo.userInsertId
    })]).subscribe((x) => {
      const fileUploadEvents = x[0] as HttpResponse<IAdUploadFileResponse>[];
      const userAd = x[1] as IUserAd;
      const adFileIds = fileUploadEvents.filter(x => x.body).map(x => x.body!.id);

      this._adService.linkAdFiles({
        fileUploadIds: adFileIds,
        userAdId: userAd.id
      }).subscribe(() => {
        this.router.navigateByUrl('/my-ads');
      })
    });

  }

  browseFiles(): void {
    this.document.getElementById('browse-files')?.click();
  }

  addFiles(file: any) {
    this.viewModel.files.push(file.target.files[0]);
  }

  dateFilter(date: Date | null): boolean {
    if (!date) {
      return false;
    }

    var momentDate = moment();
    momentDate.add(1, 'day');

    return date > momentDate.toDate();
  }
}

interface IViewModel {
  adLocations: string[];
  files: File[];
  selectedAdLocation: string;
  startDate: Moment | undefined | null;
  endDate: Moment | undefined | null;
  startDateString: string;
  endDateString: string;
  isColor: boolean;
  adSubmitting: boolean;
  submittedDate: Date;
}
