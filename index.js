import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./src/router/route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/secure-blog";

app.use(express.json());
app.use("/api", router);

mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed", error);
    });
