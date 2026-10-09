import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db, users, platformMembers, organizationMembers, organizations } from '@workspace/db';
import { eq, and } from 'drizzle-orm';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-fallback-key';

export class AuthController {
  // --- PLATFORM ADMIN AUTH ---
  static async loginAdmin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Email and password required' } });
      }

      // Find user
      const userList = await db.select().from(users).where(eq(users.email, email)).limit(1);
      const user = userList[0];

      if (!user || !user.passwordHash) {
        return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid credentials' } });
      }

      // Check if user is a platform member
      const platformMemberList = await db.select().from(platformMembers).where(eq(platformMembers.userId, user.id)).limit(1);
      const platformMember = platformMemberList[0];

      if (!platformMember || platformMember.status !== 'active') {
        return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Access denied' } });
      }

      // Verify password
      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid) {
        return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid credentials' } });
      }

      // Create JWT
      const token = jwt.sign(
        { userId: user.id, role: platformMember.role },
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      // Set cookie
      res.cookie('platform_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      res.status(200).json({ data: { message: 'Logged in successfully' } });
    } catch (error) {
      console.error('[AuthController.loginAdmin] Error:', error);
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
    }
  }

  static async logoutAdmin(req: Request, res: Response) {
    res.clearCookie('platform_session');
    res.status(200).json({ data: { message: 'Logged out successfully' } });
  }

  // --- ORGANIZATION AUTH ---
  static async loginOrganization(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Email and password required' } });
      }

      const userList = await db.select().from(users).where(eq(users.email, email)).limit(1);
      const user = userList[0];

      if (!user || !user.passwordHash) {
        return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid credentials' } });
      }

      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid) {
        return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid credentials' } });
      }

      const token = jwt.sign(
        { userId: user.id },
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.cookie('auth_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ data: { message: 'Identity verified' } });
    } catch (error) {
      console.error('[AuthController.loginOrganization] Error:', error);
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
    }
  }

  static async getOrganizations(req: Request, res: Response) {
    try {
      const userId = req.user.userId;

      // Select organizations the user is a member of
      const userOrgs = await db
        .select({
          organizationId: organizations.id,
          name: organizations.name,
          slug: organizations.slug,
          role: organizationMembers.role,
        })
        .from(organizationMembers)
        .innerJoin(organizations, eq(organizationMembers.organizationId, organizations.id))
        .where(eq(organizationMembers.userId, userId));

      res.status(200).json({ data: userOrgs });
    } catch (error) {
      console.error('[AuthController.getOrganizations] Error:', error);
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
    }
  }

  static async selectOrganization(req: Request, res: Response) {
    try {
      const userId = req.user.userId;
      const { organizationId } = req.body;

      if (!organizationId) {
        return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Organization ID is required' } });
      }

      // Verify membership
      const memberList = await db
        .select()
        .from(organizationMembers)
        .where(and(
          eq(organizationMembers.userId, userId),
          eq(organizationMembers.organizationId, organizationId)
        ))
        .limit(1);

      const member = memberList[0];
      if (!member) {
        return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Not a member of this organization' } });
      }

      const token = jwt.sign(
        { userId, organizationId, role: member.role },
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.cookie('tenant_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ data: { message: 'Organization selected' } });
    } catch (error) {
      console.error('[AuthController.selectOrganization] Error:', error);
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
    }
  }

  static async logoutOrganization(req: Request, res: Response) {
    res.clearCookie('auth_session');
    res.clearCookie('tenant_session');
    res.status(200).json({ data: { message: 'Logged out successfully' } });
  }
}
