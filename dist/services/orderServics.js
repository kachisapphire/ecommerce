"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const datasource_1 = require("../config/datasource");
const orderEntities_1 = require("../entities/orderEntities");
const userEntities_1 = require("../entities/userEntities");
const orderItems_1 = require("../entities/orderItems");
const productEntities_1 = require("../entities/productEntities");
class OrderService {
    constructor() {
        this.UserRepository = datasource_1.AppDataSource.getRepository(userEntities_1.User);
        this.OrderRepository = datasource_1.AppDataSource.getRepository(orderEntities_1.Order);
        this.OrderItemsRepository = datasource_1.AppDataSource.getRepository(orderItems_1.OrderItems);
        this.ProductRepository = datasource_1.AppDataSource.getRepository(productEntities_1.Products);
    }
    mapOrderItems(orderItems) {
        return orderItems.map(item => ({
            orderItemsId: item.id,
            productName: item.product.productName,
            quantity: item.quantity,
            price: item.product.price,
        }));
    }
    async getOrders(id) {
        const user = await this.UserRepository.findOne({
            where: { id, },
            relations: ['orders', 'orders.orderItems', 'orders.orderItems.product']
        });
        if (user) {
            const productOrdered = user.orders.flatMap((order) => this.mapOrderItems(order.orderItems));
            return productOrdered;
        }
        return [];
    }
    async createOrder(orderDto) {
        if (!orderDto.user || !orderDto.user.id) {
            throw new Error('Login is required');
        }
        const user = await this.UserRepository.findOne({
            where: { id: orderDto.user.id }
        });
        if (!user) {
            throw new Error('User not found');
        }
        const order = new orderEntities_1.Order();
        order.user = user;
        order.orderItems = [];
        await this.OrderRepository.save(order);
        const savedOrderItem = [];
        for (const item of orderDto.orderItems) {
            if (!item.product || !item.product.productId) {
                throw new Error('product is missing');
            }
            const product = await this.ProductRepository.findOne({
                where: { productId: item.product.productId }
            });
            if (!product) {
                throw new Error(`product with id ${item.product.productId} not found`);
            }
            const orderItem = new orderItems_1.OrderItems();
            orderItem.order = order;
            orderItem.product = product;
            orderItem.quantity = item.quantity;
            savedOrderItem.push(orderItem);
        }
        await this.OrderRepository.save(order);
        await this.OrderItemsRepository.save(savedOrderItem);
        const fulfilledOrder = {
            orderId: order.orderId,
            orderItems: this.mapOrderItems(savedOrderItem)
        };
        return fulfilledOrder;
    }
    async updateOrder(id, orderDto) {
        const order = await this.OrderRepository.findOne({
            where: { orderId: orderDto.orderId, user: { id: id } },
            relations: ['orderItems', 'orderItems.product']
        });
        if (!order) {
            throw new Error('order not found');
        }
        for (const item of orderDto.orderItems) {
            const existingItem = order.orderItems.find(i => i.id === item.id);
            if (existingItem) {
                existingItem.quantity = item.quantity;
                await this.OrderItemsRepository.update(existingItem.id, { quantity: item.quantity });
            }
        }
        await this.OrderRepository.save(order);
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
        };
        return newOrder;
    }
    async getAllOrders(page = 1, pageSize = 10) {
        const [orders, totalOrders] = await this.OrderRepository.findAndCount({
            relations: ['user', 'orderItems', 'orderItems.product'],
            take: pageSize,
            skip: (page - 1) * pageSize,
            order: { orderId: 'DESC' }
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
        };
        return allOrders;
    }
    async deleteOrder(id, orderDto) {
        console.log(`User ID: ${id}, Order ID: ${orderDto.orderId}`);
        const order = await this.OrderRepository.findOne({
            where: { orderId: orderDto.orderId, user: { id: id } },
            relations: ['orderItems']
        });
        console.log(order);
        if (!order) {
            throw new Error('order not found');
        }
        await this.OrderRepository.remove(order);
        return { order };
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=orderServics.js.map