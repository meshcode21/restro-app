import { pgTable, text, uuid, boolean, foreignKey, unique } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './_helpers';
import { organizations } from './organizations';
import { categories } from './categories';
import { branchProducts } from './branchProducts';
import { orderItems } from './orderItems';

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull(),
  categoryId: uuid('category_id'),
  name: text('name').notNull(),
  description: text('description'),
  imageUrl: text('image_url'),
  active: boolean('active').default(true).notNull(),
  ...timestamps,
}, (t) => ({
  fkProductsOrganization: foreignKey({
    columns: [t.organizationId],
    foreignColumns: [organizations.id],
  }).onDelete('cascade'),
  fkProductsCategory: foreignKey({
    columns: [t.categoryId, t.organizationId],
    foreignColumns: [categories.id, categories.organizationId],
  }).onDelete('set null'), // Postgres 15 ON DELETE SET NULL (column_list) mapped here via drizzle's set null which acts similarly
  uqProductsIdOrg: unique('uq_products_id_org').on(t.id, t.organizationId),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [products.organizationId],
    references: [organizations.id],
  }),
  category: one(categories, {
    fields: [products.categoryId, products.organizationId],
    references: [categories.id, categories.organizationId],
  }),
  branchProducts: many(branchProducts),
  orderItems: many(orderItems),
}));
