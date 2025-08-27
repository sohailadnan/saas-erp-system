import express from 'express';
import { PORT } from './config';

const app = express();

app.get('/', (req, res) => {
  res.send('Finance Service');
});

app.listen(PORT, () => {
  console.log(`Finance Service listening on port ${PORT}`);
});