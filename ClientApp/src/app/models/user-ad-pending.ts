import { IAdFileUpload } from "./ad-upload-file";
import { IPackageInsert } from "./package-insert";
import { AdSize } from "./user-ad-package";

export interface IUserAdPending {
    id: string;
    submittedDate: Date;
    startDate?: Date;
    endDate?: Date;
    location: string;
    files: File[];
    insert: IPackageInsert;
}