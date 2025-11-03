// server.js
import express from "express";
import bodyParser  from "body-parser";
const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // For serving CSS and other static files

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Route: Home page with form
app.get('/', (req, res) => {
  res.render('index');
});

// Route: Handle form submission
app.post('/submit', (req, res) => {
  const { username, email } = req.body;
  res.render('result', { username, email });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
