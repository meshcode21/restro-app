import { pgTable, text, uuid, integer, boolean, foreignKey, unique } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './_helpers';
import { tenants } from './tenants';
import { products } from './products';

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull(),
  name: text('name').notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  active: boolean('active').default(true).notNull(),
  ...timestamps,
}, (t) => ({
  fkCategoriesTenant: foreignKey({
    columns: [t.tenantId],
    foreignColumns: [tenants.id],
  }).onDelete('cascade'),
  uqCategoryNamePerTenant: unique('uq_category_name_per_tenant').on(t.tenantId, t.name),
  uqCategoriesIdOrg: unique('uq_categories_id_org').on(t.id, t.tenantId),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  tenant: one(tenants, {
    fields: [categories.tenantId],
    references: [tenants.id],
  }),
  products: many(products),
}));
