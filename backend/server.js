const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with your own secret key

app.use(express.json());

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'quickserve', // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// User registration endpoint
app.post('/api/register', async (req, res) => {
  const { name, email, password, department } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Fixed the query by removing the extra comma and ensuring column names match the table
    const query = 'INSERT INTO user (name, email, password, department, created_at) VALUES (?, ?, ?, ?, NOW())';
    
    db.query(query, [name, email, hashedPassword, department], (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = 'SELECT * FROM user WHERE email = ?';
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: user.userID }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Order placement endpoint
app.post('/api/orders', async (req, res) => {
  const { userID, itemID, paymentStat, status, total } = req.body;

  try {
    const query = 'INSERT INTO orders (userID, itemID, paymentStat, status, total) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [userID, itemID, paymentStat, status, total], (err, result) => {
      if (err) {
        console.error('Error placing order:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json({ message: 'Order placed successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Order retrieval endpoint
app.get('/api/orders/:userID', async (req, res) => {
  const { userID } = req.params;

  try {
    const query = 'SELECT * FROM orders WHERE userID = ?';
    db.query(query, [userID], (err, results) => {
      if (err) {
        console.error('Error fetching orders:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(results);
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});