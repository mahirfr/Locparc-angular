import { Address } from "./Address";
import { OrderItems } from "./OrderItems";
import { Status } from "./Status";
import { User } from "./User";

export class Order {
    id           ?: number | undefined;
    startDate    ?: any;
    endDate      ?: any;
    event        ?: string;
    user         ?: User;
    orderedItems ?: OrderItems[];
    status       ?: Status;
    address      ?: Address;
}