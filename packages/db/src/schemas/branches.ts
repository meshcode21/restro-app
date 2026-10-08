import { pgTable, text, uuid, foreignKey, unique } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './_helpers';
import { organizations } from './organizations';
import { branchMembers } from './branchMembers';
import { tables } from './tables';
import { branchProducts } from './branchProducts';
import { branchStatusEnum } from './enums';

export const branches = pgTable('branches', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  address: text('address'),
  city: text('city'),
  phone: text('phone'),
  status: branchStatusEnum('status').default('active').notNull(),
  ...timestamps,
}, (t) => ({
  fkOrganization: foreignKey({
    columns: [t.organizationId],
    foreignColumns: [organizations.id],
  }).onDelete('cascade'),
  uqBranchSlugPerOrganization: unique('uq_branch_slug_per_organization').on(t.organizationId, t.slug),
  uqBranchesIdOrg: unique('uq_branches_id_org').on(t.id, t.organizationId),
}));

export const branchesRelations = relations(branches, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [branches.organizationId],
    references: [organizations.id],
  }),
  members: many(branchMembers),
  tables: many(tables),
  branchProducts: many(branchProducts),
}));
