import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserAd } from 'src/app/models/user-ad';
import { AdSize, IUserAdPackage, IUserAdSetup } from 'src/app/models/user-ad-package';
import { UserAdPackageStore } from 'src/app/shared/services/user-package-store';
import { UserSessionService } from 'src/app/shared/services/user-session-service';

@Component({
  selector: 'app-client-package-overview',
  templateUrl: './client-package-overview.component.html',
  styleUrls: ['./client-package-overview.component.scss']
})
export class ClientPackageOverviewComponent implements OnInit {
  public viewModel?: IViewModel = {} as IViewModel;
  private adPackage?: IUserAdPackage;
  private ads?: IUserAdSetup[];

  constructor(
    private userPackageStore: UserAdPackageStore,
    private router: Router,
    private _userSessionService: UserSessionService
  ) { }

  ngOnInit(): void {
    this.adPackage = this.userPackageStore.getPackageForUser();
    this.ads = this.userPackageStore.getAds();
    this.refreshViewModel();
  }

  refreshViewModel() {
    const configuredAds = this.ads?.map(x => <IPendingAd>{
      configured: !x.newAd,
      size: x.insert.pageType,
      ad: x.pendingAd,
      adId: x.id
    }) ?? [];

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
      pendingAds: configuredAds,
      adPackage: this.adPackage,
      adPackageSizes: sizes
    } as IViewModel
  }

  determineAvaialableAds() {

  }

  setupAd(pendingAd: IPendingAd) {
    this.userPackageStore.setCurrentAd(pendingAd.adId);
    this.router.navigateByUrl('/client-setup-ad');
  }

  checkout() {
    if (this._userSessionService.getSignedInUser() == null) {
      this._userSessionService.redirectUserToSignIn("/client-checkout")
    }
    else {
      this.router.navigateByUrl('/client-checkout');
    }
  }
}

interface IViewModel {
  pendingAds: IPendingAd[];
  adPackage: IUserAdPackage;
  adPackageSizes: { [key in AdSize]: number };
}

interface IPendingAd {
  configured: boolean;
  size: AdSize;
  ad?: IUserAd;
  adId: string;
}
