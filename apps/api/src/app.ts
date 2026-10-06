import express from 'express';
import cors from 'cors';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Future routes will be mounted here
// app.use('/api/v1', routes);
