import { IUserAd } from "./user-ad";

export interface IUserAdCreate {
    userAd: IUserAd,
    insertId: string,
    userInsertId: string
}