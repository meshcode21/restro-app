import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './_helpers';
import { organizations } from './organizations';
import { subscriptionStatusEnum, subscriptionPlanEnum } from './enums';

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').unique().notNull(),
  plan: subscriptionPlanEnum('plan').default('starter').notNull(),
  status: subscriptionStatusEnum('status').default('trialing').notNull(),
  startsAt: timestamp('starts_at', { withTimezone: true }),
  endsAt: timestamp('ends_at', { withTimezone: true }),
  activatedBy: uuid('activated_by'), // Could reference a platform_member or user id
  ...timestamps,
});

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  organization: one(organizations, {
    fields: [subscriptions.organizationId],
    references: [organizations.id],
  }),
}));
