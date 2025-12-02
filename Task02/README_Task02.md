# 🧩 Task 2: Inline Styles, Basic Interaction, and Server-Side Validation

## 🎯 Objective  
This task expands upon the previous one by introducing **inline styles**, **client-side interactions**, and **server-side validation** for user form submissions.  
It demonstrates how data validation can be handled both on the client and the server before storing information temporarily.

---

## 🛠️ Tech Stack  
| Component | Technology |
|------------|-------------|
| **Frontend** | HTML5, Inline CSS, Inline JavaScript, EJS |
| **Backend** | Node.js, Express.js |
| **Middleware** | body-parser |
| **View Engine** | EJS (Embedded JavaScript) |

---

## 📁 Project Structure
```
Task02/
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
    └── (optional CSS or assets)
```

---

## ⚙️ Installation & Setup

### 1️⃣ Navigate to Task 02 Folder
Open your terminal and move into the Task 02 directory:
```bash
cd Task02
```

### 2️⃣ Install Dependencies
Install all the necessary Node.js modules specified in the `package.json` file:
```bash
npm install
```
This command will automatically download and install all required dependencies such as **Express**, **EJS**, and **Body-Parser**.

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

You’ll see a **User Registration Form**. After submission, the data will be validated on both client and server sides, and a success page will be displayed for valid inputs.

---

## 🧠 Features Implemented
✅ **Client-Side Validation:** Inline JavaScript checks for valid input before submission.  
✅ **Server-Side Validation:** Backend ensures all form fields meet validation rules.  
✅ **Temporary In-Memory Storage:** Valid user data is stored temporarily in a local array.  
✅ **Dynamic EJS Rendering:** Error messages and success pages are generated dynamically.  
✅ **Inline Styles:** Clean and visually appealing interface with gradient backgrounds.  

---

## 🧩 How It Works

1. The **index.ejs** file contains a registration form with inline CSS and inline JavaScript for immediate client-side validation.  
2. When submitted, the form sends a **POST** request to `/submit`.  
3. The **server.js** validates the input on the server side:  
   - Ensures all fields are filled.  
   - Checks that username contains only letters.  
   - Validates email format.  
   - Validates age range (10–100).  
4. If validation fails, an error message is displayed on the same page.  
5. If validation passes, the user data is stored temporarily and the **success.ejs** page is rendered.  

---

## 🧱 Code Explanation

### **server.js**
Handles routing, validation, and dynamic rendering:
```javascript
import express from "express";
import bodyParser  from "body-parser";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const users = [];

app.get('/', (req, res) => {
  res.render('index', { error: null, oldData: {} });
});

app.post('/submit', (req, res) => {
  const { username, email, age } = req.body;

  if (!username || !email || !age) {
    return res.render('index', { error: 'All fields are required!', oldData: { username, email, age } });
  }

  if (!/^[a-zA-Z ]+$/.test(username)) {
    return res.render('index', { error: 'Username must contain only letters.', oldData: { username, email, age } });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.render('index', { error: 'Invalid email address.', oldData: { username, email, age } });
  }

  if (isNaN(age) || age < 10 || age > 100) {
    return res.render('index', { error: 'Age must be between 10 and 100.', oldData: { username, email, age } });
  }

  users.push({ username, email, age });
  res.render('success', { username, email, age });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
```

---

## 📦 Dependencies
Installed via `npm install`:
- **express** – Web framework for handling routing.  
- **body-parser** – Parses form data from POST requests.  
- **ejs** – Template engine for rendering views dynamically.  
- **nodemon** *(dev dependency)* – Restarts the server automatically when files change.

---

## 🧩 Scripts (from `package.json`)
| Command | Description |
|----------|-------------|
| `npm start` | Run the server |
| `npm run dev` | Run with nodemon |
| `npm test` | Placeholder for testing |

---

## 📚 Learning Outcomes
- Integration of **client-side and server-side validation**.  
- Improved understanding of **form data handling in Node.js**.  
- Implementation of **inline styling and JavaScript** for quick interaction.  
- Practice with **temporary data storage** and rendering with EJS.  

---

## 👩‍💻 Author
**Nisha Kushwah**  
B.Tech in Computer Science & Engineering  
Jabalpur Engineering College  
📧 [2004nishakushwah@gmail.com](mailto:2004nishakushwah@gmail.com)  
🌐 [GitHub Profile](https://github.com/NishaKushwah2004)
