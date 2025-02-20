"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orderController_1 = require("../controllers/orderController");
const express_1 = require("express");
const router = (0, express_1.Router)();
const orderController = new orderController_1.OrderController();
router.post("/order", orderController.createOrder);
router.get("/order", orderController.getAllOrders);
router.get("/order/:id", orderController.getOrderByUserId);
router.delete("/order/:id", orderController.deleteOrderByUserId);
router.patch("/order/:id", orderController.updateOrderByUserId);
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map