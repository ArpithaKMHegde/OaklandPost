import { Component, Inject, OnInit } from '@angular/core';
import { DateRange, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { Router } from '@angular/router';
import { UserAdPackageStore } from 'src/app/shared/services/user-package-store';
import { IUserAdPending } from 'src/app/models/user-ad-pending';
import * as moment from 'moment';
import { DOCUMENT } from '@angular/common';
import { IUserAdPackage } from 'src/app/models/user-ad-package';

@Component({
  selector: 'app-client-setup-ad-view',
  templateUrl: './client-setup-ad-view.component.html',
  styleUrls: ['./client-setup-ad-view.component.scss']
})
export class ClientSetupAdViewComponent implements OnInit {
  private document;
  private adTypeLocations: { [adType: string]: string[] } = {
    "Full-Page": ["Page"],
    "Half-Page": ["Top", "Bottom"],
    "Quarter-Page": ["Top Left", "Top Right", "Bottom Left", "Bottom Right"]
  }
  public userAd: IUserAdPending = {} as IUserAdPending;
  public viewModel: IViewModel = {} as IViewModel;
  public adPackage?: IUserAdPackage;

  constructor(
    private router: Router,
    private _userAdPackageStore: UserAdPackageStore,
    private userPackageStore: UserAdPackageStore,
    @Inject(DOCUMENT) document: Document) {
    this.document = document;
  }

  ngOnInit(): void {
    var currentAd = this._userAdPackageStore.getCurrentAd();
    this.adPackage = this.userPackageStore.getPackageForUser();

    this.viewModel = {
      adLocations: this.adTypeLocations[currentAd?.insert?.pageType ?? ""],
      files: currentAd?.pendingAd?.files ?? [],
      selectedAdLocation: currentAd?.pendingAd?.location ?? "Not Selected",
      startDate: currentAd?.pendingAd?.startDate ? moment(currentAd?.pendingAd?.startDate) : null,
      endDate: currentAd?.pendingAd?.endDate ? moment(currentAd?.pendingAd?.endDate) : null,
      startDateString: currentAd?.pendingAd?.startDate ? moment(currentAd?.pendingAd?.startDate).format("MM/DD/YYYY") : "",
      endDateString: currentAd?.pendingAd?.endDate ? moment(currentAd?.pendingAd?.endDate).format("MM/DD/YYYY") : "",
      isColor: true,
      adSubmitting: false,
      submittedDate: new Date(),
    }

    this.userAd = {
      submittedDate: this.viewModel.submittedDate,
      startDate: this.viewModel.startDate?.toDate(),
      endDate: this.viewModel.endDate?.toDate(),
      location: this.viewModel.selectedAdLocation,
      files: this.viewModel.files,
      insert: currentAd?.insert,
      id: currentAd?.id
    } as IUserAdPending;
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
    var currentAd = this._userAdPackageStore.getCurrentAd();

    const userAd = {
      submittedDate: this.viewModel.submittedDate,
      startDate: this.viewModel.startDate?.toDate(),
      endDate: this.viewModel.endDate?.toDate(),
      location: this.viewModel.selectedAdLocation,
      files: this.viewModel.files,
      insert: currentAd?.insert,
      id: currentAd?.id
    } as IUserAdPending;

    if (currentAd == null) {
      return;
    }

    this._userAdPackageStore.updatePackageAd(currentAd.id, userAd);
    this.router.navigateByUrl('/client-package-overview');
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

  fieldsAreValid() {
    return this.viewModel?.startDate &&
      this.viewModel?.endDate &&
      this.viewModel?.selectedAdLocation &&
      this.viewModel?.files?.length;
  }

  cancel() {
    this.router.navigateByUrl("/client-package-overview");
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
