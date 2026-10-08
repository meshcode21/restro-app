import { pgTable, text, uuid, foreignKey, unique, check } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { timestamps, timestamptz } from './_helpers';
import { tables } from './tables';
import { tableSessionParticipants } from './tableSessionParticipants';
import { orders } from './orders';
import { tableSessionStatusEnum } from './enums';

export const tableSessions = pgTable('table_sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull(),
  branchId: uuid('branch_id').notNull(),
  tableId: uuid('table_id').notNull(),
  accessCodeHash: text('access_code_hash').notNull(),
  startedAt: timestamptz('started_at').defaultNow().notNull(),
  expiresAt: timestamptz('expires_at').notNull(),
  closedAt: timestamptz('closed_at'),
  status: tableSessionStatusEnum('status').default('active').notNull(),
  ...timestamps,
}, (t) => ({
  fkTableSessionsTable: foreignKey({
    columns: [t.tableId, t.branchId, t.organizationId],
    foreignColumns: [tables.id, tables.branchId, tables.organizationId],
  }).onDelete('cascade'),
  uqTableSessionsScope: unique('uq_table_sessions_scope').on(t.id, t.tableId, t.branchId, t.organizationId),
  chkSessionExpiry: check('chk_session_expiry', sql`${t.expiresAt} > ${t.startedAt}`),
  chkSessionClosed: check('chk_session_closed', sql`(${t.status} = 'active' AND ${t.closedAt} IS NULL) OR (${t.status} = 'closed' AND ${t.closedAt} IS NOT NULL)`),
}));

export const tableSessionsRelations = relations(tableSessions, ({ one, many }) => ({
  table: one(tables, {
    fields: [tableSessions.tableId, tableSessions.branchId, tableSessions.organizationId],
    references: [tables.id, tables.branchId, tables.organizationId],
  }),
  participants: many(tableSessionParticipants),
  orders: many(orders),
}));
