import { Request, Response } from 'express';
import type { LoginResponse, ApiResponse } from '@workspace/types';
import { AuthService } from '../services/auth.service';

export class AuthController {
  // --- PLATFORM ADMIN AUTH ---
  static async loginPlatform(req: Request, res: Response<ApiResponse<LoginResponse>>) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Email and password required' } });
      }

      const token = await AuthService.loginPlatform(email, password);

      res.cookie('platform_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      res.status(200).json({ data: { message: 'Logged in successfully' } });
    } catch (error: any) {
      if (error.code === 'UNAUTHORIZED') {
        return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: error.message } });
      }
      if (error.code === 'FORBIDDEN') {
        return res.status(403).json({ error: { code: 'FORBIDDEN', message: error.message } });
      }
      console.error('[AuthController.loginPlatform] Error:', error);
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
    }
  }

  static async logoutPlatform(req: Request, res: Response<ApiResponse<LoginResponse>>) {
    res.clearCookie('platform_session');
    res.status(200).json({ data: { message: 'Logged out successfully' } });
  }

  // --- ORGANIZATION AUTH ---
  static async loginTenant(req: Request, res: Response<ApiResponse<LoginResponse>>) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Email and password required' } });
      }

      const token = await AuthService.loginTenant(email, password);

      res.cookie('auth_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      res.status(200).json({ data: { message: 'Logged in successfully' } });
    } catch (error:any) {
      if (error.code === 'UNAUTHORIZED') {
        return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: error.message } });
      }
      if (error.code === 'FORBIDDEN') {
        return res.status(403).json({ error: { code: 'FORBIDDEN', message: error.message } });
      }
      console.error('[AuthController.loginTenant] Error:', error);
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
    }
  }

  static async logoutTenant(req: Request, res: Response<ApiResponse<LoginResponse>>) {
    res.clearCookie('auth_session');
    res.status(200).json({ data: { message: 'Logged out successfully' } });
  }

  // static async getTenants(req: Request, res: Response) {
  //   try {
  //     const userId = req.user.userId;

  //     // Select tenants the user is a member of
  //     const userOrgs = await db
  //       .select({
  //         tenantId: tenants.id,
  //         name: tenants.name,
  //         slug: tenants.slug,
  //         role: tenantMembers.role,
  //       })
  //       .from(tenantMembers)
  //       .innerJoin(tenants, eq(tenantMembers.tenantId, tenants.id))
  //       .where(eq(tenantMembers.userId, userId));

  //     res.status(200).json({ data: userOrgs });
  //   } catch (error) {
  //     console.error('[AuthController.getTenants] Error:', error);
  //     res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
  //   }
  // }

  // static async selectTenant(req: Request, res: Response) {
  //   try {
  //     const userId = req.user.userId;
  //     const { tenantId } = req.body;

  //     if (!tenantId) {
  //       return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Tenant ID is required' } });
  //     }

  //     // Verify membership
  //     const memberList = await db
  //       .select()
  //       .from(tenantMembers)
  //       .where(and(
  //         eq(tenantMembers.userId, userId),
  //         eq(tenantMembers.tenantId, tenantId)
  //       ))
  //       .limit(1);

  //     const member = memberList[0];
  //     if (!member) {
  //       return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Not a member of this tenant' } });
  //     }

  //     const token = jwt.sign(
  //       { userId, tenantId, role: member.role },
  //       JWT_SECRET,
  //       { expiresIn: '1d' }
  //     );

  //     res.cookie('tenant_session', token, {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === 'production',
  //       sameSite: 'lax',
  //       maxAge: 24 * 60 * 60 * 1000,
  //     });

  //     res.status(200).json({ data: { message: 'Tenant selected' } });
  //   } catch (error) {
  //     console.error('[AuthController.selectTenant] Error:', error);
  //     res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
  //   }
  // }
}
