import { fail, redirect, error } from '@sveltejs/kit'
import { db } from '$lib/server/db'
import * as table from '$lib/server/db/schema'
import type { Actions, PageServerLoad } from './$types'
import { generateId, logError } from '$lib/helper'
import { eq, and } from 'drizzle-orm'
import * as auth from '$lib/server/auth'

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) return redirect(302, '/dashboard')
	const userId = event.url.searchParams.get('userId') as string
	const verificationToken = event.url.searchParams.get('token') as string
	let verifiedUser: table.User | null = null

	try {
		const user = await db
			.select()
			.from(table.unverified)
			.where(
				and(
					eq(table.unverified.id, userId),
					eq(table.unverified.verificationToken, verificationToken),
				),
			)
			.limit(1)

		if (user.length === 0) {
			throw error(400, 'Invalid verification token or user ID')
		}

		verifiedUser = {
			id: user[0].id,
			email: user[0].email,
			firstname: user[0].firstname,
			lastname: user[0].lastname,
			passwordHash: user[0].passwordHash,
			role: 'user',
		}

		await db.insert(table.user).values(verifiedUser)
		await db.delete(table.unverified).where(eq(table.unverified.id, userId))

		const sessionToken = auth.generateSessionToken()
		const session = await auth.createSession(sessionToken, verifiedUser.id)
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt)
	} catch (err: any) {
		if (err.status) throw err
		const id = generateId(10)
		console.error(`Error ID: ${id}`, err)
		throw error(
			500,
			`An error has occurred. The error is logged with ID: ${id}. Please contact support with this ID.`,
		)
	}

	return { user: verifiedUser }
}
