// server.js

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import { fileURLToPath } from 'url';
import { apiLimiter } from './middleware/rateLimiter.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import apiRoutes from './routes/api.js';
import './config/passport.js'; // Initializes GitHub OAuth strategy

const app = express();
const PORT = process.env.PORT || 3000;

// __dirname replacement for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----------------------
// View engine setup
// ----------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ----------------------
// Middleware setup
// ----------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session config
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
  })
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// ----------------------
// Routes
// ----------------------
app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

app.use('/auth', authRoutes);
app.use('/api', apiLimiter, apiRoutes);

// Profile route (protected)
app.get('/profile', ensureAuthenticated, (req, res) => {
  res.render('profile', { profile: req.user });
});

// ----------------------
// Error handling
// ----------------------
app.use(notFoundHandler);
app.use(errorHandler);

// ----------------------
// Auth check middleware
// ----------------------
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

// ----------------------
// Start server
// ----------------------
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
