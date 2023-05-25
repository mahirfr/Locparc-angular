import { Country } from "./Country";

export interface Address {
    id            : number | null,
    street        : string,
    addressDetails: string,
    city          : string,
    postalCode    : string,
    country       : Country | null
}