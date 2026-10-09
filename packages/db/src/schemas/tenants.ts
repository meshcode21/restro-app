import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './_helpers';
import { branches } from './branches';
import { tenantMembers } from './tenantMembers';
import { categories } from './categories';
import { products } from './products';
import { tenantStatusEnum } from './enums';

export const tenants = pgTable('tenants', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  logoUrl: text('logo_url'),
  phone: text('phone'),
  email: text('email'),
  status: tenantStatusEnum('status').default('trial').notNull(),
  ...timestamps,
});

export const tenantsRelations = relations(tenants, ({ many }) => ({
  members: many(tenantMembers),
  branches: many(branches),
  categories: many(categories),
  products: many(products),
}));
