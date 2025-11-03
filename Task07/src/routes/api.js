import express from 'express';
import axios from 'axios';
import pRetry from 'p-retry';

const router = express.Router();

// middleware: ensure authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  res.status(401).render('error', { message: 'Not authenticated. Please sign in via GitHub.' });
}

/**
 * Get profile info from GitHub (using access token stored in session).
 */
router.get('/github/profile', ensureAuthenticated, async (req, res, next) => {
  const token = req.user?.accessToken;
  if (!token) return res.status(400).render('error', { message: 'No access token available.' });

  const fetchProfile = async () => {
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${token}`,
        'User-Agent': 'Cognifyz-Task7-App'
      },
      timeout: 5000
    });
    return response.data;
  };

  try {
    const profile = await pRetry(fetchProfile, { retries: 2, factor: 2 });
    res.render('profile', { user: req.user, profile });
  } catch (err) {
    console.error('Failed to fetch GitHub profile:', err.message || err);
    next(err);
  }
});

/**
 * Get user's repositories (with pagination).
 */
router.get('/github/repos', ensureAuthenticated, async (req, res, next) => {
  const token = req.user?.accessToken;
  const page = parseInt(req.query.page || '1', 10);
  const per_page = Math.min(50, Math.max(5, parseInt(req.query.per_page || '10', 10)));

  try {
    const fetchRepos = async () => {
      const response = await axios.get('https://api.github.com/user/repos', {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${token}`,
          'User-Agent': 'Cognifyz-Task7-App'
        },
        params: { page, per_page },
        timeout: 7000
      });
      return response.data;
    };

    const repos = await pRetry(fetchRepos, { retries: 2 });
    res.json({ success: true, page, per_page, repos });
  } catch (err) {
    if (err.response?.status === 403) {
      const reset = err.response.headers['x-ratelimit-reset'];
      const resetTime = reset ? new Date(parseInt(reset, 10) * 1000) : null;
      const message = 'Upstream API rate limit hit. Try again later.';
      return res.status(429).json({ success: false, message, reset: resetTime });
    }
    console.error('Failed to fetch repos:', err.message || err);
    next(err);
  }
});

export default router;
