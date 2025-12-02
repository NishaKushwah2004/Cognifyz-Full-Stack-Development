# 🧩 Task 6: Database Integration and User Authentication

## 🎯 Objective
This task focuses on integrating a **MongoDB database** and implementing a **secure user authentication system** with **JWT** and **bcrypt**.  
The application ensures **safe data handling**, **authorization**, and a seamless login/register flow with protected routes.

---

## 🛠️ Tech Stack

| Component | Technology |
|------------|-------------|
| **Frontend** | HTML5, CSS3, JavaScript, EJS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ORM) |
| **Authentication** | JWT (JSON Web Tokens), bcrypt |
| **Environment Variables** | dotenv |
| **Middleware** | Cookie Parser, Custom Auth Middleware |

---

## 📁 Project Structure

```
Task06/
│
├── package.json
├── package-lock.json
├── server.js
├── config/
│   └── db.js
│
├── models/
│   ├── User.js
│   └── FormEntry.js
│
├── routes/
│   ├── auth.js
│   └── forms.js
│
├── middleware/
│   └── auth.js
│
├── public/
│   ├── style.css
│   └── script.js
│
├── views/
│   ├── index.ejs
│   ├── register.ejs
│   ├── login.ejs
│   └── dashboard.ejs
│
└── .env (create from .env.example)
```

---

## ⚙️ Installation & Setup

### 1️⃣ Navigate to the Task Folder
Open your terminal and navigate to the Task06 directory:
```bash
cd Task06
```

### 2️⃣ Install Dependencies
Install all required Node.js packages:
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add the following configuration:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/Task06DB
JWT_SECRET=replace_with_a_long_random_string
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
```

**Important Notes:**
- Replace `replace_with_a_long_random_string` with a secure, random string for JWT_SECRET
- Ensure MongoDB is running on your system before starting the server
- The database will be created automatically if it doesn't exist

### 4️⃣ Start the Server
Run the application:
```bash
npm start
```
Or, during development (with auto-restart):
```bash
npm run dev
```

### 5️⃣ Access in Browser
Once the server is running:
```
http://localhost:3000
```

---

## ✨ Features

✅ **User Registration & Login** with hashed passwords  
✅ **JWT Authentication** for session management  
✅ **Protected Routes** — only authenticated users can access the dashboard  
✅ **MongoDB Integration** for persistent data storage  
✅ **Form Data Management** linked to logged-in users  
✅ **Custom Middleware** for route protection  
✅ **Clean and Responsive Front-End** using EJS, CSS, and vanilla JS  

---

## 🔐 How It Works

### 🧩 1. User Registration (`/api/auth/register`)
- Users register through the `register.ejs` form
- Passwords are hashed using `bcrypt` before saving in MongoDB
- On success, users are redirected to the login page

### 🧩 2. User Login (`/api/auth/login`)
- Credentials are verified against MongoDB
- On success, a JWT token is generated and stored in a secure **HTTP-only cookie**
- The token is used for authorizing access to protected pages

### 🧩 3. Protected Dashboard (`/dashboard`)
- Access restricted to users with a valid JWT
- The middleware (`middleware/auth.js`) validates JWT tokens before rendering the dashboard
- Unauthorized users are redirected to the login page

### 🧩 4. Form Management API (`/api/forms`)
- Authenticated users can create, read, and delete form entries
- Each form entry is stored in MongoDB using the `FormEntry` model
- Forms are associated with the logged-in user's account  

---

## 🧱 Key Code Insights

### **server.js**
Handles configuration, routes, and middleware setup.
```javascript
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.js";
import formsRoutes from "./routes/forms.js";
import authMiddleware from "./middleware/auth.js";

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/api/auth", authRoutes);
app.use("/api/forms", formsRoutes);

app.get("/", (req, res) => res.render("index"));
app.get("/register", (req, res) => res.render("register"));
app.get("/login", (req, res) => res.render("login"));
app.get("/dashboard", authMiddleware, (req, res) => res.render("dashboard", { user: req.user }));

app.listen(process.env.PORT || 3000, () => console.log("🚀 Server running on http://localhost:3000"));
```

---

### **models/User.js**
Defines user schema and secure password storage.
```javascript
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);
export default User;
```

---

### **middleware/auth.js**
Verifies JWT token and protects routes.
```javascript
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.redirect("/login");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.redirect("/login");
  }
};

export default auth;
```

---

### **db.js**
MongoDB connection setup.
```javascript
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};
export default connectDB;
```

---

### **style.css**
Clean and minimal layout for authentication forms.
```css
body {
  font-family: Arial, sans-serif;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}
input, textarea {
  display: block;
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.5rem;
}
button {
  padding: 0.6rem 1rem;
  cursor: pointer;
  border-radius: 6px;
}
h1 { margin-bottom: 1rem; }
```

---

## 📦 Dependencies

Installed via `npm install`:
- **express** – Web framework for building routes and middleware  
- **mongoose** – MongoDB ORM for schema-based data modeling  
- **bcrypt** – Password hashing for authentication  
- **jsonwebtoken** – Token-based user authentication  
- **cookie-parser** – For handling cookies securely  
- **dotenv** – Manage environment variables  
- **ejs** – Template engine for rendering dynamic pages  

---

## 🧩 Scripts (from `package.json`)

| Command | Description |
|----------|--------------|
| `npm start` | Run the production server |
| `npm run dev` | Run server in development mode (nodemon) |
| `npm test` | Placeholder for testing |

---

## 📚 Learning Outcomes

- Integration of **MongoDB** with Express using Mongoose  
- Implementation of **secure authentication** with JWT and bcrypt  
- Understanding **route protection** with custom middleware  
- Working with **EJS templates** for full-stack web development  
- Hands-on experience in **secure data handling and user session management**  

---

## 👩‍💻 Author

**Nisha Kushwah**  
B.Tech in Computer Science & Engineering  
Jabalpur Engineering College  

📧 [2004nishakushwah@gmail.com](mailto:2004nishakushwah@gmail.com)  
🌐 [GitHub Profile](https://github.com/NishaKushwah2004)

---

> *“Where Data Meets Intelligence — Cognifyz”*
