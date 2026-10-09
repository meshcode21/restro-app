import { pgTable, text, uuid, foreignKey, unique } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './_helpers';
import { tenants } from './tenants';
import { branchMembers } from './branchMembers';
import { tables } from './tables';
import { branchProducts } from './branchProducts';
import { branchStatusEnum } from './enums';

export const branches = pgTable('branches', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  address: text('address'),
  city: text('city'),
  phone: text('phone'),
  status: branchStatusEnum('status').default('active').notNull(),
  ...timestamps,
}, (t) => ({
  fkTenant: foreignKey({
    columns: [t.tenantId],
    foreignColumns: [tenants.id],
  }).onDelete('cascade'),
  uqBranchSlugPerTenant: unique('uq_branch_slug_per_tenant').on(t.tenantId, t.slug),
  uqBranchesIdOrg: unique('uq_branches_id_org').on(t.id, t.tenantId),
}));

export const branchesRelations = relations(branches, ({ one, many }) => ({
  tenant: one(tenants, {
    fields: [branches.tenantId],
    references: [tenants.id],
  }),
  members: many(branchMembers),
  tables: many(tables),
  branchProducts: many(branchProducts),
}));
