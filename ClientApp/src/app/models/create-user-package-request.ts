import { IPaymentInformation } from "./payment-information";
import { IUserAdUpload } from "./user-ad-upload";

export interface ICreateUserPackageRequest {
    packageId: string;
    ads: IUserAdUpload[];
    paymentInformation: IPaymentInformation;
    userId: string;
}