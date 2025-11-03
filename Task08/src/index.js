import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import expressLayouts from 'express-ejs-layouts';

import indexRouter from './routes/indexRouter.js';
import requestLogger from './middleware/requestLogger.js';
import cacheMiddleware from './middleware/cache.js';
import errorHandler from './middleware/errorHandler.js';
import './jobs/emailJobWorker.js'; // start background worker


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Security & performance middlewares
app.use(helmet());
app.use(compression());

// Set EJS as view engine + enable layouts
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout'); // 👈 this ensures every EJS file uses layout.ejs

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// Built-in body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('dev'));
app.use(requestLogger);

// Routes (with caching for optimization)
app.use('/', cacheMiddleware(30), indexRouter);

// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Cognifyz server running on http://localhost:${PORT}`);
});
