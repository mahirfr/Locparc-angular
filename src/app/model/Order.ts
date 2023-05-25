import { Address } from "./Address";
import { OrderItems } from "./OrderItems";
import { Status } from "./Status";
import { User } from "./User";

export class Order {
    id           ?: number | undefined;
    startDate    ?: Date;
    endDate      ?: Date;
    event        ?: string;
    user         ?: User;
    orderedItems ?: OrderItems[];
    status       ?: Status;
    address      ?: Address;
}