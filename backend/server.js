import app from "./app.js";
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js";

dotenv.config({
    path:"backend/config/config.env"
})

connectDb();

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})