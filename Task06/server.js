// server.js
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";  // ✅ You forgot this line
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import formsRoutes from "./routes/forms.js";
import authMiddleware from "./middleware/auth.js";

// ✅ Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Connect to MongoDB
connectDB(process.env.MONGO_URI);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ✅ EJS setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/forms", formsRoutes);

// ✅ View routes
app.get("/", (req, res) => res.render("index"));
app.get("/register", (req, res, next) => {
  res.render("register");
  next();
});
app.get("/login", (req, res) => res.render("login"));

// ✅ Protected route
app.get("/dashboard", authMiddleware, (req, res) => {
  res.render("dashboard", { user: req.user });
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
