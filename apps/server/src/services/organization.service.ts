import { db, organizations, users, organizationMembers, subscriptions } from '@workspace/db';
import { OnboardOrganizationInput } from '@workspace/validation';
import bcrypt from 'bcryptjs';

export class OrganizationService {
  static async onboardOrganization(data: OnboardOrganizationInput) {
    // CODING_STANDARDS: Use transactions for atomic business operations.
    return await db.transaction(async (tx) => {
      // 1. Create Organization (SaaS Tenant)
      const [org] = await tx.insert(organizations).values({
        name: data.organizationName,
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
        throw new Error('Failed to create organization or user');
      }

      // 3. Link User to Organization as ORG_ADMIN
      await tx.insert(organizationMembers).values({
        userId: user.id,
        organizationId: org.id,
        role: 'admin',
      });

      // 4. Create default subscription
      await tx.insert(subscriptions).values({
        organizationId: org.id,
        plan: 'starter',
        status: 'trialing',
      });

      return { 
        organizationId: org.id, 
        userId: user.id 
      };
    });
  }
}
