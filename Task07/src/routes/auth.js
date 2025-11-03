// routes/auth.js
import express from 'express';
import passport from 'passport';

const router = express.Router();

// Step 1: Redirect to GitHub for authentication
router.get('/github', passport.authenticate('github'));

// Step 2: Handle callback
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/error' }),
  (req, res) => {
    res.redirect('/profile'); // redirect to profile on success
  }
);

// Step 3: Logout
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

export default router;
