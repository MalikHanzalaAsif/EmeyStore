import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;
import contactRoutes from "./routes/contactRoutes.js";


// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT_URL,
}));


app.use(contactRoutes);


app.use((err, req, res, next) => {
    res.json({ "message": err.message});
    console.log(err);
});

app.listen(port, () => {
    console.log(`app is listening to port: ${port}`);
});