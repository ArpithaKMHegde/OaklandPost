import { IUserAd } from "./user-ad";

export interface IReviewAd {
    id: string;
    userAd: IUserAd;
    reviewedDate: Date;
    comments: string;
    approved: boolean;
    rejected: boolean;
}
