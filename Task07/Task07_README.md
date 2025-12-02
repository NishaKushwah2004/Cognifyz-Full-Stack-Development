
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

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (optional, for user data storage)
- GitHub account (for OAuth setup)

### Steps

1. **Navigate to the project folder**:  
   ```bash
   cd Task07
   ```

2. **Install dependencies**:  
   ```bash
   npm install
   ```

3. **Set up GitHub OAuth**:
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Create a new OAuth App
   - Set Authorization callback URL to: `http://localhost:3000/auth/github/callback`
   - Copy the Client ID and Client Secret

4. **Configure environment variables**:
   Create a `.env` file using `.env.example` and fill in the required values:
   ```env
   PORT=3000
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   SESSION_SECRET=your_random_session_secret
   ```

5. **Start the development server**:  
   ```bash
   npm run dev
   ```

6. **Access the application**:  
   Open your browser and visit: 👉 [http://localhost:3000](http://localhost:3000)

7. **Test OAuth integration**:  
   Click "Login with GitHub" to test OAuth authentication and API integration.

---

## 🛠️ Tech Stack  

| Component | Technology |
|------------|-------------|
| **Backend** | Node.js, Express.js |
| **View Engine** | EJS (Embedded JavaScript Templates) |
| **Authentication** | Passport.js (GitHub OAuth Strategy) |
| **Database (optional)** | MongoDB |
| **Security & Middleware** | express-session, express-rate-limit, dotenv |
| **API Handling** | Axios, p-retry |
| **Development** | Nodemon (auto-reload) |

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

## 📚 Learning Outcomes

- Implementation of **OAuth 2.0 authentication** flow with GitHub
- Integration with **external REST APIs** (GitHub API)
- Understanding **API rate limiting** for security and abuse prevention
- Implementation of **retry mechanisms** for failed API requests
- **Centralized error handling** for better user experience
- **Session management** with secure cookies
- Working with **Passport.js** for authentication strategies

---

## 👩‍💻 Author

**Nisha Kushwah**  
**B.Tech in Computer Science & Engineering**  
**Jabalpur Engineering College**

📧 [2004nishakushwah@gmail.com](mailto:2004nishakushwah@gmail.com)  
🌐 [GitHub Profile](https://github.com/NishaKushwah2004)

---

> *"Where Data Meets Intelligence — Cognifyz"*


