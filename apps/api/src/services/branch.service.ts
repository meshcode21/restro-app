import { db, branches } from '@workspace/db';
import { CreateBranchInput } from '@workspace/validation';
import { eq } from 'drizzle-orm';

export class BranchService {
  static async createBranch(organizationId: string, data: CreateBranchInput) {
    const [branch] = await db.insert(branches).values({
      organizationId,
      name: data.name,
    }).returning();
    
    return branch;
  }

  static async listBranches(organizationId: string) {
    // CODING_STANDARDS: Tenant-scoped data access. NEVER bypass this filter.
    return await db.select()
      .from(branches)
      .where(eq(branches.organizationId, organizationId));
  }
}
