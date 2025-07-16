import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import userRoutes from './routes/user.route.js';

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  console.error({ err });
  res.status(status).json({ error: message });
});

export default app;
