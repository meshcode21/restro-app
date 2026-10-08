import { pgTable, uuid, numeric, boolean, foreignKey, unique, check } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { timestamps } from './_helpers';
import { branches } from './branches';
import { products } from './products';

export const branchProducts = pgTable('branch_products', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull(),
  branchId: uuid('branch_id').notNull(),
  productId: uuid('product_id').notNull(),
  price: numeric('price', { precision: 12, scale: 2 }).notNull(),
  available: boolean('available').default(true).notNull(),
  ...timestamps,
}, (t) => ({
  fkBranchProductsBranch: foreignKey({
    columns: [t.branchId, t.organizationId],
    foreignColumns: [branches.id, branches.organizationId],
  }).onDelete('cascade'),
  fkBranchProductsProduct: foreignKey({
    columns: [t.productId, t.organizationId],
    foreignColumns: [products.id, products.organizationId],
  }).onDelete('cascade'),
  uqProductPerBranch: unique('uq_product_per_branch').on(t.branchId, t.productId),
  chkProductPrice: check('chk_product_price', sql`${t.price} >= 0`),
}));

export const branchProductsRelations = relations(branchProducts, ({ one }) => ({
  branch: one(branches, {
    fields: [branchProducts.branchId, branchProducts.organizationId],
    references: [branches.id, branches.organizationId],
  }),
  product: one(products, {
    fields: [branchProducts.productId, branchProducts.organizationId],
    references: [products.id, products.organizationId],
  }),
}));
