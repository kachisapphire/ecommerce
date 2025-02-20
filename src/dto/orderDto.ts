import { OrderItems } from "../entities/orderItems";
import { User } from "../entities/userEntities";

export class OrderDto{
    user: User
    orderItems: OrderItems[]
    orderId: number
}