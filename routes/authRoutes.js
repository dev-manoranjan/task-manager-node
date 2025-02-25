const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET_KEY } = process.env;
const auth = require("../middlewares/auth");

router.get("/", (req, res) => {
  res.json({ message: "Auth route is working" });
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("name email password");
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY);
    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/reset-password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
