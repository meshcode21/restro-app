import { pgTable, text, uuid, integer, boolean, foreignKey, unique } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './_helpers';
import { organizations } from './organizations';
import { products } from './products';

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull(),
  name: text('name').notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  active: boolean('active').default(true).notNull(),
  ...timestamps,
}, (t) => ({
  fkCategoriesOrganization: foreignKey({
    columns: [t.organizationId],
    foreignColumns: [organizations.id],
  }).onDelete('cascade'),
  uqCategoryNamePerOrganization: unique('uq_category_name_per_organization').on(t.organizationId, t.name),
  uqCategoriesIdOrg: unique('uq_categories_id_org').on(t.id, t.organizationId),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [categories.organizationId],
    references: [organizations.id],
  }),
  products: many(products),
}));
