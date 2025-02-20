import { Order } from "../entities/orderEntities";
import { OrderItems } from "../entities/orderItems";
import { OrderDto } from "../dto/orderDto";
export declare class OrderService {
    private UserRepository;
    private OrderRepository;
    private OrderItemsRepository;
    private ProductRepository;
    mapOrderItems(orderItems: OrderItems[]): {
        orderItemsId: number;
        productName: string;
        quantity: number;
        price: number;
    }[];
    getOrders(id: number): Promise<{
        orderItemsId: number;
        productName: string;
        quantity: number;
        price: number;
    }[]>;
    createOrder(orderDto: OrderDto): Promise<{
        orderId: number;
        orderItems: {
            orderItemsId: number;
            productName: string;
            quantity: number;
            price: number;
        }[];
    }>;
    updateOrder(id: number, orderDto: Partial<OrderDto>): Promise<{
        orderId: number;
        orderItems: {
            orderItemsId: number;
            productName: string;
            quantity: number;
            price: number;
        }[];
    }>;
    getAllOrders(page?: number, pageSize?: number): Promise<{
        currentPage: number;
        totalPages: number;
        totalOrders: number;
        orders: {
            orderId: number;
            userId: number;
            userName: string;
            orderItems: {
                orderItemsId: number;
                productName: string;
                quantity: number;
                price: number;
            }[];
        }[];
    }>;
    deleteOrder(id: number, orderDto: {
        orderId: number;
    }): Promise<{
        order: Order;
    }>;
}
