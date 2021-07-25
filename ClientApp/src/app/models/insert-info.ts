import { IPackage } from "./package";
import { IPackageInsert } from "./package-insert";

export interface IInsertInfo {
    package: IPackage,
    insert: IPackageInsert,
    userInsertId: string
}