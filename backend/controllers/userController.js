import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Signup function - Register a new user and authenticate immediately
export const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists, please login" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    // Generate a token for the new user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    // Send the token in a cookie and respond with the user data
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json({
        success: true,
        message: "User created successfully",
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      });
  } else {
    return res.status(400).json({ message: "Invalid user data" });
  }
});
// Signin function - Authenticate a user
export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both email and password" });
  }

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found, please sign up" });
  }

  // Check password
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  // Create and send JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  // Set token in cookie and send response
  res
    .cookie("access_token", token, { httpOnly: true })
    .status(200)
    .json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
});

// Signout function - End user session
export const signout = asyncHandler(async (req, res) => {
  // Clear the access token cookie
  res.clearCookie("access_token").status(200).json({
    success: true,
    message: "Successfully signed out",
  });
});
