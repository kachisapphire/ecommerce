import { OrderDto } from "../dto/orderDto";
import { OrderService } from "../services/orderServics";
import { Request, Response  } from "express";

export class OrderController{
    private orderService: OrderService
    constructor() {
        this.orderService = new OrderService();
    }

    public createOrder = async(req:Request, res: Response) => {
        try{
            const orderDto: OrderDto = req.body;
            const newOrder = await this.orderService.createOrder(orderDto);
            res.status(201).json(newOrder)
        }
        catch(error: any) {
            res.status(400).json({message: error.message})
        }
    }

    public getAllOrders = async(req: Request, res: Response) => {
        try{
            const page = parseInt(req.query.page as string) || 1;
            const pageSize = parseInt(req.query.pageSize as string) || 10;
            const orders = await this.orderService.getAllOrders(page, pageSize)
            res.status(200).json(orders)
        }
        catch(error: any) {
            res.status(400).json({message: error.message})
        }
    }

    public getOrderByUserId = async(req: Request, res: Response) => {
        try{
            const order = await this.orderService.getOrders(parseInt(req.params.id));
            if(!order) {
                res.status(404).json({message: 'order not found'})
            }
            res.status(200).json(order)
        }
        catch(error:any) {
            res.status(400).json({message: error.message})
        }
    }

    public deleteOrderByUserId = async(req: Request, res: Response): Promise<void> => {
        try{
            const {orderId} = req.body;
            const id = parseInt(req.params.id);
            if(!orderId) {
                res.status(400).json({message: 'order id must be provided'})
                return;
            }
            const order = await this.orderService.deleteOrder(id, {orderId})
            if(!order) {
                res.status(404).json({message: 'order not found'})
                return;
            }
            res.status(200).json(order);
        }
        catch(error: any) {
            res.status(500).json({message: error.message});
        }
    }

    public updateOrderByUserId = async(req: Request, res: Response) => {
        try{
            const orderDto: Partial<OrderDto> = req.body;
            const id = parseInt(req.params.id);
            const updatedOrder = await this.orderService.updateOrder(id, orderDto);
            res.status(201).json(updatedOrder);
        }
        catch(error: any) {
            res.status(400).json({message: error.message});
        }
    }
}