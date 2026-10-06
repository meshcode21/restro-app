import express, { type Application } from 'express';
import cors from 'cors';
import superAdminRoutes from './routes/super-admin.routes';
import branchRoutes from './routes/branch.routes';

export const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/admin', superAdminRoutes);
app.use('/api/branches', branchRoutes);
