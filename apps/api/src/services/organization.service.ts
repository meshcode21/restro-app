import { db, organizations, users, organizationMembers } from '@workspace/db';
import { OnboardOrganizationInput } from '@workspace/validation';
import * as crypto from 'crypto';

export class OrganizationService {
  static async onboardOrganization(data: OnboardOrganizationInput) {
    // CODING_STANDARDS: Use transactions for atomic business operations.
    return await db.transaction(async (tx) => {
      // 1. Create Organization (SaaS Tenant)
      const [org] = await tx.insert(organizations).values({
        name: data.organizationName,
        subscriptionStatus: 'ACTIVE',
      }).returning();

      // 2. Create initial Admin User
      const [user] = await tx.insert(users).values({
        name: data.adminName,
        email: data.adminEmail,
        // Basic hash until auth provider is decided (ADR-001)
        passwordHash: crypto.createHash('sha256').update(data.adminPassword).digest('hex'),
      }).returning();

      if (!org || !user) {
        throw new Error('Failed to create organization or user');
      }

      // 3. Link User to Organization as ORG_ADMIN
      await tx.insert(organizationMembers).values({
        userId: user.id,
        organizationId: org.id,
        role: 'ORG_ADMIN',
      });

      return { 
        organizationId: org.id, 
        userId: user.id 
      };
    });
  }
}
