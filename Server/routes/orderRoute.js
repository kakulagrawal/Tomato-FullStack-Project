import express from "express"
import authMiddleware from "../middlewares/auth.js"
import { placeOrder } from "../controllers/orderController.js"

const orderRoute=express.Router();
orderRoute.post("/place",placeOrder);

export default orderRoute;