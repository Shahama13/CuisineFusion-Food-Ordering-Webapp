import express from "express"
import productR from "./routes/productRoute.js"
import userR from "./routes/userRoutes.js"
import paymentR from "./routes/paymentRoute.js"
import errorMiddleWare from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import orderR from "./routes/orderRoutes.js"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url";

dotenv.config({
    path: "backend/config/config.env"
})

const app = express();
app.use(cors())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, '../frontend/build')))


app.use(express.json({ limit: "50mb" }))
app.use(cookieParser())
app.use(express.urlencoded({ limit: "50mb", extended: true }))

app.use("/api/v1", productR);
app.use("/api/v1", userR);
app.use("/api/v1", orderR);
app.use("/api/v1", paymentR);

app.use(errorMiddleWare)


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
});


export default app;