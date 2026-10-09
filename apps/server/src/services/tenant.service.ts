import { db, tenants, users, tenantMembers, subscriptions, branches } from '@workspace/db';
import { OnboardTenantInput } from '@workspace/validation';
import bcrypt from 'bcryptjs';

export class TenantService {
  static async onboardTenant(data: OnboardTenantInput) {
    // CODING_STANDARDS: Use transactions for atomic business operations.
    return await db.transaction(async (tx) => {
      // 1. Create Tenant (SaaS Tenant)
      const [org] = await tx.insert(tenants).values({
        name: data.tenantName,
        slug: data.slug,
        status: 'active',
      }).returning();

      // 2. Create initial Admin User
      const [user] = await tx.insert(users).values({
        name: data.adminName,
        email: data.adminEmail,
        passwordHash: await bcrypt.hash(data.adminPassword, 10),
      }).returning();

      if (!org || !user) {
        throw new Error('Failed to create tenant or user');
      }

      // 3. Link User to Tenant as ORG_ADMIN
      await tx.insert(tenantMembers).values({
        userId: user.id,
        tenantId: org.id,
        role: 'admin',
      });

      // 4. Create default subscription
      await tx.insert(subscriptions).values({
        tenantId: org.id,
        plan: 'starter',
        status: 'trialing',
      });

      // 5. Create default branch
      await tx.insert(branches).values({
        tenantId: org.id,
        name: data.branchName,
        slug: data.branchSlug,
        status: 'active',
      });

      return { 
        tenantId: org.id, 
        userId: user.id 
      };
    });
  }
}
