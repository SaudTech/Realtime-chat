const express = require('express');
const pool = require('../DB');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
  pool.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result.rows);
    }
  });
});

router.post('/', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: 'Invalid Request' });
    return;
  }
  const userid = uuidv4();
  pool.query('INSERT INTO users (userid, username, password) VALUES ($1, $2, $3, $4, $5)',
    [userid, username, password],
    (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'User created successfully' });
      }
    });
});

router.post('/authenticate', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: 'Invalid Request' });
    return;
  }
  pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.rows.length === 0) {
        res.status(401).json({ error: 'Invalid Credentials' });
      } else {
        res.json(result.rows[0]);
      }
    }
  });
});


module.exports = router;
