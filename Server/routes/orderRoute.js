import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { placeOrder, userOrders, verifyOrder } from "../controllers/orderController.js";

const orderRoute = express.Router();

// Place Order
orderRoute.post("/place", authMiddleware, placeOrder);
orderRoute.post("/verify",verifyOrder)
orderRoute.post("/userorders",authMiddleware,userOrders)

export default orderRoute;