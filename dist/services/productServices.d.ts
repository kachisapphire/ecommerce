import { ProductDto } from "../dto/productDto";
import { Products } from "../entities/productEntities";
export declare class ProductServices {
    private productRepository;
    create(productDto: ProductDto): Promise<Products>;
    getAll(): Promise<Products[]>;
    getById(productId: number): Promise<Products>;
    getByName(name: string): Promise<Products[]>;
    update(productId: number, productDto: ProductDto): Promise<Products>;
    delete(productId: number): Promise<Products>;
}
