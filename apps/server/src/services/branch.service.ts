import { db, branches, branchMembers, tenantMembers } from '@workspace/db';
import { CreateBranchInput } from '@workspace/validation';
import { eq, and } from 'drizzle-orm';

export class BranchService {
  static async createBranch(tenantId: string, data: CreateBranchInput) {
    const [branch] = await db.insert(branches).values({
      tenantId,
      name: data.name,
      slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    }).returning();
    
    return branch;
  }

  static async listBranches(tenantId: string, userId: string, role: string) {
    if (role === 'owner' || role === 'admin') {
      return await db.select()
        .from(branches)
        .where(eq(branches.tenantId, tenantId));
    } else {
      // If member, only return branches they are explicitly assigned to
      const userBranches = await db.select({
        id: branches.id,
        tenantId: branches.tenantId,
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
        tenantMembers,
        eq(tenantMembers.id, branchMembers.tenantMemberId)
      )
      .where(
        and(
          eq(branches.tenantId, tenantId),
          eq(tenantMembers.userId, userId)
        )
      );
      
      return userBranches;
    }
  }
}
