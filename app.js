const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Serve static frontend from "public" directory
app.use(express.static('public'));

// API route
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to My API!',
    status: 'success',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
