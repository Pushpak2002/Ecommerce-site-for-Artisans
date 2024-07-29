const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectToMongo();

const port = 5000;

// Route handlers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/product', require('./routes/product_list'));
app.use('/api/cart', require('./routes/cartProduct'));
app.use('/api/phonepe', require('./routes/phonepe'));

app.post('/', (req, res) => {
  res.send('Hello Pushpak!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
