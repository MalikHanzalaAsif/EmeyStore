import express from 'express';
const router = express.Router();
import { sendEmails } from '../controllers/contactController.js';


router.post("/contact", sendEmails);


export default router;