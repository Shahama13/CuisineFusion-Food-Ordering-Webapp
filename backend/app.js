import express from "express"
import productR from "./routes/productRoute.js"
import userR from "./routes/userRoutes.js"
import paymentR from "./routes/paymentRoute.js"
import errorMiddleWare from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import orderR from "./routes/orderRoutes.js"
import dotenv from "dotenv"

dotenv.config({
    path: "backend/config/config.env"
})


const app = express();

app.use(express.json({ limit: "50mb" }))
app.use(cookieParser())
app.use(express.urlencoded({ limit: "50mb", extended: true }))

app.use("/api/v1", productR);
app.use("/api/v1", userR);
app.use("/api/v1", orderR);
app.use("/api/v1", paymentR);

app.use(errorMiddleWare)

export default app;