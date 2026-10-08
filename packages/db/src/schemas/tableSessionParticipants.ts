import { pgTable, text, uuid, foreignKey, unique } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamptz } from './_helpers';
import { tableSessions } from './tableSessions';
import { orders } from './orders';

export const tableSessionParticipants = pgTable('table_session_participants', {
  id: uuid('id').defaultRandom().primaryKey(),
  tableSessionId: uuid('table_session_id').notNull(),
  deviceId: text('device_id').notNull(), // Using text since VARCHAR(255) is often just text in pg
  customerName: text('customer_name'),
  phone: text('phone'),
  joinedAt: timestamptz('joined_at').defaultNow().notNull(),
  lastSeenAt: timestamptz('last_seen_at').defaultNow().notNull(),
}, (t) => ({
  fkSessionParticipantsSession: foreignKey({
    columns: [t.tableSessionId],
    foreignColumns: [tableSessions.id],
  }).onDelete('cascade'),
  uqParticipantDevicePerSession: unique('uq_participant_device_per_session').on(t.tableSessionId, t.deviceId),
  uqParticipantsIdSession: unique('uq_participants_id_session').on(t.id, t.tableSessionId),
}));

export const tableSessionParticipantsRelations = relations(tableSessionParticipants, ({ one, many }) => ({
  session: one(tableSessions, {
    fields: [tableSessionParticipants.tableSessionId],
    references: [tableSessions.id],
  }),
  orders: many(orders),
}));
