import { Router } from "express";
import path from "node:path";
import multer from "multer";
import { createCategory } from "./app/useCases/Categories/createCategory";
import { listCategories } from "./app/useCases/Categories/listCategories";
import { createProduct } from "./app/useCases/Products/createProduct";
import { listProducts } from "./app/useCases/Products/listProducts";
import { listProductsByCategory } from "./app/useCases/Categories/listProductsByCategory";
import { listOrders } from "./app/useCases/Orders/listOrders";
import { createOrder } from "./app/useCases/Orders/createOrder";
import { changeOrderStatus } from "./app/useCases/Orders/changeOrderStatus";
import { cancelOrder } from "./app/useCases/Orders/cancelOrder";
import { removeCategory } from "./app/useCases/Categories/removeCategory";

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// List categories
router.get("/categories", listCategories);

// Create category
router.post("/categories", createCategory);

// List products
router.get("/products", listProducts);

// Create product
router.post("/products", upload.single("image"), createProduct);

// Delete category
router.delete("/categories/:categoryId", removeCategory);

// Get products by category
router.get("/categories/:categoryId/products", listProductsByCategory);

// List orders
router.get("/orders", listOrders);

// Create order
router.post("/orders", createOrder);

// Change order status
router.patch("/orders/:orderId", changeOrderStatus);

// Delete/cancel order
router.delete("/orders/:orderId", cancelOrder);
