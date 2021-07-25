import { IPackageInsert } from "./package-insert";
import { IUserAdPending } from "./user-ad-pending";

export interface IUserAdPackage {
    id: string;
    inserts: IPackageInsert[];
    color: boolean;
    time: IUserAdPackageTime;
    title: string;
    description: string;
    price: number;
}

export interface IUserAdPackageTime {
    unitOfTime: AdUnitOfTime;
    length: number;
}

export interface IUserAdSetup {
    newAd: boolean;
    insert: IPackageInsert;
    pendingAd?: IUserAdPending;
    id: string;
}

export interface IUserAdSetupSettings {
    insert: IPackageInsert;
}

export type AdUnitOfTime = "Days" | "Weeks";
export type AdSize = "Full-Page" | "Half-Page" | "Quarter-Page" | "Eighth-Page";
