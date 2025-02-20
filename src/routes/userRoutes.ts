import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userController";
const router = Router();
import { login } from "../controllers/authController";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authMiddleware";
import { Role } from "../enums/userEnums";

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
 *               role:
 *                 type: string
 *                 enum: [SUPER_ADMIN, ADMIN, USER]
 *                 description: The role assigned to the user
 *                 example: USER
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/users",createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get("/users", authenticateToken, authorize([Role.SUPER_ADMIN, Role.ADMIN]), getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user based on their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *       404:
 *         description: User not found
 */
router.get("/users/:id",authenticateToken, authorize([Role.SUPER_ADMIN, Role.ADMIN]), getUserById);
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update an existing user
 *     description: This endpoint updates an existing user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: The first name of the user
 *               lastname:
 *                 type: string
 *                 description: The last name of the user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user
 *               role:
 *                 type: string
 *                 enum: [SUPER_ADMIN, ADMIN, USER]
 *                 description: The role assigned to the user
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put("/users/:id",authenticateToken, authorize([Role.SUPER_ADMIN, Role.ADMIN, Role.USER]), updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Deletes a user based on its unique ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted user
 */
router.delete("/users/:id",authenticateToken, authorize([Role.SUPER_ADMIN]), deleteUser)

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