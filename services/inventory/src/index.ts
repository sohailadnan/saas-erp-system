import express from 'express';
import { PORT } from './config';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken
import { Request, Response, NextFunction } from 'express'; // Import types

// Define JWT_SECRET for this service (should ideally come from config or env)
const JWT_SECRET = process.env.JWT_SECRET || 'inventory-secret-key';

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

// In-memory data store for products (for demonstration)
interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

let products: Product[] = [];
let nextProductId = 1;

app.get('/', (req, res) => {
  res.send('Inventory Service');
});

// CRUD Endpoints for Products
app.get('/products', auth, (req: AuthRequest, res) => {
  res.send(products);
});

app.post('/products', auth, (req: AuthRequest, res) => {
  const { name, quantity, price } = req.body;
  if (!name || !quantity || !price) {
    return res.status(400).send({ error: 'Missing required product fields' });
  }
  const newProduct: Product = {
    id: (nextProductId++).toString(),
    name,
    quantity,
    price,
  };
  products.push(newProduct);
  res.status(201).send(newProduct);
});

app.get('/products/:id', auth, (req: AuthRequest, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).send({ error: 'Product not found' });
  }
  res.send(product);
});

app.put('/products/:id', auth, (req: AuthRequest, res) => {
  const { name, quantity, price } = req.body;
  let product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).send({ error: 'Product not found' });
  }
  product.name = name || product.name;
  product.quantity = quantity || product.quantity;
  product.price = price || product.price;
  res.send(product);
});

app.delete('/products/:id', auth, (req: AuthRequest, res) => {
  const initialLength = products.length;
  products = products.filter(p => p.id !== req.params.id);
  if (products.length === initialLength) {
    return res.status(404).send({ error: 'Product not found' });
  }
  res.status(204).send(); // No Content
});

app.listen(PORT, () => {
  console.log(`Inventory Service listening on port ${PORT}`);
});
