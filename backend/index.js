import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/DB.js";
import userRoutes from "./routes/userRoutes.js"
import { errorHandler } from "./utils/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config();

const app = express();
connectDB();
const PORT = process.env.PORT || 3000;


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({origin:"*"}))
app.use(cookieParser())


app.use("/api/user",userRoutes)

app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
