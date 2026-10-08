import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-fallback-key';

// Extend express Request to include user payload
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Super Admin authorization middleware
export const requireSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.platform_session;

  if (!token) {
    return res.status(401).json({
      error: { code: 'UNAUTHORIZED', message: 'Authentication required' }
    });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // We only allow roles belonging to platform_members
    if (decoded.role !== 'admin' && decoded.role !== 'owner' && decoded.role !== 'support' && decoded.role !== 'billing') {
      return res.status(403).json({
        error: { code: 'FORBIDDEN', message: 'Super Admin access required' }
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      error: { code: 'UNAUTHORIZED', message: 'Invalid or expired session' }
    });
  }
};
