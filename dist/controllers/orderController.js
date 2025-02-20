"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const orderServics_1 = require("../services/orderServics");
class OrderController {
    constructor() {
        this.createOrder = async (req, res) => {
            try {
                const orderDto = req.body;
                const newOrder = await this.orderService.createOrder(orderDto);
                res.status(201).json(newOrder);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        };
        this.getAllOrders = async (req, res) => {
            try {
                const page = parseInt(req.query.page) || 1;
                const pageSize = parseInt(req.query.pageSize) || 10;
                const orders = await this.orderService.getAllOrders(page, pageSize);
                res.status(200).json(orders);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        };
        this.getOrderByUserId = async (req, res) => {
            try {
                const order = await this.orderService.getOrders(parseInt(req.params.id));
                if (!order) {
                    res.status(404).json({ message: 'order not found' });
                }
                res.status(200).json(order);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        };
        this.deleteOrderByUserId = async (req, res) => {
            try {
                const { orderId } = req.body;
                const id = parseInt(req.params.id);
                if (!orderId) {
                    res.status(400).json({ message: 'order id must be provided' });
                    return;
                }
                const order = await this.orderService.deleteOrder(id, { orderId });
                if (!order) {
                    res.status(404).json({ message: 'order not found' });
                    return;
                }
                res.status(200).json(order);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        };
        this.updateOrderByUserId = async (req, res) => {
            try {
                const orderDto = req.body;
                const id = parseInt(req.params.id);
                const updatedOrder = await this.orderService.updateOrder(id, orderDto);
                res.status(201).json(updatedOrder);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        };
        this.orderService = new orderServics_1.OrderService();
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=orderController.js.map