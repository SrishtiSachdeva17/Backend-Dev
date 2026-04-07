import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./src/router/router.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/library")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use("/library", router);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
