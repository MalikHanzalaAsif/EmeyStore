import express from "express";
const router = express.Router({ mergeParams: true });
import { signup, login, logout, getUser } from "../controllers/userController.js";
import verifyToken from "../utils/verifyToken.js";


router.post("/signup", signup);

router.post("/login", login);

router.post('/logout', logout);

router.get("/user", verifyToken, getUser);


export default router;