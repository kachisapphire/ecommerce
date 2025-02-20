"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const productServices_1 = require("../services/productServices");
class ProductController {
    constructor() {
        this.createProduct = async (req, res) => {
            try {
                const productDto = req.body;
                const product = await this.productService.create(productDto);
                res.status(201).json(product);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        };
        this.getAllProducts = async (req, res) => {
            try {
                const products = await this.productService.getAll();
                res.status(200).json(products);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        };
        this.getProductsById = async (req, res) => {
            const { id } = req.params;
            const productId = parseInt(id);
            if (isNaN(productId)) {
                res.status(400).json({ message: "Invalid product ID" });
                return;
            }
            try {
                const product = await this.productService.getById(productId);
                if (!product) {
                    res.status(404).json({ message: 'product not found' });
                    return;
                }
                res.status(200).json(product);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        };
        this.searchProduct = async (req, res) => {
            try {
                const product = await this.productService.getByName(req.params.name);
                if (!product) {
                    res.status(404).json({ message: 'product not found' });
                }
                res.status(200).json(product);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        };
        this.updateProduct = async (req, res) => {
            try {
                const productDto = req.body;
                const id = parseInt(req.params.id);
                const product = await this.productService.update(id, productDto);
                if (!product) {
                    return res.status(404).json({ message: 'product not found' });
                }
                res.status(201).json(product);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        };
        this.deleteProduct = async (req, res) => {
            try {
                const product = await this.productService.delete(parseInt(req.params.id));
                if (!product) {
                    res.status(404).json({ message: 'product not found' });
                    return;
                }
                res.status(200).json(product);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        };
        this.productService = new productServices_1.ProductServices();
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=productController.js.map