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
		.unique()
		.references(() => user.id),
	phone: text('phone').notNull(),
	idType: text('id_type').notNull(),
	idNumber: text('id_number').notNull(),
	dateOfBirth: date('date_of_birth').notNull(),
	gender: text('gender').notNull(),
	imageUrl: text('image_url').notNull(),
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
	courseName: text('course_name').notNull(),
	courseTable: text('course_table').notNull(),
	paymentReference: text('payment_reference'),
	paymentReceiptUrl: text('payment_receipt_url'),
})

export const mmlMinor = pgTable('mmlMinor', {
	id: serial('id').primaryKey(),
	applicationId: text('application_id')
		.notNull()
		.references(() => application.id),
	institution: text('institution').notNull(),
	major: text('major').notNull(),
	discipline: text('discipline').notNull(),
	semester: integer('semester').notNull(),
	idNumber: text('id_number').notNull(),
	idUrl: text('id_url').notNull(),
	cgpa: text('cgpa').notNull(),
	cgpaDocumentUrl: text('cgpa_document_url').notNull(),
	expectedGradutionYear: integer('expected_gradution_year').notNull(),
	SignatureUrl: text('signature_url').notNull(),
})

export const files = pgTable('files', {
	id: serial('id').primaryKey(),
	filePath: text('file_path').notNull(),
	ownerId: text('owner_id')
		.notNull()
		.references(() => user.id),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
		.notNull()
		.defaultNow(),
})

export type Session = typeof session.$inferSelect
export type User = typeof user.$inferSelect
export type Unverified = typeof unverified.$inferSelect
export type Application = typeof application.$inferSelect
export type UserDetails = typeof userDetails.$inferSelect
export type MmlMinor = typeof mmlMinor.$inferSelect
