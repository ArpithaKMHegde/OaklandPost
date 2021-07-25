import { IPackageInsert } from "./package-insert";

export interface IPackage {
    id: string;
    title: string;
    description: string;
    isColor: boolean;
    timeLength: number;
    price: number;
    unitOfTime: string;
    inserts: IPackageInsert[]
}
