import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";


import connectDB from "./config/DB.js";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to database
connectDB();

// Set port
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({extended: true})); // Parse URL-encoded bodies
app.use(cors({origin: "*"})); // Enable CORS for all origins
app.use(cookieParser()); // Parse cookies

// Routes
app.use("/api/user", userRoutes); // User-related routes
app.use("/api/note", noteRoutes); // Note-related routes

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});