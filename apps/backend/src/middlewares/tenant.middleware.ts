import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-fallback-key';

export interface TenantRequest extends Request {
  tenant?: {
    userId: string;
    tenantId: string;
    role: string;
  };
}

export const requireTenant = (req: TenantRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.tenant_session;
  
  if (!token) {
    return res.status(401).json({ 
      error: { code: 'UNAUTHORIZED', message: 'Missing tenant session' } 
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    req.tenant = {
      userId: decoded.userId,
      tenantId: decoded.tenantId,
      role: decoded.role
    };

    next();
  } catch (err) {
    return res.status(401).json({ 
      error: { code: 'UNAUTHORIZED', message: 'Invalid or expired tenant session' } 
    });
  }
};
