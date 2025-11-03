// config/passport.js
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from "dotenv";

dotenv.config();

// ✅ Configure GitHub OAuth Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL:
        process.env.CALLBACK_URL || "http://localhost:3000/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Store only necessary info to reduce session size
      const user = {
        id: profile.id,
        username: profile.username,
        displayName: profile.displayName,
        avatar: profile.photos?.[0]?.value,
        profileUrl: profile.profileUrl,
        accessToken, // token used for GitHub API calls
      };
      return done(null, user);
    }
  )
);

// ✅ Serialize and deserialize user for session
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
