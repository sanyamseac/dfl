import { hash, verify } from '@node-rs/argon2'
import { encodeBase32LowerCase } from '@oslojs/encoding'
import { fail, redirect } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'
import * as auth from '$lib/server/auth'
import { db } from '$lib/server/db'
import * as table from '$lib/server/db/schema'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
	let destination = event.url.searchParams.get('redirect') ?? '/dashboard'
	if (event.locals.user) return redirect(302, destination)
	return {}
}

export const actions: Actions = {
	login: async (event) => {
		const formData = await event.request.formData()
		const email = (formData.get('email') as string) || null
		const password = (formData.get('password') as string) || null

		if (!email) return fail(400, { message: 'Please provide an email address' })
		if (!password) return fail(400, { message: 'Please provide a password' })

		const results = await db.select().from(table.user).where(eq(table.user.email, email))

		if (results.length === 0) {
			const unverified = await db
				.select()
				.from(table.unverified)
				.where(eq(table.unverified.email, email))
				.limit(1)

			if (unverified.length !== 0) {
				const validPassword = await verify(unverified[0].passwordHash, password, {
					memoryCost: 19456,
					timeCost: 2,
					outputLen: 32,
					parallelism: 1,
				})
				if (!validPassword) return fail(400, { message: 'Incorrect username or password' })
				return fail(400, { message: 'Please verify your email to proceed.' })
			} else return fail(400, { message: 'Incorrect username or password.' })
		}

		const existingUser = results.at(0)
		if (!existingUser) return fail(400, { message: 'Incorrect username or password.' })

		const validPassword = await verify(existingUser.passwordHash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		})
		if (!validPassword) return fail(400, { message: 'Incorrect username or password' })

		const sessionToken = auth.generateSessionToken()
		const session = await auth.createSession(sessionToken, existingUser.id)
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt)

		let destination = event.url.searchParams.get('redirect') ?? '/dashboard'
		return redirect(302, destination)
	},

	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401, { message: 'You are not logged in.' })
		}
		await auth.invalidateSession(event.locals.session.id)
		auth.deleteSessionTokenCookie(event)
		return redirect(302, '/login')
	},
}
