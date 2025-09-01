import express from 'express';
import { PORT } from './config';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken
import { Request, Response, NextFunction } from 'express'; // Import types

// Define JWT_SECRET for this service (should ideally come from config or env)
const JWT_SECRET = process.env.JWT_SECRET || 'hr-secret-key';

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

// In-memory data store for employees (for demonstration)
interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
}

let employees: Employee[] = [];
let nextEmployeeId = 1;

app.get('/', (req, res) => {
  res.send('HR Service');
});

// CRUD Endpoints for Employees
app.get('/employees', auth, (req: AuthRequest, res) => {
  res.send(employees);
});

app.post('/employees', auth, (req: AuthRequest, res) => {
  const { name, position, department } = req.body;
  if (!name || !position || !department) {
    return res.status(400).send({ error: 'Missing required employee fields' });
  }
  const newEmployee: Employee = {
    id: (nextEmployeeId++).toString(),
    name,
    position,
    department,
  };
  employees.push(newEmployee);
  res.status(201).send(newEmployee);
});

app.get('/employees/:id', auth, (req: AuthRequest, res) => {
  const employee = employees.find(e => e.id === req.params.id);
  if (!employee) {
    return res.status(404).send({ error: 'Employee not found' });
  }
  res.send(employee);
});

app.put('/employees/:id', auth, (req: AuthRequest, res) => {
  const { name, position, department } = req.body;
  let employee = employees.find(e => e.id === req.params.id);
  if (!employee) {
    return res.status(404).send({ error: 'Employee not found' });
  }
  employee.name = name || employee.name;
  employee.position = position || employee.position;
  employee.department = department || employee.department;
  res.send(employee);
});

app.delete('/employees/:id', auth, (req: AuthRequest, res) => {
  const initialLength = employees.length;
  employees = employees.filter(e => e.id !== req.params.id);
  if (employees.length === initialLength) {
    return res.status(404).send({ error: 'Employee not found' });
  }
  res.status(204).send(); // No Content
});

app.listen(PORT, () => {
  console.log(`HR Service listening on port ${PORT}`);
});
