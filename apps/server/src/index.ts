import { app } from './app';
import * as dotenv from 'dotenv';
import { db, organizations } from '@workspace/db'; // Verifying DB connection access

dotenv.config({ path: '../../.env' });

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    // Optional: verify DB connection on startup
    // await db.select().from(organizations).limit(1);
    
    app.listen(PORT, () => {
      console.log(`[API] Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('[API] Failed to start server:', error);
    process.exit(1);
  }
};

start();
