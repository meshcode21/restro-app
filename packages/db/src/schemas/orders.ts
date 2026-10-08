import { pgTable, text, uuid, numeric, foreignKey, unique, check } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { timestamps } from './_helpers';
import { tableSessions } from './tableSessions';
import { tableSessionParticipants } from './tableSessionParticipants';
import { orderItems } from './orderItems';
import { orderStatusEnum } from './enums';

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull(),
  branchId: uuid('branch_id').notNull(),
  tableId: uuid('table_id').notNull(),
  tableSessionId: uuid('table_session_id').notNull(),
  participantId: uuid('participant_id'),
  orderNumber: text('order_number').notNull(), // text used for varchar
  status: orderStatusEnum('status').default('pending').notNull(),
  subtotal: numeric('subtotal', { precision: 12, scale: 2 }).default('0').notNull(),
  taxAmount: numeric('tax_amount', { precision: 12, scale: 2 }).default('0').notNull(),
  discountAmount: numeric('discount_amount', { precision: 12, scale: 2 }).default('0').notNull(),
  totalAmount: numeric('total_amount', { precision: 12, scale: 2 }).default('0').notNull(),
  ...timestamps,
}, (t) => ({
  fkOrdersTableSession: foreignKey({
    columns: [t.tableSessionId, t.tableId, t.branchId, t.organizationId],
    foreignColumns: [tableSessions.id, tableSessions.tableId, tableSessions.branchId, tableSessions.organizationId],
  }), // default is NO ACTION
  fkOrdersParticipant: foreignKey({
    columns: [t.participantId, t.tableSessionId],
    foreignColumns: [tableSessionParticipants.id, tableSessionParticipants.tableSessionId],
  }).onDelete('set null'),
  uqOrderNumberPerBranch: unique('uq_order_number_per_branch').on(t.branchId, t.orderNumber),
  uqOrdersIdOrg: unique('uq_orders_id_org').on(t.id, t.organizationId),
  chkOrderSubtotal: check('chk_order_subtotal', sql`${t.subtotal} >= 0`),
  chkOrderTax: check('chk_order_tax', sql`${t.taxAmount} >= 0`),
  chkOrderDiscount: check('chk_order_discount', sql`${t.discountAmount} >= 0`),
  chkOrderTotal: check('chk_order_total', sql`${t.totalAmount} >= 0`),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  tableSession: one(tableSessions, {
    fields: [orders.tableSessionId, orders.tableId, orders.branchId, orders.organizationId],
    references: [tableSessions.id, tableSessions.tableId, tableSessions.branchId, tableSessions.organizationId],
  }),
  participant: one(tableSessionParticipants, {
    fields: [orders.participantId, orders.tableSessionId],
    references: [tableSessionParticipants.id, tableSessionParticipants.tableSessionId],
  }),
  orderItems: many(orderItems),
}));
