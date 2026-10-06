import { pgTable, text, uuid, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './_helpers';
import { branches } from './branches';
import { organizationMembers } from './organizationMembers';

export const subscriptionStatusEnum = pgEnum('subscription_status', ['ACTIVE', 'INACTIVE', 'PAST_DUE']);

export const organizations = pgTable('organizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  subscriptionStatus: subscriptionStatusEnum('subscription_status').default('INACTIVE').notNull(),
  ...timestamps,
});

export const organizationsRelations = relations(organizations, ({ many }) => ({
  branches: many(branches),
  members: many(organizationMembers),
}));
