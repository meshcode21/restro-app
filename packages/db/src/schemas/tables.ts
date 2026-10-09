import { pgTable, text, uuid, integer, foreignKey, unique, check } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { timestamps } from './_helpers';
import { branches } from './branches';
import { tableSessions } from './tableSessions';
import { tableStatusEnum } from './enums';

export const tables = pgTable('tables', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull(),
  branchId: uuid('branch_id').notNull(),
  name: text('name').notNull(),
  qrToken: text('qr_token').unique().notNull(),
  capacity: integer('capacity').default(4).notNull(),
  status: tableStatusEnum('status').default('available').notNull(),
  ...timestamps,
}, (t) => ({
  fkTablesBranch: foreignKey({
    columns: [t.branchId, t.tenantId],
    foreignColumns: [branches.id, branches.tenantId],
  }).onDelete('cascade'),
  uqTableNamePerBranch: unique('uq_table_name_per_branch').on(t.branchId, t.name),
  uqTablesIdBranchOrg: unique('uq_tables_id_branch_org').on(t.id, t.branchId, t.tenantId),
  chkTableCapacity: check('chk_table_capacity', sql`${t.capacity} > 0`),
}));

export const tablesRelations = relations(tables, ({ one, many }) => ({
  branch: one(branches, {
    fields: [tables.branchId, tables.tenantId],
    references: [branches.id, branches.tenantId],
  }),
  tableSessions: many(tableSessions),
}));
