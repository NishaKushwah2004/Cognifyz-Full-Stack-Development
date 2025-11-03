// server.js
import express from "express";
import bodyParser  from "body-parser";
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index', { error: null });
});

app.post('/submit', (req, res) => {
  const { username, email, age } = req.body;

  if (!username || !email || !age) {
    return res.render('index', { error: 'All fields are required!' });
  }

  res.render('success', { username, email, age });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
