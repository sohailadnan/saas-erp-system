import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import { PORT, DB_HOST } from './config';
import { auth, AuthRequest, JWT_SECRET } from './middleware/auth';

const app = express();
app.use(express.json());

const pool = new Pool({
  host: DB_HOST,
  user: 'erpadmin',
  password: process.env.DB_PASSWORD,
  database: 'erp_saas',
});

app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).send({ error: 'Username, password, and email are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const result = await pool.query(
      'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id',
      [username, hashedPassword, email]
    );
    const user = result.rows[0];
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: 'Email and password are required' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/profile', auth, async (req: AuthRequest, res) => {
  try {
    const result = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [req.user?.id]);
    const user = result.rows[0];
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/', (req, res) => {
  res.send('User Management Service');
});

app.listen(PORT, () => {
  console.log(`User Management Service listening on port ${PORT}`);
});