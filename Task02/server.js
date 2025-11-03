// server.js
import express from "express";
import bodyParser  from "body-parser";
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Temporary in-memory storage (array)
const users = [];

// Home Route
app.get('/', (req, res) => {
  res.render('index', { error: null, oldData: {} });
});

// Handle Form Submission
app.post('/submit', (req, res) => {
  const { username, email, age } = req.body;

  // --- Server-Side Validation ---
  if (!username || !email || !age) {
    return res.render('index', {
      error: 'All fields are required!',
      oldData: { username, email, age },
    });
  }

  if (!/^[a-zA-Z ]+$/.test(username)) {
    return res.render('index', {
      error: 'Username must contain only letters and spaces.',
      oldData: { username, email, age },
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.render('index', {
      error: 'Please enter a valid email address.',
      oldData: { username, email, age },
    });
  }

  if (isNaN(age) || age < 10 || age > 100) {
    return res.render('index', {
      error: 'Age must be a number between 10 and 100.',
      oldData: { username, email, age },
    });
  }

  // Store validated user
  users.push({ username, email, age });

  res.render('success', { username, email, age });
});

// View all users (optional)
app.get('/users', (req, res) => {
  res.json(users);
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
