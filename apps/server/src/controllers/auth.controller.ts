import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db, users, platformMembers } from '@workspace/db';
import { eq } from 'drizzle-orm';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-fallback-key';

export class AuthController {
  static async loginAdmin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Email and password required' } });
      }

      console.log(req.body);

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
}
