"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const productController = new productController_1.ProductController();
const router = (0, express_1.Router)();
router.post("/product", productController.createProduct);
router.get("/product", productController.getAllProducts);
router.get("/product/id/:id", productController.getProductsById);
router.get("/product/name/:name", productController.searchProduct);
router.delete("/product/:id", productController.deleteProduct);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map