import { pgTable, uuid, foreignKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './_helpers';
import { users } from './users';
import { platformMemberRoleEnum, platformMemberStatusEnum } from './enums';

export const platformMembers = pgTable('platform_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').unique().notNull(),
  role: platformMemberRoleEnum('role').default('admin').notNull(),
  status: platformMemberStatusEnum('status').default('active').notNull(),
  ...timestamps,
}, (t) => ({
  fkPlatformMembersUser: foreignKey({
    columns: [t.userId],
    foreignColumns: [users.id],
  }).onDelete('cascade'),
}));

export const platformMembersRelations = relations(platformMembers, ({ one }) => ({
  user: one(users, {
    fields: [platformMembers.userId],
    references: [users.id],
  }),
}));
