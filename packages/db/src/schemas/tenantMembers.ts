import { pgTable, uuid, foreignKey, unique } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './_helpers';
import { users } from './users';
import { tenants } from './tenants';
import { branchMembers } from './branchMembers';
import { tenantMemberRoleEnum, tenantMemberStatusEnum } from './enums';

export const tenantMembers = pgTable('tenant_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull(),
  userId: uuid('user_id').notNull(),
  role: tenantMemberRoleEnum('role').notNull(),
  status: tenantMemberStatusEnum('status').default('active').notNull(),
  ...timestamps,
}, (t) => ({
  fkTenant: foreignKey({
    columns: [t.tenantId],
    foreignColumns: [tenants.id],
  }).onDelete('cascade'),
  fkUser: foreignKey({
    columns: [t.userId],
    foreignColumns: [users.id],
  }).onDelete('cascade'),
  uqTenantMember: unique('uq_tenant_member').on(t.tenantId, t.userId),
  uqTenantMembersIdOrg: unique('uq_tenant_members_id_org').on(t.id, t.tenantId),
}));

export const tenantMembersRelations = relations(tenantMembers, ({ one, many }) => ({
  tenant: one(tenants, {
    fields: [tenantMembers.tenantId],
    references: [tenants.id],
  }),
  user: one(users, {
    fields: [tenantMembers.userId],
    references: [users.id],
  }),
  branchMembers: many(branchMembers),
}));
