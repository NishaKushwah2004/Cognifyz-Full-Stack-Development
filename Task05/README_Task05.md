# 🧩 Task 5: Data Management with JSON File System

## 🎯 Objective  
This task focuses on implementing **CRUD (Create, Read, Update, Delete) operations** using **RESTful API endpoints** and **JSON file-based data persistence**.  
The goal is to build a data management system that stores user information in a JSON file, demonstrating file system operations before moving to database integration in later tasks.

---

## 🛠️ Tech Stack  

| Component | Technology |
|------------|-------------|
| **Frontend** | HTML5, CSS3, JavaScript, EJS |
| **Backend** | Node.js, Express.js |
| **Data Storage** | JSON File System (fs module) |
| **Middleware** | express.json, express.static |
| **View Engine** | EJS (Embedded JavaScript) |

---

## 📁 Project Structure

```
Task05/
│
├── package.json
├── package-lock.json
├── server.js
│
├── data/
│   └── users.json
│
├── public/
│   ├── style.css
│   └── script.js
│
└── views/
    └── index.ejs
```

---

## ⚙️ Installation & Setup

### 1️⃣ Navigate to Task 05 Folder
Open your terminal and move into the Task 05 directory:
```bash
cd Task05
```

### 2️⃣ Install Dependencies
Install all necessary Node.js modules specified in the `package.json` file:
```bash
npm install
```

This will install all required dependencies such as **Express** and **EJS**.

### 3️⃣ Run the Server
Start your application by running:
```bash
npm start
```

Or, for development mode with live reload (using Nodemon):
```bash
npm run dev
```

### 4️⃣ Access in Browser
Once the server is running, open your preferred browser and visit:
```
http://localhost:3000
```

You'll see a **User Management Interface** where you can create, view, update, and delete users.

---

## 🧠 Features Implemented

✅ **RESTful API Endpoints**: Complete CRUD operations via API routes  
✅ **JSON File Storage**: Persistent data storage using Node.js file system  
✅ **Frontend-Backend Integration**: JavaScript fetch API for seamless data operations  
✅ **Dynamic UI Updates**: Real-time interface updates without page reload  
✅ **Data Validation**: Input validation on both client and server sides  

---

## 🧩 How It Works

1. **GET `/api/users`**: Retrieves all users from the JSON file
2. **POST `/api/users`**: Creates a new user and saves it to the JSON file
3. **PUT `/api/users/:id`**: Updates an existing user by ID
4. **DELETE `/api/users/:id`**: Deletes a user by ID
5. **GET `/`**: Renders the main interface page

The `users.json` file serves as a simple database, storing user data in JSON format. All operations read from and write to this file using Node.js `fs` module.

---

## 🧱 Code Explanation

### **server.js**
Handles routing, file operations, and API endpoints:
```javascript
import express from "express";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

const dataPath = path.join(__dirname, "data", "users.json");

// Helper functions for file operations
const getUsers = () => {
  if (!fs.existsSync(dataPath)) return [];
  return JSON.parse(fs.readFileSync(dataPath, "utf-8"));
};

const saveUsers = (users) => {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
};

// API Routes
app.get("/api/users", (req, res) => {
  res.json(getUsers());
});

app.post("/api/users", (req, res) => {
  const users = getUsers();
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  saveUsers(users);
  res.json(newUser);
});

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

app.delete("/api/users/:id", (req, res) => {
  let users = getUsers();
  const id = parseInt(req.params.id);
  users = users.filter((u) => u.id !== id);
  saveUsers(users);
  res.json({ message: "User deleted" });
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
```

### **Frontend Integration**
The `script.js` file uses the Fetch API to interact with the backend:
- Fetches all users on page load
- Sends POST requests to create new users
- Sends PUT requests to update existing users
- Sends DELETE requests to remove users
- Updates the UI dynamically based on API responses

---

## 📦 Dependencies

Installed via `npm install`:
- **express** – Web framework for handling routing and API endpoints
- **ejs** – Template engine for rendering dynamic pages
- **nodemon** *(dev dependency)* – Restarts the server automatically when files change

---

## 🧩 Scripts (from `package.json`)

| Command | Description |
|----------|-------------|
| `npm start` | Run the server |
| `npm run dev` | Run with nodemon (auto-reload on file changes) |

---

## 📚 Learning Outcomes

- Understanding **RESTful API design** principles
- Implementation of **CRUD operations** using Express.js
- Working with **Node.js file system** (fs module) for data persistence
- **JSON data handling** and manipulation
- **Frontend-backend integration** using Fetch API
- Building **API endpoints** for data management
- Understanding **data persistence** before moving to databases

---

## 🔄 Transition to Database

This task serves as a foundation for understanding data operations before moving to database integration in **Task 06**. The concepts learned here (CRUD operations, API design, data persistence) directly translate to working with MongoDB and other databases.

---

## 👩‍💻 Author

**Nisha Kushwah**  
**B.Tech in Computer Science & Engineering**  
**Jabalpur Engineering College**

📧 [2004nishakushwah@gmail.com](mailto:2004nishakushwah@gmail.com)  
🌐 [GitHub Profile](https://github.com/NishaKushwah2004)

---

> *"Where Data Meets Intelligence — Cognifyz"*

