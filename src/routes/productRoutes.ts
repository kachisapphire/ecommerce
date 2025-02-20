import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { authenticateToken, authorize } from "../middleware/authMiddleware";
import { Role } from "../enums/userEnums";

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
router.post("/product", authenticateToken, authorize([Role.SUPER_ADMIN, Role.ADMIN]),productController.createProduct);

/**
 * @swagger
 * /api/product:
 *   get:
 *     description: Get all products
 *     responses:
 *       200:
 *         description: A list of products
 */
router.get("/product", authenticateToken, authorize([Role.SUPER_ADMIN, Role.ADMIN, Role.USER]),productController.getAllProducts);


/**
 * @swagger
 * /api/product/id/{id}:
 *   get:
 *     summary: Get product by id
 *     description: Retrieve a product based on its id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the product to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved product
 *       404:
 *         description: product not found
 */
router.get("/product/id/:id", authenticateToken, authorize([Role.SUPER_ADMIN, Role.ADMIN, Role.USER]),productController.getProductsById)

/**
 * @swagger
 * /api/product/name/{name}:
 *   get:
 *     summary: Get product by name
 *     description: Retrieve a product based on its name.
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: The name of the product to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved product
 *       404:
 *         description: product not found
 */
router.get("/product/name/:name", authenticateToken, authorize([Role.SUPER_ADMIN, Role.ADMIN, Role.USER]),productController.searchProduct)

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     description: Deletes a product based on its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted product
 *       404:
 *         description: Product not found
 */
router.delete("/product/:id", authenticateToken, authorize([Role.SUPER_ADMIN]),productController.deleteProduct);

/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Update an existing product
 *     description: This endpoint updates an existing product by its id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 description: The name of the product
 *               description:
 *                 type: string
 *                 description: The description of the product
 *               price:
 *                 type: number
 *                 description: The price of the product
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.put("/product/:id", authenticateToken, authorize([Role.SUPER_ADMIN, Role.ADMIN]),productController.updateProduct)
export default router;