import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Load users from JSON file
const dataPath = path.join(__dirname, "data", "users.json");

const getUsers = () => {
  if (!fs.existsSync(dataPath)) return [];
  return JSON.parse(fs.readFileSync(dataPath, "utf-8"));
};

const saveUsers = (users) => {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
};

// ---- API ROUTES ----

// Get all users
app.get("/api/users", (req, res) => {
  res.json(getUsers());
});

// Add new user
app.post("/api/users", (req, res) => {
  const users = getUsers();
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  saveUsers(users);
  res.json(newUser);
});

// Update user
app.put("/api/users/:id", (req, res) => {
  const users = getUsers();
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    saveUsers(users);
    res.json(users[index]);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Delete user
app.delete("/api/users/:id", (req, res) => {
  let users = getUsers();
  const id = parseInt(req.params.id);
  users = users.filter((u) => u.id !== id);
  saveUsers(users);
  res.json({ message: "User deleted" });
});

// Frontend route
app.get("/", (req, res) => {
  res.render("index");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
