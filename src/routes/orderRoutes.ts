//import { authenticateUser, authorizeRole } from "middleware/authMiddleware";
import { OrderController } from "../controllers/orderController";
import { Router } from "express";
import { Role } from "../enums/userEnums";

const router = Router();
const orderController = new OrderController();
//router.use(authenticateUser)

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderDto:
 *       type: object
 *       required:
 *         - user
 *         - orderItems
 *       properties:
 *         user:
 *           type: object
 *           required:
 *             - id
 *           properties:
 *             id:
 *               type: integer
 *               example: 123
 *         orderItems:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - product
 *               - quantity
 *             properties:
 *               product:
 *                 type: object
 *                 required:
 *                   - productId
 *                 properties:
 *                   productId:
 *                     type: integer
 *                     example: 456
 *               quantity:
 *                 type: integer
 *                 example: 2
 * /api/order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     description: Create a new order with order items
 *     operationId: createOrder
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderDto'
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post("/order", orderController.createOrder)

/**
 * @swagger
 * /api/order:
 *   get:
 *     summary: Get all order
 *     tags: [Orders]
 *     description: Get all orders
 *     responses:
 *       200:
 *         description: A list of orders
 */
router.get("/order", orderController.getAllOrders);

/**
 * @swagger
 * /api/order/{id}:
 *   get:
 *     summary: Get order by userId
 *     tags: [Orders]
 *     description: Retrieve an order by userId.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the user.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved order
 *       404:
 *         description: order not found
 */
router.get("/order/:id", orderController.getOrderByUserId);

/**
 * @swagger
 * /api/order/{id}:
 *   delete:
 *     summary: Delete an order by userId
 *     tags: [Orders]
 *     description: Deletes an order for a given user ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user whose order should be deleted.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: integer
 *                 description: The ID of the order to be deleted.
 *                 example: 123
 *     responses:
 *       200:
 *         description: Successfully deleted the order.
 */

router.delete("/order/:id", orderController.deleteOrderByUserId);

/**
     * @swagger
     * /api/order/{id}:
     *   patch:
     *     summary: Update an existing order
     *     tags: [Orders]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: User ID of the order owner
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               orderId:
     *                 type: integer
     *               orderItems:
     *                 type: array
     *                 items:
     *                   type: object
     *                   properties:
     *                     orderItemId:
     *                       type: integer
     *                     quantity:
     *                       type: integer
     *     responses:
     *       200:
     *         description: Successfully updated order
     */
router.patch("/order/:id", orderController.updateOrderByUserId);

export default router