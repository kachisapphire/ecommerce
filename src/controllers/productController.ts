import { ProductDto } from "../dto/productDto";
import { ProductServices } from "../services/productServices";
import { Request, Response } from "express";

export class ProductController {
    private productService: ProductServices

    constructor() {
        this.productService = new ProductServices();
    }

    public createProduct = async(req: Request, res: Response) => {
        try{
            const productDto: ProductDto = req.body;
            const product = await this.productService.create(productDto)
            res.status(201).json(product)
        }
        catch(error:any){
            res.status(400).json({message: error.message})
        }
    }

    public getAllProducts = async(req: Request, res: Response) => {
        try{
            const products = await this.productService.getAll()
            res.status(200).json(products)
        }
        catch(error: any){
            res.status(400).json({message: error.message})
        }
    }

    public getProductsById = async(req: Request, res: Response) => {
        try{
            const product = await this.productService.getById(parseInt(req.params.productId))
            if(!product) {
                return res.status(404).json({message: 'product not found'})
            }
            res.status(200).json(product)
        }
        catch(error: any) {
            res.status(400).json({message: error.message})
        }
    }

    public searchProduct = async(req: Request, res: Response) => {
        try{
            const product = await this.productService.getByName(req.params.name)
            if (!product) {
                return res.status(404).json({message: 'product not found'})
            }
            res.status(200).json(product)
        }
        catch(error: any) {
            res.status(400).json({message: error.message})
        }
    }

    public updateProduct = async(req: Request, res: Response) => {
        try{
            const productDto: ProductDto = req.body;
            const id = parseInt(req.params.id)
            const product = await this.productService.update(id, productDto)
            if (!product) {
                return res.status(404).json({message: 'product not found'})
            }
            res.status(201).json(product)
        }
        catch(error: any){
            res.status(400).json({message: error.message})
        }
    }

    public deleteProduct = async(req:Request, res:Response) => {
        try{
            const product = await this.productService.delete(parseInt(req.params.id))
            if(!product) {
                return res.status(404).json({message: 'product not found'})
            }
            res.status(200).json(product)
        }
        catch(error: any) {
            res.status(400).json({message: error.message})
        }
    }
}