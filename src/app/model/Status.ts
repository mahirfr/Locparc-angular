import { User } from "./User";

export interface Status {
    id      ?: number,
    approved: boolean,
    motive  ?: string,
    admin   ?: User
}