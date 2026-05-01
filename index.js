import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes.js";

dotenv.config({ quiet: true });

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

app.use("/", router);

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log("connect");
});
