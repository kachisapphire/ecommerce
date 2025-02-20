import { AppDataSource } from "../config/datasource";
import { ProductDto } from "../dto/productDto";
import { Products } from "../entities/productEntities";
import { ILike, Like } from "typeorm";

export class ProductServices{
    private productRepository = AppDataSource.getRepository(Products)

    async create(productDto: ProductDto): Promise<Products> {
        const product = this.productRepository.create(productDto);
        return await this.productRepository.save(product)
    }

    async getAll():Promise<Products[]> {
        const product = await this.productRepository.find()
        return product
    }

    async getById(productId: number): Promise<Products> {
        const product = await this.productRepository.findOne({
            where: {productId,}
        })
        if (!product) {
            throw new Error('Product not found')
        }
        return product
    }

    async getByName(name: string): Promise<Products[]> {
        const products = await this.productRepository.find({
            where: {productName: ILike(`%${name}%`)}
        })
        if(!products){
            throw new Error(`${name} not found`)
        }
        return products
    }

    async update(productId: number, productDto: ProductDto): Promise<Products> {
        const product = await this.productRepository.findOne({
            where: {productId,}
        })
        if (!product) {
            throw new Error('product not found')
        }
        Object.assign(product, productDto)
        return await this.productRepository.save(product)
    }

    async delete(productId: number): Promise<Products> {
        const product = await this.productRepository.findOne({
            where: {productId,}
        })
        if (!product) {
            throw new Error('product not found')
        }
        await this.productRepository.delete(product)
        return product
    }
}