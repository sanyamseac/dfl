import * as auth from '$lib/server/auth'
import { db } from '$lib/server/db'
import type { Actions, PageServerLoad } from './$types'
import * as table from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'
import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async (event) => {
	const user = auth.requireLogin(event)
	const userDetails = await db
		.select()
		.from(table.userDetails)
		.where(eq(table.userDetails.userId, user.id))
		.limit(1)

	if (userDetails.length === 0) return redirect(303, '/dashboard/profile')

	const applications = await db
		.select()
		.from(table.application)
		.where(eq(table.application.userId, user.id))

	return { user, applications }
}
