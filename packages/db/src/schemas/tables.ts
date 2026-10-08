import { pgTable, text, uuid, integer, foreignKey, unique, check } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { timestamps } from './_helpers';
import { branches } from './branches';
import { tableSessions } from './tableSessions';
import { tableStatusEnum } from './enums';

export const tables = pgTable('tables', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull(),
  branchId: uuid('branch_id').notNull(),
  name: text('name').notNull(),
  qrToken: text('qr_token').unique().notNull(),
  capacity: integer('capacity').default(4).notNull(),
  status: tableStatusEnum('status').default('available').notNull(),
  ...timestamps,
}, (t) => ({
  fkTablesBranch: foreignKey({
    columns: [t.branchId, t.organizationId],
    foreignColumns: [branches.id, branches.organizationId],
  }).onDelete('cascade'),
  uqTableNamePerBranch: unique('uq_table_name_per_branch').on(t.branchId, t.name),
  uqTablesIdBranchOrg: unique('uq_tables_id_branch_org').on(t.id, t.branchId, t.organizationId),
  chkTableCapacity: check('chk_table_capacity', sql`${t.capacity} > 0`),
}));

export const tablesRelations = relations(tables, ({ one, many }) => ({
  branch: one(branches, {
    fields: [tables.branchId, tables.organizationId],
    references: [branches.id, branches.organizationId],
  }),
  tableSessions: many(tableSessions),
}));
