# 🧩 Task 3: Advanced CSS Styling and Responsive Design

## 🎯 Objective  
This task focuses on **enhancing CSS styling** and making the web page **fully responsive** using advanced CSS properties and frameworks.  
The goal is to create a visually appealing, flexible, and mobile-friendly layout that adjusts seamlessly across different screen sizes.

---

## 🛠️ Tech Stack  
| Component | Technology |
|------------|-------------|
| **Frontend** | HTML5, CSS3, Bootstrap 5, EJS |
| **Backend** | Node.js, Express.js |
| **Middleware** | body-parser |
| **View Engine** | EJS (Embedded JavaScript) |

---

## 📁 Project Structure
```
Task03/
│
├── package.json
├── package-lock.json
├── server.js
│
├── views/
│   ├── index.ejs
│   └── success.ejs
│
└── public/
    ├── style.css
    └── (optional animations.css or other assets)
```

---

## ⚙️ Installation & Setup

### 1️⃣ Navigate to Task 03 Folder
Open your terminal and move into the Task 03 directory:
```bash
cd Task03
```

### 2️⃣ Install Dependencies
Install all the necessary Node.js modules specified in the `package.json` file:
```bash
npm install
```
This will install all required dependencies such as **Express**, **EJS**, and **Body-Parser**.

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

You’ll see a **Responsive Registration Form** designed with Bootstrap and custom CSS.

---

## 🧠 Features Implemented
✅ **Responsive Layout:** Fully mobile-friendly form layout using Bootstrap grid system.  
✅ **Advanced CSS Styling:** Transitions, hover effects, and gradient backgrounds for an engaging UI.  
✅ **Hero Section:** Visually appealing introduction area with a gradient background.  
✅ **Navigation Bar & Footer:** Consistent design using Bootstrap components.  
✅ **Dynamic Rendering:** Form data is submitted and displayed dynamically using EJS.  

---

## 🧩 How It Works

1. The **index.ejs** file displays a registration form styled with **Bootstrap** and **custom CSS**.  
2. The **style.css** file defines additional transitions, hover effects, and responsive adjustments.  
3. The **server.js** file handles user input and renders success pages dynamically using EJS.  
4. The page layout automatically adjusts for mobile, tablet, and desktop views through responsive design techniques.  

---

## 🧱 Code Explanation

### **server.js**
Handles routing, validation, and rendering:
```javascript
import express from "express";
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { error: null });
});

app.post('/submit', (req, res) => {
  const { username, email, age } = req.body;
  if (!username || !email || !age) {
    return res.render('index', { error: 'All fields are required!' });
  }
  res.render('success', { username, email, age });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
```

---

## 💅 CSS Highlights (from `style.css`)
```css
.hero-section {
  background: linear-gradient(to right, #007bff, #6610f2);
  height: 50vh;
  color: white;
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .hero-section {
    height: 40vh;
  }
  .hero-content h1 {
    font-size: 1.8rem;
  }
}
```

---

## 📦 Dependencies
Installed via `npm install`:
- **express** – Web framework for handling routing.  
- **body-parser** – Parses form data from POST requests.  
- **ejs** – Template engine for dynamic HTML rendering.  
- **nodemon** *(dev dependency)* – Restarts the server automatically on file changes.  

---

## 🧩 Scripts (from `package.json`)
| Command | Description |
|----------|--------------|
| `npm start` | Run the server |
| `npm run dev` | Run with nodemon |
| `npm test` | Placeholder for testing |

---

## 📚 Learning Outcomes
- Understanding **responsive design** with CSS and Bootstrap.  
- Implementing **advanced CSS transitions and animations**.  
- Integrating **Bootstrap with EJS templates**.  
- Developing clean, consistent, and user-friendly interfaces.  

---

## 👩‍💻 Author
**Nisha Kushwah**  
B.Tech in Computer Science & Engineering  
Jabalpur Engineering College  
📧 [2004nishakushwah@gmail.com](mailto:2004nishakushwah@gmail.com)  
🌐 [GitHub Profile](https://github.com/NishaKushwah2004)
