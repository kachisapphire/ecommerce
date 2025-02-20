import { Role } from "../enums/userEnums";
import { Order } from "./orderEntities";
export declare class User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: Role;
    orders: Order[];
}
