"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
const authController_1 = require("../controllers/authController");
router.post("/users", userController_1.createUser);
router.get("/users", userController_1.getAllUsers);
router.get("/users/:id", userController_1.getUserById);
router.put("/users/:id", userController_1.updateUser);
router.delete("/users/:id", userController_1.deleteUser);
router.post("/auth", authController_1.login);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map