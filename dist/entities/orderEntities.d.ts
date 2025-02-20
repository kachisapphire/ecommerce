import { User } from "./userEntities";
import { OrderItems } from "./orderItems";
export declare class Order {
    orderId: number;
    user: User;
    orderItems: OrderItems[];
}
