import express from "express";
const router = express.Router({ mergeParams: true });
import { verifyPayment, getOrders } from "../controllers/orderController.js";
import verifyToken from "../utils/verifyToken.js";

router.get("/orders", verifyToken, getOrders);
router.post("/verify-payment", verifyToken, verifyPayment);

export default router;