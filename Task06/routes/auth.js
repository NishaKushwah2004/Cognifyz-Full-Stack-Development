// routes/auth.js (ESM version)
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

const router = express.Router();
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);

// ------------------------- REGISTER -------------------------
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).render("register", { error: "All fields are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).render("register", { error: "Email already registered" });
    }

    const hash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ name, email, password: hash });

    // ✅ Redirect to login after successful registration
    res.redirect("/login");
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).render("register", { error: "Server error. Try again later." });
  }
});

// ------------------------- LOGIN -------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).render("login", { error: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).render("login", { error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).render("login", { error: "Invalid credentials" });
    }

    const payload = { id: user._id, name: user.name, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    // ✅ Redirect to dashboard after successful login
    res.redirect("/dashboard");
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).render("login", { error: "Server error. Try again later." });
  }
});

// ------------------------- LOGOUT -------------------------
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

export default router;
