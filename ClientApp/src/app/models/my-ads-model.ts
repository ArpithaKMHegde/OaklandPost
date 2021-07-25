export interface IMyAdsInsertsAvailableModel {
    id: string;
    pageType: string;
    title: string;
}

export interface IMyAdsRunningAdsModel {
    id: string; //Id of scheduled ad
    pageType: string;
    title: string;
    startDate: Date;
    endDate: string;
    userAdId: string;
}