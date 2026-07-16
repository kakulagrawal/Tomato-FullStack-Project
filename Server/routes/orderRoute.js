import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { placeOrder } from "../controllers/orderController.js";

const orderRoute = express.Router();

// Place Order
orderRoute.post("/place", authMiddleware, placeOrder);

export default orderRoute;