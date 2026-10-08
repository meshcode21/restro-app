import { pgTable, text, uuid, numeric, integer, foreignKey, check } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { timestamps } from './_helpers';
import { orders } from './orders';
import { products } from './products';

export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull(),
  orderId: uuid('order_id').notNull(),
  productId: uuid('product_id'),
  productName: text('product_name').notNull(),
  unitPrice: numeric('unit_price', { precision: 12, scale: 2 }).notNull(),
  quantity: integer('quantity').notNull(),
  subtotal: numeric('subtotal', { precision: 12, scale: 2 }).notNull(),
  notes: text('notes'),
  createdAt: timestamps.createdAt,
}, (t) => ({
  fkOrderItemsOrder: foreignKey({
    columns: [t.orderId, t.organizationId],
    foreignColumns: [orders.id, orders.organizationId],
  }).onDelete('cascade'),
  fkOrderItemsProduct: foreignKey({
    columns: [t.productId, t.organizationId],
    foreignColumns: [products.id, products.organizationId],
  }).onDelete('set null'),
  chkOrderItemPrice: check('chk_order_item_price', sql`${t.unitPrice} >= 0`),
  chkOrderItemQuantity: check('chk_order_item_quantity', sql`${t.quantity} > 0`),
  chkOrderItemSubtotal: check('chk_order_item_subtotal', sql`${t.subtotal} >= 0`),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId, orderItems.organizationId],
    references: [orders.id, orders.organizationId],
  }),
  product: one(products, {
    fields: [orderItems.productId, orderItems.organizationId],
    references: [products.id, products.organizationId],
  }),
}));
