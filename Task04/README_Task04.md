# 🧩 Task 4: Complex Form Validation and Dynamic DOM Manipulation

## 🎯 Objective  
This task extends the previous projects by introducing **complex form validation**, **dynamic DOM updates**, and **client-side routing** to create a seamless, interactive, and intelligent user experience.  

---

## 🛠️ Tech Stack  
| Component | Technology |
|------------|-------------|
| **Frontend** | HTML5, CSS3, JavaScript (DOM Manipulation), Bootstrap 5, EJS |
| **Backend** | Node.js, Express.js |
| **Middleware** | body-parser |
| **View Engine** | EJS (Embedded JavaScript) |

---

## 📁 Project Structure
```
Task04/
│
├── package.json
├── package-lock.json
├── server.js
│
├── public/
│   ├── style.css
│   └── script.js
│
├── views/
│   ├── index.ejs
│   ├── about.ejs
│   └── success.ejs
```

---

## ⚙️ Installation & Setup

### 1️⃣ Navigate to Task 04 Folder
open your terminal and move into the Task 04 directory:
```bash
cd Task04
```

### 2️⃣ Install Dependencies
Install all necessary Node.js modules specified in the `package.json` file:
```bash
npm install
```

### 3️⃣ Run the Server
Start your application by running:
```bash
npm start
```
Or for development with live reload:
```bash
npm run dev
```

### 4️⃣ Access in Browser
Once the server is running, open your preferred browser and visit:
```
http://localhost:3000
```

You’ll see a **User Registration Form** featuring advanced validation and real-time interactivity.

---

## 🧠 Features Implemented
✅ **Complex Validation Rules:** Password strength and email format validations on both client and server.  
✅ **Dynamic DOM Manipulation:** Real-time password strength meter and inline email feedback.  
✅ **Client-Side Routing:** Switching between “Home” and “About” pages without full page reloads.  
✅ **Server-Side Validation:** Ensures data integrity before rendering success.  
✅ **Responsive UI:** Built using Bootstrap and custom CSS transitions.  

---

## 🧩 How It Works

1. **index.ejs** renders a registration form styled with Bootstrap and linked to `script.js` for real-time interactivity.  
2. **script.js** dynamically validates user input (email and password strength) and updates the DOM accordingly.  
3. Client-side routing is implemented — switching to the **About** page fetches new content using AJAX without reloading.  
4. The **server.js** handles both GET and POST routes, including an `/about` route for client-side navigation.  
5. Valid user data triggers the **success.ejs** page upon submission.

---

## 🧱 Code Explanation

### **server.js**
Handles routing, complex validation, and rendering:
```javascript
import express from "express";
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("index", { error: null }));

app.post("/submit", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.render("index", { error: "All fields are required!" });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.render("index", { error: "Invalid email format!" });
  }

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

app.get("/about", (req, res) => res.render("about"));

app.listen(3000, () => console.log("🚀 Server running at http://localhost:3000"));
```

---

## 💻 Frontend Highlights

### **Password Strength Indicator**
Real-time password strength visualization using colored bars.
```javascript
const passwordInput = document.getElementById("password");
const strengthDiv = document.getElementById("strength");

passwordInput.addEventListener("input", () => {
  const value = passwordInput.value;
  let strength = 0;
  if (/[a-z]/.test(value)) strength++;
  if (/[A-Z]/.test(value)) strength++;
  if (/\d/.test(value)) strength++;
  if (/[@$!%*?&]/.test(value)) strength++;
  if (value.length >= 8) strength++;

  strengthDiv.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const bar = document.createElement("span");
    bar.style.backgroundColor = i < strength ? "#0d6efd" : "#ccc";
    strengthDiv.appendChild(bar);
  }
});
```

### **Client-Side Routing**
Smooth navigation between pages without reload.
```javascript
function loadPage(page) {
  const content = document.getElementById("content");
  if (page === "about") {
    fetch("/about")
      .then((res) => res.text())
      .then((html) => {
        content.innerHTML = html;
        window.history.pushState({}, "", "/about");
      });
  } else {
    window.location.href = "/";
  }
}
```

---

## 📦 Dependencies
Installed via `npm install`:
- **express** – Web framework for handling routes.  
- **body-parser** – Parses form data from POST requests.  
- **ejs** – Template engine for rendering dynamic pages.  
- **nodemon** *(dev dependency)* – Restarts server automatically when files change.  

---

## 🧩 Scripts (from `package.json`)
| Command | Description |
|----------|--------------|
| `npm start` | Run the server |
| `npm run dev` | Run with nodemon |
| `npm test` | Placeholder for testing |

---

## 📚 Learning Outcomes
- Implementation of **complex password validation** rules.  
- Hands-on experience with **client-side routing** using `fetch()` and DOM updates.  
- Understanding **real-time form feedback** with JavaScript.  
- Integration of **server and client validation layers**.  

---

## 👩‍💻 Author
**Nisha Kushwah**  
B.Tech in Computer Science & Engineering  
Jabalpur Engineering College  
📧 [2004nishakushwah@gmail.com](mailto:2004nishakushwah@gmail.com)  
🌐 [GitHub Profile](https://github.com/NishaKushwah2004)
