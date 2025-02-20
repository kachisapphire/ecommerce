import { OrderItems } from "../entities/orderItems";
import { User } from "../entities/userEntities";
export declare class OrderDto {
    user: User;
    orderItems: OrderItems[];
    orderId: number;
}
