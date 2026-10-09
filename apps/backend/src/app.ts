import express, { type Application } from 'express';
import cors from 'cors';
import superAdminRoutes from './routes/super-admin.routes';
import branchRoutes from './routes/branch.routes';
import menuRoutes from './routes/menu.routes';

import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';

export const app: Application = express();

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', superAdminRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/menu', menuRoutes);
