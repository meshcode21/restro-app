import { pgTable, uuid, foreignKey, unique } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './_helpers';
import { organizationMembers } from './organizationMembers';
import { branches } from './branches';
import { branchMemberRoleEnum } from './enums';

export const branchMembers = pgTable('branch_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull(),
  organizationMemberId: uuid('organization_member_id').notNull(),
  branchId: uuid('branch_id').notNull(),
  role: branchMemberRoleEnum('role').notNull(),
  createdAt: timestamps.createdAt,
}, (t) => ({
  fkBranchMembersOrganizationMember: foreignKey({
    columns: [t.organizationMemberId, t.organizationId],
    foreignColumns: [organizationMembers.id, organizationMembers.organizationId],
  }).onDelete('cascade'),
  fkBranchMembersBranch: foreignKey({
    columns: [t.branchId, t.organizationId],
    foreignColumns: [branches.id, branches.organizationId],
  }).onDelete('cascade'),
  uqBranchMember: unique('uq_branch_member').on(t.organizationMemberId, t.branchId),
}));

export const branchMembersRelations = relations(branchMembers, ({ one }) => ({
  organizationMember: one(organizationMembers, {
    fields: [branchMembers.organizationMemberId, branchMembers.organizationId],
    references: [organizationMembers.id, organizationMembers.organizationId],
  }),
  branch: one(branches, {
    fields: [branchMembers.branchId, branchMembers.organizationId],
    references: [branches.id, branches.organizationId],
  }),
}));
