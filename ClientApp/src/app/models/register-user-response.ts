import { IUserRegistration } from "./user-registration";

export interface IRegisterUserResponse {
    userRecord: IUserRegistration;
    alreadyExists: boolean;
}