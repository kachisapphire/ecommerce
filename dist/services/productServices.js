"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const datasource_1 = require("../config/datasource");
const productEntities_1 = require("../entities/productEntities");
const typeorm_1 = require("typeorm");
class ProductServices {
    constructor() {
        this.productRepository = datasource_1.AppDataSource.getRepository(productEntities_1.Products);
    }
    async create(productDto) {
        const product = this.productRepository.create(productDto);
        return await this.productRepository.save(product);
    }
    async getAll() {
        const product = await this.productRepository.find();
        return product;
    }
    async getById(productId) {
        const product = await this.productRepository.findOne({
            where: { productId, }
        });
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }
    async getByName(name) {
        const products = await this.productRepository.find({
            where: { productName: (0, typeorm_1.ILike)(`%${name}%`) }
        });
        if (!products) {
            throw new Error(`${name} not found`);
        }
        return products;
    }
    async update(productId, productDto) {
        const product = await this.productRepository.findOne({
            where: { productId, }
        });
        if (!product) {
            throw new Error('product not found');
        }
        Object.assign(product, productDto);
        return await this.productRepository.save(product);
    }
    async delete(productId) {
        const product = await this.productRepository.findOne({
            where: { productId, }
        });
        if (!product) {
            throw new Error('product not found');
        }
        await this.productRepository.delete(product);
        return product;
    }
}
exports.ProductServices = ProductServices;
//# sourceMappingURL=productServices.js.map