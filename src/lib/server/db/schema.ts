import { pgTable, serial, integer, text, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	email: text('email').notNull().unique(),
	firstname: text('name').notNull(),
	lastname: text('lastname'),
	role: text('role').notNull().default('user'),
	passwordHash: text('password_hash').notNull()
});

export const unverified = pgTable('unverified', {
	id: text('id').primaryKey(),
	email: text('email').notNull().unique(),
	firstname: text('name').notNull(),
	lastname: text('lastname'),
	passwordHash: text('password_hash').notNull(),
	verificationToken: text('verification_token').notNull().unique(),
	verificationExpiresAt: timestamp('verification_expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type Unverified = typeof unverified.$inferSelect;
