import express from "express"
import {signin, signout, signup } from "../controllers/userController.js"
import { verifyToken } from "../utils/verifyUser.js"

// Create an Express router
const router = express.Router()

// Define routes for user authentication
// POST /signup - Register a new user
router.route("/signup").post(signup)

// POST /signin - Authenticate a user and create a session
router.route("/signin").post(signin)

// POST /signout - End a user's session (requires authentication)
router.route("/signout").post(verifyToken, signout)

// Export the router for use in the main app
export default router