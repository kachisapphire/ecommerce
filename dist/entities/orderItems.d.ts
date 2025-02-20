import { Products } from "./productEntities";
import { Order } from "./orderEntities";
export declare class OrderItems {
    id: number;
    order: Order;
    product: Products;
    quantity: number;
}
