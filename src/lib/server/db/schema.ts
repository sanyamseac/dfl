import { pgTable, serial, integer, text, timestamp, date } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	email: text('email').notNull().unique(),
	firstname: text('name').notNull(),
	lastname: text('lastname'),
	role: text('role').notNull().default('user'),
	passwordHash: text('password_hash').notNull(),
})

export const userDetails = pgTable('user_details', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	phone: text('phone').notNull(),
	permanentAddress: text('permanent_address').notNull(),
	permanentDigipin: text('permanent_digipin'),
	currentDigipin: text('current_digipin'),
	currentAddress: text('current_address').notNull(),
	dateOfBirth: date('date_of_birth').notNull(),
	gender: text('gender').notNull(),
})

export const unverified = pgTable('unverified', {
	id: text('id').primaryKey(),
	email: text('email').notNull().unique(),
	firstname: text('name').notNull(),
	lastname: text('lastname'),
	passwordHash: text('password_hash').notNull(),
	verificationToken: text('verification_token').notNull().unique(),
	verificationExpiresAt: timestamp('verification_expires_at', {
		withTimezone: true,
		mode: 'date',
	}).notNull(),
})

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull(),
})

export const application = pgTable('application', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	status: text('status').notNull().default('pending'),
	submittedAt: timestamp('submitted_at', { withTimezone: true, mode: 'date' })
		.notNull()
		.defaultNow(),
	applicationName: text('application_name').notNull(),
	applicationTable: text('application_table').notNull(),
})

export type Session = typeof session.$inferSelect
export type User = typeof user.$inferSelect
export type Unverified = typeof unverified.$inferSelect
export type Application = typeof application.$inferSelect
