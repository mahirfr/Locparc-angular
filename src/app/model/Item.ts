import { SubCategory } from "./Category/SubCategory";
import { Model } from "./Manufacturer/Model";

export interface Item {
    id             : number,
    serialNumber  ?: string,
    arrivalDate   ?: Date,
    name           : string,
    description   ?: string,
    existing       : boolean,
    pricePerDay   ?: number,
    waranty       ?: Date,
    onMaintenance  : boolean,
    subCategory   ?: SubCategory,
    model         ?: Model
}