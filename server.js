const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// Registration Route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const connection = await mysql.createConnection({
      host: 'localhost', // Change to your actual host if needed
      user: 'root',
      password: 'Mohit@2004', // Change to your actual password
      database: 'e_commerece'
    });

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    await connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

    res.send('Registration successful!');
  } catch (error) {
    console.error('Error registering user:', error);
    res.send('Registration failed. Please try again.');
  } finally {
    connection.end();
  }
});

// Login Route
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const connection = await mysql.createConnection({
      host: 'localhost', // Change to your actual host 
      user: 'root', // Change to your actual username 
      password: 'Mohit@2004', // Change to your actual password
      database: 'e_commerece' // Change to your actual database
    });

    const [rows] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length > 0) {
      const storedPassword = rows[0].password;
      const passwordMatch = await bcrypt.compare(password, storedPassword);

      if (passwordMatch) {
        // Successful login, redirect to homepage
        res.redirect('/homepage');
      } else {
        res.send('Invalid password');
      }
    } else {
      res.send('User not found');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.send('Login failed. Please try again.');
  } finally {
    connection.end();
  }
});

app.get('/homepage', (req, res) => {
  res.send('Welcome to the homepage!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});