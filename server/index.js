import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
const dbUrl = process.env.DB_URL;
const port = process.env.PORT || 3000;
import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// Database Connection
mongoose.connect(dbUrl)
.then(() => console.log("Connected to database"))
.catch(err => console.log("Couldn't connect to database", err));


// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

// Routes
app.use(contactRoutes);
app.use(userRoutes);
app.use(orderRoutes);

// Error Handling Middlewares
app.use((err, req, res, next) => {
    res.json({ "message": err.message});
    console.log(err);
});

// Starting Server
app.listen(port, () => {
    console.log(`app is listening to port: ${port}`);
});