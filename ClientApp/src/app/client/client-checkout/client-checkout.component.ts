import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { IAdUploadFileResponse } from 'src/app/models/ad-upload-file-response';
import { IPaymentInformation } from 'src/app/models/payment-information';
import { AdSize, IUserAdPackage, IUserAdSetup } from 'src/app/models/user-ad-package';
import { IUserAdPending } from 'src/app/models/user-ad-pending';
import { IUserAdUpload } from 'src/app/models/user-ad-upload';
import { AdFileUploadService } from 'src/app/shared/services/ad-file-upload.service';
import { AdService } from 'src/app/shared/services/ad-service';
import { UserAdPackageStore } from 'src/app/shared/services/user-package-store';
import { UserSessionService } from 'src/app/shared/services/user-session-service';
import { defaultIfEmpty } from 'rxjs/operators'

@Component({
  selector: 'app-client-checkout',
  templateUrl: './client-checkout.component.html',
  styleUrls: ['./client-checkout.component.scss']
})
export class ClientCheckoutComponent implements OnInit {

  public _field: { [key: string]: boolean } = {};
  public _name = true;
  public _address1: boolean = true;
  public _address2: boolean = true;
  public _city: boolean = true;
  public _state: boolean = true;
  public _creditCard: boolean = true;
  public _expirationDate: boolean = true;
  public _securityCode: boolean = true;
  public _zipCode: boolean = true;
  packages: Array<any> = [];
  public viewModel: IViewModel = {} as IViewModel;
  private ads?: IUserAdSetup[];
  private adPackage?: IUserAdPackage;

  constructor(
    private _userPackageStore: UserAdPackageStore,
    private _adFileUploadService: AdFileUploadService,
    private _adService: AdService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _userSessionService: UserSessionService
  ) { }

  ngOnInit(): void {
    this.adPackage = this._userPackageStore.getPackageForUser() ?? {} as IUserAdPackage;
    this.ads = this._userPackageStore.getAds() ?? [];

    this.refreshViewModel();
  }

  refreshViewModel() {
    var sizes: { [key in AdSize]: number } = {} as any;

    if (this.ads == null) {
      return;
    }

    for (var ad of this.ads) {
      if (sizes[ad.insert.pageType] == null) {
        sizes[ad.insert.pageType] = 0;
      }
      sizes[ad.insert.pageType] = sizes[ad.insert.pageType] + 1;
    }

    this.viewModel = {
      adPackage: this.adPackage,
      adPackageSizes: sizes,
      adSubmitting: false,
      paymentInformation: {
        addressLine1: "",
        addressLine2: "",
        city: "",
        creditCardCode: "",
        creditCardNumber: "",
        expirationDate: "",
        fullname: "",
        state: "",
        zip: ""
      },
      ads: this.ads
    }
  }

  placeOrder() {
    let adsCreated = this.ads?.filter(x =>
      !x.newAd && x.pendingAd !== undefined).map(x =>
        x.pendingAd as IUserAdPending);

    // Upload Files First
    var fileAdUploadObservables = adsCreated?.map(ad => {
      let filesToUpload = ad?.files.map(file => this._adFileUploadService.upload(file));
      return new Observable<IFileAd>(subscriber => {
        forkJoin(filesToUpload).subscribe({
          next: (httpEvents) => {
            let responseEvents = (<HttpResponse<IAdUploadFileResponse>[]>httpEvents).filter(
              httpEvent => httpEvent.body);
            subscriber.next({
              ad: ad,
              fileIds: responseEvents.map(response => response!.body!.id)
            });
          },
          complete: () => subscriber.complete()
        });
      })
    })

    // Wait for file uploads to complete
    forkJoin(fileAdUploadObservables).pipe(defaultIfEmpty()).subscribe(fileUploadAd => {
      this._adService.createUserPackage({
        ads: fileUploadAd?.map(y => <IUserAdUpload>{
          endDate: y.ad.endDate,
          fileIds: y.fileIds,
          location: y.ad.location,
          startDate: y.ad.startDate,
          submittedDate: y.ad.submittedDate,
          insertId: y.ad?.insert?.id
        }) ?? [],
        packageId: this.adPackage!.id,
        paymentInformation: this.viewModel.paymentInformation,
        userId: this._userSessionService.getSignedInUser()?.id ?? ""
      }).subscribe(() => {
        this._snackBar.open("Upload Complete!", undefined, {
          duration: 5000
        });
        this._router.navigateByUrl("/my-ads");
      });
    });
  }

  areFieldsValid(): boolean {
    if (
      this.viewModel.paymentInformation.fullname !== '' &&
      this.viewModel.paymentInformation.creditCardNumber !== '' &&
      this.viewModel.paymentInformation.expirationDate !== '' &&
      this.viewModel.paymentInformation.creditCardCode !== '' &&
      this.viewModel.paymentInformation.addressLine1 !== '' &&
      this.viewModel.paymentInformation.city !== '' &&
      this.viewModel.paymentInformation.state !== '' &&
      this.viewModel.paymentInformation.zip !== '' &&
      this._name && this._creditCard && this._expirationDate && this._securityCode &&
      this._address1 && this._state && this._city && this._zipCode &&
      this.viewModel.paymentInformation.creditCardNumber.length === 16 &&
      this.viewModel.paymentInformation.expirationDate.length === 5 &&
      this.viewModel.paymentInformation.creditCardCode.length <= 4 &&
      this.viewModel.paymentInformation.zip.length === 5) {
      return true;
    }
    return false;
  }

  onlyAlphaCharacters(event: any, formFieldName: string) {
    this.checkCurrentInputForAlphaCharacters(event.currentTarget.value, formFieldName);
  }

  onlyNumericCharacters(event: any, formFieldName: string) {
    this.checkCurrentInputForNumericCharacters(event.currentTarget.value, formFieldName);
  }

  setFormField(formFieldName: string, isValid: boolean) {
    switch (formFieldName) {
      case 'address1':
        this._address1 = isValid
        break;
      case 'address2':
        this._address2 = isValid
        break;
      case 'state':
        this._state = isValid
        break;
      case 'cardNumber':
        this._creditCard = isValid
        break;
      case 'expDate':
        this._expirationDate = isValid
        break;
      case 'secCode':
        this._securityCode = isValid
        break;
      case 'zipCode':
        this._zipCode = isValid
        break;
    }
  }

  checkForCreditCardName(event: any) {
    const name = event.currentTarget.value;
    if (name === '') {
      this._name = true;
    } else if (/^([(A-Z)|(a-z)]*)[\s]?[A-Z|a-z|\s]*$/.test(name)) {
      this._name = true;
    } else if (!/^([(A-Z)|(a-z)]*)[\s]?[A-Z|a-z|\s]*$/.test(name)) {
      this._name = false;
    }
  }

  checkCurrentInputForAlphaCharacters(value: string, formFieldName: string) {
    if (value === '') {
      this.setFormField(formFieldName, true);
    } else if (/(^[(A-Z)|(a-z)]*$)/.test(value)) {
      this.setFormField(formFieldName, true);
    } else if (!/(^[(A-Z)|(a-z)]*$)/.test(value)) {
      this.setFormField(formFieldName, false);
    }
  }

  checkCurrentInputForNumericCharacters(value: string, formFieldName: string) {
    if (value === '') {
      this.setFormField(formFieldName, true);
    } else if (/(^[1-9]*$)/.test(value)) {
      this.setFormField(formFieldName, true);
    } else if (!/(^[1-9]*$)/.test(value)) {
      this.setFormField(formFieldName, false);
    }
  }

  checkAddress(event: any, formFieldName: string) {
    const value = event.currentTarget.value;
    if (value === '') {
      this.setFormField(formFieldName, true);
    } else if (/^([1-9]+)[\s]([(A-Z)|(a-z)]*)\s*([(A-Z)|(a-z)]*)\.*$/.test(value)) {
      this.setFormField(formFieldName, true);
    } else if (!/^([1-9]+)[\s]([(A-Z)|(a-z)]*)\s*([(A-Z)|(a-z)]*)\.*$/.test(value)) {
      this.setFormField(formFieldName, false);
    }
  }

  checkCity(event: any) {
    const value = event.currentTarget.value;
    if (value === '') {
      this._city = true;
    } else if (/^([(A-Z)|(a-z)]*)\s*([(A-Z)|(a-z)]*)*$/.test(value)) {
      this._city = true;
    } else if (!/^([(A-Z)|(a-z)]*)\s*([(A-Z)|(a-z)]*)*$/.test(value)) {
      this._city = false;
    }
  }

  checkExpirationDate(event: any) {
    const value = event.currentTarget.value;
    if (value === '') {
      this._expirationDate = true;
    } else if (/(^[0-9]{2}\/[1-9]{2}$)/.test(value)) {
      this._expirationDate = true;
    } else if (!/(^[0-9]{2}\/[1-9]{2}$)/.test(value)) {
      this._expirationDate = false;
    }
  }
}

interface IViewModel {
  adPackage?: IUserAdPackage;
  adPackageSizes?: { [key in AdSize]: number };
  adSubmitting: boolean;
  paymentInformation: IPaymentInformation;
  ads: IUserAdSetup[] | undefined;
}

interface IFileAd {
  fileIds: string[];
  ad: IUserAdPending;
}
