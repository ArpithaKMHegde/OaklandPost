import { IUserLogin } from "./user-login";

export interface ILoginResponse {
    userAccount: IUserLogin;
    alreadyExists: boolean;
}