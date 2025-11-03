// Centralized error handling middleware

export function notFoundHandler(req, res, next) {
  res.status(404);
  // send JSON for API endpoints, HTML for normal requests
  if (req.path.startsWith('/api')) {
    return res.json({ success: false, message: 'Resource not found' });
  }
  res.render('error', { message: 'Page not found (404)' });
}

export function errorHandler(err, req, res, next) {
  console.error('Unhandled error:', err && err.stack ? err.stack : err);

  // If client expects JSON (api route or Accept header)
  if (req.path.startsWith('/api') || (req.headers.accept && req.headers.accept.includes('application/json'))) {
    const status = err?.response?.status || 500;
    const message = err?.message || 'Internal Server Error';
    return res.status(status).json({ success: false, message });
  }

  // Render friendly error page for browser
  res.status(500);
  res.render('error', { message: 'Something went wrong. Please try again later.' });
}
