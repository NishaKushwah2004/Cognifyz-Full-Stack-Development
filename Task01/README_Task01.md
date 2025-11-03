# 🧩 Task 1: HTML Structure and Basic Server Interaction

## 🎯 Objective  
This task introduces the concept of **server-side rendering (SSR)** and **basic form submissions** using **Node.js**, **Express**, and **EJS**.  
The goal is to build a simple web application where users can submit their details through a form, and the server dynamically renders a response page.

---

## 🛠️ Tech Stack  
| Component | Technology |
|------------|-------------|
| **Frontend** | HTML5, CSS3, EJS Templates |
| **Backend** | Node.js, Express.js |
| **Middleware** | body-parser |
| **View Engine** | EJS (Embedded JavaScript) |

---

## 📁 Project Structure
```
Task01/
│
├── package.json
├── package-lock.json
├── server.js
│
├── views/
│   ├── index.ejs
│   └── result.ejs
│
└── public/
    └── (optional CSS or assets)
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone <repository-url>
cd Task01
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Run the Server
For normal run:
```bash
npm start
```

For development with live reload (using nodemon):
```bash
npm run dev
```

### 4️⃣ Access in Browser
Open your browser and visit:
```
http://localhost:3000
```

---

## 🧠 Features Implemented
✅ **Form Handling:**  
Users can input a username and email.  
✅ **Server-Side Rendering:**  
Dynamic HTML pages generated using EJS templates.  
✅ **Express.js Server:**  
Handles routes for form rendering (`GET /`) and submission (`POST /submit`).  
✅ **User-Friendly UI:**  
Modern, animated form with CSS transitions and gradient background.  

---

## 🧩 How It Works

1. The **index.ejs** page displays a form with input fields for username and email.  
2. Upon submission, the form data is sent via a **POST** request to `/submit`.  
3. The **server.js** file handles this route, processes the form data, and passes it to **result.ejs** for rendering.  
4. The **result.ejs** file displays the submitted details dynamically and provides a “Go Back” link to return to the form.

---

## 🧱 Code Explanation

### **server.js**
Handles routing and rendering:
```javascript
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("index"));
app.post("/submit", (req, res) => {
  const { username, email } = req.body;
  res.render("result", { username, email });
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
```

### **index.ejs**
Form page for user input.

### **result.ejs**
Displays the submitted username and email dynamically using EJS syntax:
```ejs
<p><strong>Username:</strong> <%= username %></p>
<p><strong>Email:</strong> <%= email %></p>
```

---

## 📦 Dependencies
Installed via `npm install`:
- **express** – Web framework for building the server.  
- **body-parser** – Parses form data from POST requests.  
- **ejs** – Template engine for dynamic HTML rendering.  
- **nodemon** *(dev dependency)* – Automatically restarts the server on file changes.

---

## 🧩 Scripts (from `package.json`)
| Command | Description |
|----------|--------------|
| `npm start` | Run the server |
| `npm run dev` | Run with nodemon |
| `npm test` | Placeholder for testing |

---

## 📚 Learning Outcomes
- Understanding of **server-side rendering (SSR)** using EJS.  
- Basics of handling **HTTP GET/POST requests** in Express.  
- Integration of **frontend and backend** via form submission.  
- Familiarity with **Node.js project structure** and dependencies.

---

## 👩‍💻 Author
**Nisha Kushwah**  
B.Tech in Computer Science & Engineering  
Jabalpur Engineering College  
📧 [2004nishakushwah@gmail.com](mailto:2004nishakushwah@gmail.com)  
🌐 [GitHub Profile](https://github.com/NishaKushwah2004)
