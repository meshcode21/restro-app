import { Request, Response, NextFunction } from 'express';

// Super Admin authorization middleware
export const requireSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  // CODING_STANDARDS: Hardcoded boundary until exact auth provider is decided
  if (authHeader !== 'Bearer dev-super-admin') {
    return res.status(403).json({
      error: { code: 'FORBIDDEN', message: 'Super Admin access required' }
    });
  }
  
  next();
};
