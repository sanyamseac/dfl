import * as table from '$lib/server/db/schema'
import { db } from '$lib/server/db'
import { generateId, logError } from '$lib/helper'
import { fail } from '@sveltejs/kit'
import { eq, and } from 'drizzle-orm'

export async function sendVerifyEmail(email: string) {
	try {
		const user = await db
			.select()
			.from(table.unverified)
			.where(eq(table.unverified.email, email))
			.limit(1)

		if (user.length === 0) return {}

		return { message: `/verify?userId=${user[0].id}&token=${user[0].verificationToken}` }
	} catch (err) {
		logError(err as Error)
	}
}
