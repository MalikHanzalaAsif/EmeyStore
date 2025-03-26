import express from "express";
const router = express.Router({ mergeParams: true });
import { verifyPayment } from "../controllers/orderController.js";
import verifyToken from "../utils/verifyToken.js";

router.post("/verify-payment", verifyToken, verifyPayment);

export default router;