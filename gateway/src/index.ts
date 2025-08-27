import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from the gateway!');
});

app.listen(port, () => {
  console.log(`Gateway listening at http://localhost:${port}`);
});