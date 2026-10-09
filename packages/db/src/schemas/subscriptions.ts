import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './_helpers';
import { tenants } from './tenants';
import { subscriptionStatusEnum, subscriptionPlanEnum } from './enums';

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').unique().notNull(),
  plan: subscriptionPlanEnum('plan').default('starter').notNull(),
  status: subscriptionStatusEnum('status').default('trialing').notNull(),
  startsAt: timestamp('starts_at', { withTimezone: true }),
  endsAt: timestamp('ends_at', { withTimezone: true }),
  activatedBy: uuid('activated_by'), // Could reference a platform_member or user id
  ...timestamps,
});

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  tenant: one(tenants, {
    fields: [subscriptions.tenantId],
    references: [tenants.id],
  }),
}));
