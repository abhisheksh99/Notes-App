import express from "express"
import {signin, signout, signup } from "../controllers/userController.js"


const router= express.Router()


router.route("/signup").post(signup)
router.route("/signin").post(signin)
router.route("/signout").post(signout)


export default router