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
  static async loginOrganization(req: Request, res: Response<ApiResponse<LoginResponse>>) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Email and password required' } });
      }

      const token = await AuthService.loginOrganization(email, password);

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
      console.error('[AuthController.loginOrganization] Error:', error);
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
    }
  }

  static async logoutOrganization(req: Request, res: Response<ApiResponse<LoginResponse>>) {
    res.clearCookie('auth_session');
    res.status(200).json({ data: { message: 'Logged out successfully' } });
  }

  // static async getOrganizations(req: Request, res: Response) {
  //   try {
  //     const userId = req.user.userId;

  //     // Select organizations the user is a member of
  //     const userOrgs = await db
  //       .select({
  //         organizationId: organizations.id,
  //         name: organizations.name,
  //         slug: organizations.slug,
  //         role: organizationMembers.role,
  //       })
  //       .from(organizationMembers)
  //       .innerJoin(organizations, eq(organizationMembers.organizationId, organizations.id))
  //       .where(eq(organizationMembers.userId, userId));

  //     res.status(200).json({ data: userOrgs });
  //   } catch (error) {
  //     console.error('[AuthController.getOrganizations] Error:', error);
  //     res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
  //   }
  // }

  // static async selectOrganization(req: Request, res: Response) {
  //   try {
  //     const userId = req.user.userId;
  //     const { organizationId } = req.body;

  //     if (!organizationId) {
  //       return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Organization ID is required' } });
  //     }

  //     // Verify membership
  //     const memberList = await db
  //       .select()
  //       .from(organizationMembers)
  //       .where(and(
  //         eq(organizationMembers.userId, userId),
  //         eq(organizationMembers.organizationId, organizationId)
  //       ))
  //       .limit(1);

  //     const member = memberList[0];
  //     if (!member) {
  //       return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Not a member of this organization' } });
  //     }

  //     const token = jwt.sign(
  //       { userId, organizationId, role: member.role },
  //       JWT_SECRET,
  //       { expiresIn: '1d' }
  //     );

  //     res.cookie('tenant_session', token, {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === 'production',
  //       sameSite: 'lax',
  //       maxAge: 24 * 60 * 60 * 1000,
  //     });

  //     res.status(200).json({ data: { message: 'Organization selected' } });
  //   } catch (error) {
  //     console.error('[AuthController.selectOrganization] Error:', error);
  //     res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
  //   }
  // }
}
