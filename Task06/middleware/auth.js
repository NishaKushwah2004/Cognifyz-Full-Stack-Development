import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    // Try getting token from cookies or Authorization header
    const token =
      req.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      // If no token, redirect to login instead of sending JSON
      return res.redirect("/login");
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.clearCookie("token");
      return res.redirect("/login");
    }

    // Attach user to request and move forward
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.clearCookie("token");
    return res.redirect("/login");
  }
};

export default authMiddleware;
