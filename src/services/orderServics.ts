import { AppDataSource } from "../config/datasource";
import { Order } from "../entities/orderEntities";
import { User } from "../entities/userEntities";
import { OrderItems } from "../entities/orderItems";
import { OrderDto } from "../dto/orderDto";
import { Products } from "../entities/productEntities";

export class OrderService{
    private UserRepository = AppDataSource.getRepository(User);
    private OrderRepository = AppDataSource.getRepository(Order);
    private OrderItemsRepository = AppDataSource.getRepository(OrderItems);
    private ProductRepository = AppDataSource.getRepository(Products);

    public mapOrderItems(orderItems: OrderItems[]) {
        return orderItems.map(item => ({
            orderItemsId: item.id,
            productName: item.product.productName,
            quantity: item.quantity,
            price: item.product.price,
        }));
    }

    async getOrders(id: number) {
        const user = await this.UserRepository.findOne({
            where: {id,},
            relations: ['orders', 'orders.orderItems', 'orders.orderItems.product']
        });
        if (user) {
            const productOrdered = user.orders.flatMap((order) => 
                this.mapOrderItems(order.orderItems))
            return productOrdered;
        }
        return [];
    }

    async createOrder(orderDto: OrderDto) {
        if(!orderDto.user || !orderDto.user.id) {
            throw new Error('Login is required');
        }
        const user = await this.UserRepository.findOne({
            where: {id: orderDto.user.id}
        })
        if(!user) {
            throw new Error('User not found')
        }
        const order = new Order();
        order.user = user;
        order.orderItems = []

        await this.OrderRepository.save(order);
        const savedOrderItem = []

        for (const item of orderDto.orderItems) {
            if(!item.product || !item.product.productId) {
                throw new Error('product is missing')
            }

            const product = await this.ProductRepository.findOne({
                where: {productId: item.product.productId}
            })
            if (!product) {
                throw new Error(`product with id ${item.product.productId} not found`)
            }

            const orderItem = new OrderItems();
            orderItem.order = order;
            orderItem.product = product;
            orderItem.quantity = item.quantity

            savedOrderItem.push(orderItem)
            //order.orderItems.push(orderItem)
        }
        await this.OrderRepository.save(order);
        await this.OrderItemsRepository.save(savedOrderItem)
        const fulfilledOrder = {
            orderId: order.orderId,
            orderItems: this.mapOrderItems(savedOrderItem)
        }
        return fulfilledOrder
    }

    async updateOrder(id: number, orderDto: Partial<OrderDto>) {
        
       const order = await this.OrderRepository.findOne({
        where: {orderId: orderDto.orderId, user: {id: id}},
        relations: ['orderItems', 'orderItems.product']
       });
       if(!order) {
        throw new Error('order not found')
        }

        for(const item of orderDto.orderItems){
            const existingItem = order.orderItems.find(i => i.id === item.id);
            if (existingItem){
                existingItem.quantity = item.quantity;
                await this.OrderItemsRepository.update(existingItem.id, {quantity: item.quantity})
            }
        }
        const updatedOrder = await this.OrderRepository.findOne({
            where: { orderId: orderDto.orderId, user: { id: id } },
            relations: ['orderItems', 'orderItems.product']
        });
        const newOrder = {
            orderId: updatedOrder.orderId,
            orderItems: updatedOrder.orderItems.map(item => ({
                orderItemsId: item.id,
                productName: item.product.productName,
                quantity: item.quantity,
                price: item.product.price,
            }))
        }
        return newOrder
    }

    async getAllOrders(page: number = 1, pageSize: number = 10) {
        const [orders, totalOrders] = await this.OrderRepository.findAndCount({
            relations: ['user', 'orderItems', 'orderItems.product'],
            take: pageSize,
            skip: (page - 1) * pageSize,
            order: {orderId: 'DESC'}
        });
        const allOrders = {
            currentPage: page,
            totalPages: Math.ceil(totalOrders / pageSize),
            totalOrders,
            orders: orders.map(order => ({
                orderId: order.orderId,
                userId: order.user.id,
                userName: `${order.user.firstname} ${order.user.lastname}`,
                orderItems: this.mapOrderItems(order.orderItems)
            }))
        }
        return allOrders
    }

    async deleteOrder(id: number, orderDto: {orderId: number}) {
        console.log(`User ID: ${id}, Order ID: ${orderDto.orderId}`);
        const order = await this.OrderRepository.findOne({
            where: {orderId: orderDto.orderId, user :{id: id}},
            relations: ['orderItems']
        });
        console.log(order)
        if(!order) {
            throw new Error('order not found');
        }
        await this.OrderRepository.remove(order)
        return {order}
    }
}