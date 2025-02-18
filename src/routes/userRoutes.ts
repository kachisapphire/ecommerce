import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userController";
const router = Router();
import { login } from "../controllers/authController";

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: This endpoint allows you to create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: The first name of the user
 *                 example: John
 *               lastname:
 *                 type: string
 *                 description: The last name of the user
 *                 example: Doe
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: password123
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/users", createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get("/users", getAllUsers);

/**
 * @swagger
 * /api/users/id:
 *   get:
 *     description: Get user by id
 *     responses:
 *       200:
 *         description: return user by id
 */
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser)

/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: authenticates user access
 *     description: This endpoint allows you to login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: password123
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/auth", login)


export default router;