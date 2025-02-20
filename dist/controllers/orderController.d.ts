import { Request, Response } from "express";
export declare class OrderController {
    private orderService;
    constructor();
    createOrder: (req: Request, res: Response) => Promise<void>;
    getAllOrders: (req: Request, res: Response) => Promise<void>;
    getOrderByUserId: (req: Request, res: Response) => Promise<void>;
    deleteOrderByUserId: (req: Request, res: Response) => Promise<void>;
    updateOrderByUserId: (req: Request, res: Response) => Promise<void>;
}
