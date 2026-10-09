import { pgTable, text, uuid, boolean, foreignKey, unique } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './_helpers';
import { tenants } from './tenants';
import { categories } from './categories';
import { branchProducts } from './branchProducts';
import { orderItems } from './orderItems';

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull(),
  categoryId: uuid('category_id'),
  name: text('name').notNull(),
  description: text('description'),
  imageUrl: text('image_url'),
  active: boolean('active').default(true).notNull(),
  ...timestamps,
}, (t) => ({
  fkProductsTenant: foreignKey({
    columns: [t.tenantId],
    foreignColumns: [tenants.id],
  }).onDelete('cascade'),
  fkProductsCategory: foreignKey({
    columns: [t.categoryId, t.tenantId],
    foreignColumns: [categories.id, categories.tenantId],
  }).onDelete('set null'), // Postgres 15 ON DELETE SET NULL (column_list) mapped here via drizzle's set null which acts similarly
  uqProductsIdOrg: unique('uq_products_id_org').on(t.id, t.tenantId),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  tenant: one(tenants, {
    fields: [products.tenantId],
    references: [tenants.id],
  }),
  category: one(categories, {
    fields: [products.categoryId, products.tenantId],
    references: [categories.id, categories.tenantId],
  }),
  branchProducts: many(branchProducts),
  orderItems: many(orderItems),
}));
