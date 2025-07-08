import * as auth from '$lib/server/auth'
import { db } from '$lib/server/db'
import type { Actions, PageServerLoad } from './$types'
import * as table from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'
import { redirect, fail } from '@sveltejs/kit'
import { date } from 'drizzle-orm/mysql-core'
import { generateId, logError } from '$lib/helper'

export const load: PageServerLoad = async (event) => {
	const user = auth.requireLogin(event)
	const userDetails = await db
		.select()
		.from(table.userDetails)
		.where(eq(table.userDetails.userId, user.id))
		.limit(1)

	return { user, userDetails: userDetails[0] || null }
}

export const actions: Actions = {
	addDetails: async (event) => {
		const user = auth.requireLogin(event)
		const formData = await event.request.formData()
		const phone = formData.get('phone') as string
		const permanentAddress = formData.get('permanentAddress') as string
		const currentAddress = formData.get('currentAddress') as string
		const dateOfBirth = formData.get('dateOfBirth') as string
		const gender = formData.get('gender') as string
		const digipin = formData.get('digipin') as string
		const currentDigipin = formData.get('currentDigipin') as string

		let phoneregex = /^\+?[1-9]\d{0,2}\s?\d{6,14}$/
		if (!phone || phoneregex.test(phone) === false)
			return fail(400, { message: 'Invalid phone number format' })
		if (!permanentAddress || permanentAddress.length < 5)
			return fail(400, { message: 'Permanent address is too short' })
		if (!currentAddress || currentAddress.length < 5)
			return fail(400, { message: 'Current address is too short' })
		if (!dateOfBirth || isNaN(Date.parse(dateOfBirth)))
			return fail(400, { message: 'Invalid date of birth format' })
		if (!gender || !['Male', 'Female', 'Other'].includes(gender))
			return fail(400, { message: 'Invalid gender format' })
		if (digipin && !/^\w{3}-\w{3}-\w{4}$/.test(digipin))
			return fail(400, { message: 'Invalid DigiPin format' })
		if (currentDigipin && !/^\w{3}-\w{3}-\w{4}$/.test(currentDigipin))
			return fail(400, { message: 'Invalid current DigiPin format' })

		try {
			await db.insert(table.userDetails).values({
				id: generateId(),
				userId: user.id,
				phone,
				permanentAddress,
				currentAddress,
				dateOfBirth: dateOfBirth,
				gender,
				permanantDigipin: digipin ? digipin : null,
				currentDigipin: currentDigipin ? currentDigipin : null,
			})
		} catch (err) {
			logError(err as Error)
		}
	},
}
