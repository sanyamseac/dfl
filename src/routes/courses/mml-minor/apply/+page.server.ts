import type { Actions, PageServerLoad } from './$types'
import * as auth from '$lib/server/auth'
import { db } from '$lib/server/db'
import * as table from '$lib/server/db/schema'
import { eq, and } from 'drizzle-orm'
import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async (event) => {
	const user = auth.requireLogin(event)
	const userDetails = await db
		.select()
		.from(table.userDetails)
		.where(eq(table.userDetails.userId, user.id))
		.limit(1)

	if (userDetails.length === 0) return redirect(303, '/dashboard/profile')

	const application = await db
		.select()
		.from(table.application)
		.where(
			and(
				eq(table.application.userId, user.id),
				eq(table.application.courseTable, 'mml-minor'),
			),
		)
		.limit(1)

	return { user: event.locals.user, application: application[0] || null }
}
