import dotenv from 'dotenv';
import express from "express";
import methodOverride from "method-override";
import pageRoute from "./routes/pageRoute.js";
import employeeRoute from "./routes/employeeRoute.js";
import { loggingMiddleware } from "./middleware/loging.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(loggingMiddleware);
app.use("/", pageRoute);
app.use("/api", employeeRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});