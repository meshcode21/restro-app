import { pgTable, uuid, foreignKey, unique } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './_helpers';
import { tenantMembers } from './tenantMembers';
import { branches } from './branches';
import { branchMemberRoleEnum } from './enums';

export const branchMembers = pgTable('branch_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull(),
  tenantMemberId: uuid('tenant_member_id').notNull(),
  branchId: uuid('branch_id').notNull(),
  role: branchMemberRoleEnum('role').notNull(),
  createdAt: timestamps.createdAt,
}, (t) => ({
  fkBranchMembersTenantMember: foreignKey({
    columns: [t.tenantMemberId, t.tenantId],
    foreignColumns: [tenantMembers.id, tenantMembers.tenantId],
  }).onDelete('cascade'),
  fkBranchMembersBranch: foreignKey({
    columns: [t.branchId, t.tenantId],
    foreignColumns: [branches.id, branches.tenantId],
  }).onDelete('cascade'),
  uqBranchMember: unique('uq_branch_member').on(t.tenantMemberId, t.branchId),
}));

export const branchMembersRelations = relations(branchMembers, ({ one }) => ({
  tenantMember: one(tenantMembers, {
    fields: [branchMembers.tenantMemberId, branchMembers.tenantId],
    references: [tenantMembers.id, tenantMembers.tenantId],
  }),
  branch: one(branches, {
    fields: [branchMembers.branchId, branchMembers.tenantId],
    references: [branches.id, branches.tenantId],
  }),
}));
