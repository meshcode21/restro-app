import { db, branches, branchMembers, organizationMembers } from '@workspace/db';
import { CreateBranchInput } from '@workspace/validation';
import { eq, and } from 'drizzle-orm';

export class BranchService {
  static async createBranch(organizationId: string, data: CreateBranchInput) {
    const [branch] = await db.insert(branches).values({
      organizationId,
      name: data.name,
      slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    }).returning();
    
    return branch;
  }

  static async listBranches(organizationId: string, userId: string, role: string) {
    if (role === 'owner' || role === 'admin') {
      return await db.select()
        .from(branches)
        .where(eq(branches.organizationId, organizationId));
    } else {
      // If member, only return branches they are explicitly assigned to
      const userBranches = await db.select({
        id: branches.id,
        organizationId: branches.organizationId,
        name: branches.name,
        slug: branches.slug,
        status: branches.status,
        createdAt: branches.createdAt,
        updatedAt: branches.updatedAt,
      })
      .from(branches)
      .innerJoin(
        branchMembers,
        eq(branchMembers.branchId, branches.id)
      )
      .innerJoin(
        organizationMembers,
        eq(organizationMembers.id, branchMembers.organizationMemberId)
      )
      .where(
        and(
          eq(branches.organizationId, organizationId),
          eq(organizationMembers.userId, userId)
        )
      );
      
      return userBranches;
    }
  }
}
