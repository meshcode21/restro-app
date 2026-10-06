import { timestamp } from 'drizzle-orm/pg-core';

export const timestamptz = (name: string) => timestamp(name, { withTimezone: true });
export const createdAt = () => timestamptz('created_at').defaultNow().notNull();
export const updatedAt = () => timestamptz('updated_at').defaultNow().notNull();

export const timestamps = {
  createdAt: createdAt(),
  updatedAt: updatedAt(),
};
