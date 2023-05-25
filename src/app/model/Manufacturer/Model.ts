import { Manufacturer } from "./Manufacturer";

export interface Model {
    id          : number,
    name        : string,
    manufacturer: Manufacturer
}