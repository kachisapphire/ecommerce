import { Request, Response } from "express";
export declare class ProductController {
    private productService;
    constructor();
    createProduct: (req: Request, res: Response) => Promise<void>;
    getAllProducts: (req: Request, res: Response) => Promise<void>;
    getProductsById: (req: Request, res: Response) => Promise<void>;
    searchProduct: (req: Request, res: Response) => Promise<void>;
    updateProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteProduct: (req: Request, res: Response) => Promise<void>;
}
