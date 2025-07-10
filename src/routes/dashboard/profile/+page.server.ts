import * as auth from '$lib/server/auth'
import { db } from '$lib/server/db'
import type { Actions, PageServerLoad } from './$types'
import * as table from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'
import { redirect, fail } from '@sveltejs/kit'
import { generateId, logError } from '$lib/helper'
import fs from 'fs/promises'
import path from 'path'

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
		const phone = (formData.get('phone') as string) || null
		const dateOfBirth = (formData.get('dateOfBirth') as string) || null
		const gender = (formData.get('gender') as string) || null
		const profileImage = (formData.get('image') as File) || null
		const idNumber = (formData.get('idNumber') as string) || null
		const idType = (formData.get('idType') as string) || null
		const idFile = (formData.get('idDocument') as File) || null

		let phoneregex = /^\+?[1-9]\d{0,2}\s?\d{6,14}$/
		if (!phone || phoneregex.test(phone) === false)
			return fail(400, { message: 'Invalid phone number format' })
		if (!dateOfBirth || isNaN(Date.parse(dateOfBirth)))
			return fail(400, { message: 'Invalid date of birth format' })
		if (!gender || !['Male', 'Female', 'Other'].includes(gender))
			return fail(400, { message: 'Invalid gender format' })
		if (!profileImage || !(profileImage instanceof File))
			return fail(400, { message: 'Profile image is required' })
		if (profileImage.size > 5 * 1024 * 1024 || profileImage.size < 1 * 1024)
			return fail(400, { message: 'Profile image size exceeds 5MB or is less than 1 KB' })
		if (!idNumber || !idType) return fail(400, { message: 'ID is required' })
		if (
			!idFile ||
			!(idFile instanceof File) ||
			path.extname(idFile.name).toLowerCase() !== '.pdf'
		)
			return fail(400, { message: 'ID file must be a PDF' })

		const extension = path.extname(profileImage.name).toLowerCase()
		const imagePath = path.join('userPictures', `${user.id}${extension}`)
		const idFilePath = path.join('userIdFiles', `${user.id}.pdf`)
		try {
			await fs.mkdir(path.dirname(imagePath), { recursive: true })
			await fs.mkdir(path.dirname(idFilePath), { recursive: true })
			await fs.writeFile(imagePath, Buffer.from(await profileImage.arrayBuffer()))
			await fs.writeFile(idFilePath, Buffer.from(await idFile.arrayBuffer()))
		} catch (err) {
			logError(err as Error)
		}

		try {
			await db.insert(table.userDetails).values({
				id: generateId(),
				userId: user.id,
				phone,
				dateOfBirth: dateOfBirth,
				gender,
				idType,
				idNumber,
				imageUrl: `/userPictures/${user.id}${extension}`,
			})
		} catch (err) {
			logError(err as Error)
		}
	},
}
