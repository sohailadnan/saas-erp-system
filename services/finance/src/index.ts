import express from 'express';
import { PORT } from './config';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken
import { Request, Response, NextFunction } from 'express'; // Import types

// Define JWT_SECRET for this service (should ideally come from config or env)
const JWT_SECRET = process.env.JWT_SECRET || 'finance-secret-key';

// Extend Request to include user property
interface AuthRequest extends Request {
  user?: { id: number };
}

// Auth middleware (adapted from user-management service)
const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Invalid token' });
  }
};

const app = express();
app.use(express.json()); // Enable JSON body parsing

// In-memory data store for transactions (for demonstration)
interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

let transactions: Transaction[] = [];
let nextTransactionId = 1;

app.get('/', (req, res) => {
  res.send('Finance Service');
});

// CRUD Endpoints for Transactions
app.get('/transactions', auth, (req: AuthRequest, res) => {
  // In a real app, filter by req.user.id
  res.send(transactions);
});

app.post('/transactions', auth, (req: AuthRequest, res) => {
  const { description, amount, type, date } = req.body;
  if (!description || !amount || !type || !date) {
    return res.status(400).send({ error: 'Missing required transaction fields' });
  }
  const newTransaction: Transaction = {
    id: (nextTransactionId++).toString(),
    description,
    amount,
    type,
    date,
  };
  transactions.push(newTransaction);
  res.status(201).send(newTransaction);
});

app.get('/transactions/:id', auth, (req: AuthRequest, res) => {
  const transaction = transactions.find(t => t.id === req.params.id);
  if (!transaction) {
    return res.status(404).send({ error: 'Transaction not found' });
  }
  res.send(transaction);
});

app.put('/transactions/:id', auth, (req: AuthRequest, res) => {
  const { description, amount, type, date } = req.body;
  let transaction = transactions.find(t => t.id === req.params.id);
  if (!transaction) {
    return res.status(404).send({ error: 'Transaction not found' });
  }
  transaction.description = description || transaction.description;
  transaction.amount = amount || transaction.amount;
  transaction.type = type || transaction.type;
  transaction.date = date || transaction.date;
  res.send(transaction);
});

app.delete('/transactions/:id', auth, (req: AuthRequest, res) => {
  const initialLength = transactions.length;
  transactions = transactions.filter(t => t.id !== req.params.id);
  if (transactions.length === initialLength) {
    return res.status(404).send({ error: 'Transaction not found' });
  }
  res.status(204).send(); // No Content
});

app.listen(PORT, () => {
  console.log(`Finance Service listening on port ${PORT}`);
});
