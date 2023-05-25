import { Item } from "./Item";

export interface OrderItems {
    orderId: number,
    itemId : number,
    item   : Item
}