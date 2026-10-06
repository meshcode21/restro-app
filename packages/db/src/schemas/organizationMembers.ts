import { pgTable, uuid, pgEnum, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './_helpers';
import { users } from './users';
import { organizations } from './organizations';
import { branches } from './branches';

export const memberRoleEnum = pgEnum('member_role', ['SUPER_ADMIN', 'ORG_ADMIN', 'MANAGER', 'KITCHEN', 'WAITER']);

export const organizationMembers = pgTable('organization_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }),
  branchId: uuid('branch_id').references(() => branches.id, { onDelete: 'cascade' }),
  role: memberRoleEnum('role').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  ...timestamps,
});

export const organizationMembersRelations = relations(organizationMembers, ({ one }) => ({
  user: one(users, {
    fields: [organizationMembers.userId],
    references: [users.id],
  }),
  organization: one(organizations, {
    fields: [organizationMembers.organizationId],
    references: [organizations.id],
  }),
  branch: one(branches, {
    fields: [organizationMembers.branchId],
    references: [branches.id],
  }),
}));
