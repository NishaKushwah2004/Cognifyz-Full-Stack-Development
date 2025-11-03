// server.js
import express from "express";
import bodyParser  from "body-parser";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { error: null });
});

app.post("/submit", (req, res) => {
  const { username, email, password } = req.body;

  // --- Server-side Validation ---
  if (!username || !email || !password) {
    return res.render("index", { error: "All fields are required!" });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.render("index", { error: "Invalid email format!" });
  }

  // Password: at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const strongPass =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!strongPass.test(password)) {
    return res.render("index", {
      error:
        "Password must have at least 8 chars, include upper, lower, number & special character!",
    });
  }

  res.render("success", { username, email });
});

// About page route
app.get("/about", (req, res) => {
  res.render("about");
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
