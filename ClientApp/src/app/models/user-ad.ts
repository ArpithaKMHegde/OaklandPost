import { IAdFileUpload } from "./ad-upload-file";
import { IReviewAd } from "./review-ad";
import { AdSize } from "./user-ad-package";

export interface IUserAd {
    id: string;
    submittedDate: Date;
    startDate: Date;
    endDate: Date;
    location: string;
    files: IAdFileUpload[];
    reviewedAd: IReviewAd;
    size: AdSize;
}
