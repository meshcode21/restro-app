import { pgTable, uuid, foreignKey, unique } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './_helpers';
import { users } from './users';
import { organizations } from './organizations';
import { branchMembers } from './branchMembers';
import { organizationMemberRoleEnum, organizationMemberStatusEnum } from './enums';

export const organizationMembers = pgTable('organization_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull(),
  userId: uuid('user_id').notNull(),
  role: organizationMemberRoleEnum('role').default('member').notNull(),
  status: organizationMemberStatusEnum('status').default('active').notNull(),
  ...timestamps,
}, (t) => ({
  fkOrganization: foreignKey({
    columns: [t.organizationId],
    foreignColumns: [organizations.id],
  }).onDelete('cascade'),
  fkUser: foreignKey({
    columns: [t.userId],
    foreignColumns: [users.id],
  }).onDelete('cascade'),
  uqOrganizationMember: unique('uq_organization_member').on(t.organizationId, t.userId),
  uqOrganizationMembersIdOrg: unique('uq_organization_members_id_org').on(t.id, t.organizationId),
}));

export const organizationMembersRelations = relations(organizationMembers, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [organizationMembers.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [organizationMembers.userId],
    references: [users.id],
  }),
  branchMembers: many(branchMembers),
}));
