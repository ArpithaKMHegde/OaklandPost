import { IPackage } from "./package";
import { IUserAd } from "./user-ad";

export interface IClientViewAd {
    userAd: IUserAd;
    pageType: string;
    package: IPackage;
}
