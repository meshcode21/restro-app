import { pgTable, text, uuid, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './_helpers';
import { tenantMembers } from './tenantMembers';
import { platformMembers } from './platformMembers';
import { userStatusEnum } from './enums';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  phone: text('phone'),
  passwordHash: text('password_hash'),
  avatarUrl: text('avatar_url'),
  emailVerified: boolean('email_verified').default(false).notNull(),
  phoneVerified: boolean('phone_verified').default(false).notNull(),
  status: userStatusEnum('status').default('active').notNull(),
  ...timestamps,
});

export const usersRelations = relations(users, ({ one, many }) => ({
  memberships: many(tenantMembers),
  platformMember: one(platformMembers),
}));
