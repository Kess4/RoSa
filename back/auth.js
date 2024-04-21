// authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');

const router = express.Router();

// Inscription
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO agent (username, password) VALUES ($1, $2)', [
      username,
      hashedPassword,
    ]);
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('An error occurred during registration');
  }
});

// Connexion
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await pool.query('SELECT * FROM agent WHERE username = $1 and password = $2', [
      username,
      password
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username ' });
    }
    if (password !== user.rows[0].password) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    
    // const passwordMatch = await bcrypt.compare(
    //   password,
    //   user.rows[0].password
    // );
    // if (!passwordMatch) {
    //   return res.status(404).json({ message: 'Invalid password' });
    // }
    const token = jwt.sign(
      { id: user.rows[0].id, username: user.rows[0].username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
    // console.log(res.body)
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('An error occurred during login');
  }
});

// Route pour récupérer les données des agents
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    // Vérifier et décoder le token JWT
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;   // Extraire les informations sur l'utilisateur à partir du token
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

  // Récupérer les informations sur l'utilisateur à partir du token décodé
  router.get('/profile', authenticateUser, (req, res) => {
  const { id, username, email } = req.user;
    res.json({ id, username, email });
});

module.exports = router;
