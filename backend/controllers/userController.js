import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Signup function
export const signup = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists, please login" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    });

    if (newUser) {
        return res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            message: "User created successfully"
        });
    } else {
        return res.status(400).json({ message: "Invalid user data" });
    }
});

// Signin function
export const signin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "User not found, please sign up" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
        return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15d" });
    
    res.cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });
});


// Signout function
export const signout = asyncHandler(async (req, res) => {
    res.clearCookie("access_token") 
        .status(200)
        .json({
            success: true,
            message: "Successfully signed out"
        });
});