import express from 'express';
import { PORT } from './config';

const app = express();

app.get('/', (req, res) => {
  res.send('HR Service');
});

app.listen(PORT, () => {
  console.log(`HR Service listening on port ${PORT}`);
});