import { IUserAd } from "./user-ad";
import { IUserFileUpload } from "./user-file-upload";

export interface IAdFileUpload {
    id: string;
    userFileUpload: IUserFileUpload;
    userAd: IUserAd;
}