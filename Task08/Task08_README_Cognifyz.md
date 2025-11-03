
# 🚀 Task 08: Advanced Server-Side Functionality  
**Cognifyz – Where Data Meets Intelligence**

---

## 🎯 Objective  
Implement advanced server-side features for a robust, secure, and high-performing application.

---

## 📘 Project Overview  
This project introduces advanced server-side functionalities to build a robust **Node.js** backend architecture.  
It incorporates middleware for **request logging**, **server-side caching** for performance optimization, and **background task management** using **Redis** and **Bull**.  
The project also utilizes **EJS** with layouts for a dynamic and visually structured user interface.

---

## ✨ Key Features  
- ✅ Custom middleware for request logging and error handling  
- ✅ Background job queue implemented using **Bull** and **Redis**  
- ✅ Server-side caching mechanism for optimized performance  
- ✅ Security enhancements with **Helmet** and **Compression**  
- ✅ Template-driven frontend using **EJS layouts** (header, footer, index)  
- ✅ Background email simulation using **Nodemailer + Ethereal SMTP**  
- ✅ Automatic logging of request duration and response status codes  

---

## 📂 Folder Structure  

| File/Folder | Description |
|--------------|-------------|
| `src/index.js` | Main server file configuring middleware, caching, and job worker |
| `src/config/redis.js` | Redis configuration for caching and queue management |
| `src/controllers/homeController.js` | Controller rendering the main home page |
| `src/middleware/requestLogger.js` | Custom middleware logging requests and response times |
| `src/middleware/errorHandler.js` | Handles global errors for API and UI responses |
| `src/middleware/cache.js` | Implements Redis-based caching with TTL expiration |
| `src/jobs/emailQueue.js` | Initializes Bull queue using Redis for background job handling |
| `src/jobs/emailJobProducer.js` | Adds new email jobs to the queue |
| `src/jobs/emailJobWorker.js` | Processes jobs asynchronously using Nodemailer |
| `src/routes/indexRouter.js` | Defines routes for home page and enqueue email requests |
| `views/layout.ejs` | Base layout including header and footer partials |
| `views/index.ejs` | Main UI for sending test email jobs |
| `views/partials/header.ejs` | Header section with navigation |
| `views/partials/footer.ejs` | Footer with copyright info |
| `.env.example` | Environment configuration template for Redis and SMTP settings |
| `package.json` | Lists dependencies, scripts, and project metadata |

---

## ⚙️ Setup & Installation  

### 🧩 Prerequisites  
Ensure you have the following installed:  
- Node.js (v18 or higher)  
- Redis (running locally or hosted)  
- npm or yarn  

### 🛠 Steps  
1. Clone the repository:  
   ```bash
   git clone https://github.com/NishaKushwah2004/Cognifyz-Full-Stack-Development.git
   ```
2. Navigate to the project folder:  
   ```bash
   cd Task08
   ```
3. Install dependencies:  
   ```bash
   npm install
   ```
4. Start Redis (if local):  
   ```bash
   redis-server
   ```
5. Create a `.env` file from the `.env.example` and fill required details.  
6. Start the background worker:  
   ```bash
   npm run worker
   ```
7. Start the server:  
   ```bash
   npm run dev
   ```
8. Open your browser and go to:  
   👉 [http://localhost:3000](http://localhost:3000)

---

## 🧰 Tech Stack  

| Component | Technology |
|------------|-------------|
| **Backend Framework** | Node.js + Express.js |
| **Template Engine** | EJS (Express-EJS-Layouts) |
| **Job Queue System** | Bull + Redis |
| **Caching** | Redis |
| **Email Service** | Nodemailer (Ethereal SMTP for testing) |
| **Security Middleware** | Helmet, Compression |
| **Logging** | Morgan and Custom Logger |

---

## 🧩 Example `.env` Configuration  
```env
PORT=3000
REDIS_URL=redis://127.0.0.1:6379
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
ETHEREAL_USER=your_ethereal_user
ETHEREAL_PASS=your_ethereal_password
```

---

## 🌐 Routes Overview  

| Route | Method | Description |
|--------|---------|-------------|
| `/` | GET | Renders the home page (EJS) |
| `/send-welcome` | POST | Adds a background email job to the queue |

---

## 🎨 UI Overview  
The frontend uses **EJS templating** with modular partials for maintainability.  
- `header.ejs` – Displays the site title and navigation.  
- `footer.ejs` – Shows footer branding and year dynamically.  
- `index.ejs` – Contains a form to submit background email jobs and displays real-time results.  

💡 The responses are dynamically shown using **JavaScript fetch API** for a seamless user experience.

---

## 🧠 Advanced Server Functionalities  
- Middleware-driven architecture for better scalability  
- Request/response performance logging  
- Background job processing via asynchronous workers  
- Server-side caching to reduce redundant processing  
- Centralized error handling for both UI and API layers  
- Secure configuration management using `.env` and Helmet  

---

## 👨‍💻 Scripts  

| Command | Description |
|----------|-------------|
| `npm run dev` | Starts the development server |
| `npm start` | Runs the server in production mode |
| `npm run worker` | Starts the background job worker |

---

## 🧑‍💻 Author  
**Cognifyz Internship Program — Task 08 (Advanced Server-Side Functionality)**  
**Nisha Kushwah**  
B.Tech in Computer Science & Engineering  
Jabalpur Engineering College  

📧 [2004nishakushwah@gmail.com](mailto:2004nishakushwah@gmail.com)  
🌐 [GitHub Profile](https://github.com/NishaKushwah2004)

---
_Where Data Meets Intelligence_
