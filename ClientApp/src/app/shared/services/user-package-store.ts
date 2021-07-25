import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserRegistration } from 'src/app/models/user-registration';
import { IRegisterUserResponse } from 'src/app/models/register-user-response';
import { AdSize, IUserAdPackage, IUserAdPackageTime, IUserAdSetup, IUserAdSetupSettings } from 'src/app/models/user-ad-package';
import { IUserAd } from 'src/app/models/user-ad';
import { IUserAdPending } from 'src/app/models/user-ad-pending';

@Injectable({
    providedIn: 'root'
})
export class UserAdPackageStore {
    private _package?: IUserAdPackage;
    private _packageAds?: IUserAdSetup[];
    private _currentAdId: string = "";

    setPackageForUser(adPackage: IUserAdPackage) {
        this._package = adPackage;
        this._packageAds = [];

        var id = 0;
        for (let insert of adPackage.inserts) {
            this._packageAds.push({
                newAd: true,
                insert: insert,
                id: id.toString()
            });
            id++;
        }

        this._packageAds = this._packageAds.sort((x, y) => x.insert.pageType.charCodeAt(0) - y.insert.pageType.charCodeAt(0))
    }

    getPackageForUser(): IUserAdPackage | undefined {
        return this._package;
    }

    setCurrentAd(adId: string) {
        this._currentAdId = adId;
    }

    getCurrentAd(): IUserAdSetup | undefined {
        return this._packageAds?.filter(x => x.id == this._currentAdId)[0];
    }

    updatePackageAd(userAdId: string, pendingAd: IUserAdPending) {
        var ad = this._packageAds?.filter(x => x.id == userAdId)[0];

        if (ad == null) {
            return;
        }

        ad.pendingAd = pendingAd;
        ad.newAd = false;
    }

    getAds(): IUserAdSetup[] | undefined {
        return this._packageAds;
    }
}