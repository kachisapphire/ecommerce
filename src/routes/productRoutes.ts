import { Router } from "express";
import { ProductController } from "../controllers/productController";

const productController = new ProductController()

const router = Router();

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product
 *     description: This endpoint allows you to create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - description
 *               - price
 *             properties:
 *               productName:
 *                 type: string
 *                 description: The name of the product
 *               description:
 *                 type: string
 *                 description: The type of product
 *               price:
 *                 type: number
 *                 description: The price of the product
 *     responses:
 *       201:
 *         description: product created successfully
 */
router.post("/product", productController.createProduct)

export default router;