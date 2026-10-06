import { Request, Response, NextFunction } from 'express';

export interface TenantRequest extends Request {
  tenant?: {
    userId: string;
    organizationId: string;
    role: string;
  };
}

export const requireTenant = (req: TenantRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      error: { code: 'UNAUTHORIZED', message: 'Missing token' } 
    });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ 
      error: { code: 'UNAUTHORIZED', message: 'Missing token string' } 
    });
  }
  
  // Mock token parser until real auth provider is implemented (ADR-001)
  // Format: org_<orgId>_user_<userId>_role_<role>
  const match = token.match(/^org_(.+?)_user_(.+?)_role_(.+)$/);
  if (!match || !match[1] || !match[2] || !match[3]) {
    return res.status(401).json({ 
      error: { code: 'UNAUTHORIZED', message: 'Invalid token format' } 
    });
  }

  req.tenant = {
    organizationId: match[1],
    userId: match[2],
    role: match[3]
  };

  next();
};
