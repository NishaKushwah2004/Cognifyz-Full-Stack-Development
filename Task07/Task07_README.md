
# 🚀 Task 07: Advanced API Usage and External API Integration  
**Cognifyz – Where Data Meets Intelligence**

---

## 🎯 Objective  
Explore advanced API concepts and integrate external APIs for secure and optimized data handling.

---

## 📘 Project Overview  
This project demonstrates advanced API handling and integration with external services using **Node.js** and **Express**.  
It utilizes **OAuth-based authentication via GitHub** and includes **API rate limiting**, **retry logic**, and **centralized error management** for improved reliability and security.

---

## ✨ Key Features  
- ✅ OAuth 2.0 authentication via GitHub using Passport.js  
- ✅ Integration with GitHub REST API for profile and repository data retrieval  
- ✅ Rate limiting implemented via express-rate-limit to prevent abuse  
- ✅ Automatic retry mechanism using p-retry for failed API requests  
- ✅ Centralized error handling for user-friendly feedback and logging  
- ✅ Session management and secure cookie handling using express-session  
- ✅ Dynamic EJS templates for UI (Home, Profile, Error pages)  

---

## 📂 Folder Structure  

| File/Folder | Description |
|--------------|-------------|
| `server.js` | Main server file configuring Express, Passport, and routes |
| `config/passport.js` | OAuth setup for GitHub strategy using Passport.js |
| `routes/auth.js` | Handles GitHub login, callback, and logout routes |
| `routes/api.js` | Contains routes for fetching GitHub user profile and repositories |
| `middleware/rateLimiter.js` | Implements API rate limiting for secure requests |
| `middleware/errorHandler.js` | Manages global error and 404 responses |
| `views/` | Contains EJS templates for Home, Profile, and Error pages |
| `.env.example` | Environment variable template for secure configuration |
| `package.json` | Project dependencies and scripts configuration |

---

## ⚙️ Setup & Installation  

1. Clone this repository to your local machine:  
   ```bash
   git clone https://github.com/NishaKushwah2004/Cognifyz-Full-Stack-Development.git
   ```
2. Navigate to the project folder:  
   ```bash
   cd Task07
   ```
3. Install dependencies:  
   ```bash
   npm install
   ```
4. Create a `.env` file using `.env.example` and fill in the required values (GitHub OAuth credentials, session secret, etc.).  
5. Start the development server:  
   ```bash
   npm run dev
   ```
6. Open the app in your browser:  
   👉 [http://localhost:3000](http://localhost:3000)  
7. Log in with your GitHub account to test OAuth and API integration.

---

## 🧰 Tech Stack  

| Component | Technology |
|------------|-------------|
| **Backend** | Node.js, Express.js |
| **View Engine** | EJS |
| **Authentication** | Passport.js (GitHub Strategy) |
| **Database (optional)** | MongoDB |
| **Security & Middleware** | express-session, express-rate-limit, dotenv |
| **API Handling** | Axios, p-retry |
| **Development** | Nodemon |

---

## 🌐 API Endpoints  

| Endpoint | Description |
|-----------|-------------|
| `/` | Home page with login/logout options |
| `/auth/github` | Redirects to GitHub for OAuth authentication |
| `/auth/github/callback` | Handles GitHub OAuth callback |
| `/api/github/profile` | Fetches authenticated user's GitHub profile |
| `/api/github/repos` | Fetches repositories of authenticated user with pagination |
| `/auth/logout` | Logs out the user and destroys session |

---

## 🧑‍💻 Author  
**Cognifyz Internship Program — Task 07 (Advanced API Usage and External API Integration)**
**Nisha Kushwah**  
B.Tech in Computer Science & Engineering  
Jabalpur Engineering College  

📧 [2004nishakushwah@gmail.com](mailto:2004nishakushwah@gmail.com)  
🌐 [GitHub Profile](https://github.com/NishaKushwah2004)

---
_Where Data Meets Intelligence_


