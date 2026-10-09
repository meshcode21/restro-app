import { db, users, tenantMembers, branchMembers, platformMembers } from '@workspace/db';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-fallback-key';

export class AppError extends Error {
  code: string;
  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}

export class AuthService {
  // platform login
  static async loginPlatform(email: string, password: string): Promise<string> {
    const userList = await db.select().from(users).where(eq(users.email, email)).limit(1);
    const user = userList[0];

    if (!user || !user.passwordHash) {
      throw new AppError('Invalid credentials', 'UNAUTHORIZED');
    }

    const platformMemberList = await db.select().from(platformMembers).where(eq(platformMembers.userId, user.id)).limit(1);
    const platformMember = platformMemberList[0];

    if (!platformMember || platformMember.status !== 'active') {
      throw new AppError('Access denied', 'FORBIDDEN');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new AppError('Invalid credentials', 'UNAUTHORIZED');
    }

    const token = jwt.sign(
      { userId: user.id, role: platformMember.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return token;
  }

  // tenant login
  static async loginTenant(email: string, password: string): Promise<string> {
    const userList = await db.select().from(users).where(eq(users.email, email)).limit(1);
    const user = userList[0];

    if (!user || !user.passwordHash) {
      throw new AppError('Invalid credentials', 'UNAUTHORIZED');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new AppError('Invalid credentials', 'UNAUTHORIZED');
    }

    const tenantMembersList = await db.select().from(tenantMembers).where(eq(tenantMembers.userId, user.id)).limit(1);
    const tenantMember = tenantMembersList[0];

    if (!tenantMember || tenantMember.status !== 'active') {
      throw new AppError('Access denied', 'FORBIDDEN');
    }

    let token = '';

    if (tenantMember.role === 'branch_member') {
      const branchMemberList = await db.select().from(branchMembers).where(eq(branchMembers.tenantMemberId, tenantMember.id)).limit(1);
      const branchMember = branchMemberList[0];
      if (!branchMember) {
        throw new AppError('Access denied', 'FORBIDDEN');
      }

      token = jwt.sign(
        { userId: user.id, branchId: branchMember.id, role: branchMember.role },
        JWT_SECRET,
        { expiresIn: '1d' }
      );
    } else {
      token = jwt.sign(
        { userId: user.id, tenantId: tenantMember.id, role: tenantMember.role },
        JWT_SECRET,
        { expiresIn: '1d' }
      );
    }

    return token;
  }
}
