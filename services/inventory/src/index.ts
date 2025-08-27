import express from 'express';
import { PORT } from './config';

const app = express();

app.get('/', (req, res) => {
  res.send('Inventory Service');
});

app.listen(PORT, () => {
  console.log(`Inventory Service listening on port ${PORT}`);
});