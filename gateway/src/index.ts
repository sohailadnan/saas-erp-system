import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const port = 3000;

// Proxy middleware for User Management Service
app.use('/users', createProxyMiddleware({
  target: 'http://user-service:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/users': '', // remove /users from the path
  },
}));

// Proxy middleware for Inventory Service
app.use('/inventory', createProxyMiddleware({
  target: 'http://inventory-service:3002',
  changeOrigin: true,
  pathRewrite: {
    '^/inventory': '',
  },
}));

// Proxy middleware for Finance Service
app.use('/finance', createProxyMiddleware({
  target: 'http://finance-service:3003',
  changeOrigin: true,
  pathRewrite: {
    '^/finance': '',
  },
}));

// Proxy middleware for HR Service
app.use('/hr', createProxyMiddleware({
  target: 'http://hr-service:3004',
  changeOrigin: true,
  pathRewrite: {
    '^/hr': '',
  },
}));

app.get('/', (req, res) => {
  res.send('Hello from the gateway!');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Gateway listening at http://0.0.0.0:${port}`);
});
