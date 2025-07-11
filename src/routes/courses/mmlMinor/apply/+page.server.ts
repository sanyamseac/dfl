import type { Actions, PageServerLoad } from './$types'
import * as auth from '$lib/server/auth'
import { db } from '$lib/server/db'
import * as table from '$lib/server/db/schema'
import { eq, and } from 'drizzle-orm'
import { redirect, fail } from '@sveltejs/kit'
import { writeFile, mkdir } from 'fs/promises'
import path, { join } from 'path'
import { generateId, logError } from '$lib/helper'

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
		.from(table.mmlMinor)
		.innerJoin(table.application, eq(table.mmlMinor.applicationId, table.application.id))
		.where(
			and(
				eq(table.application.userId, user.id),
			),
		)
		.limit(1)

	return { user: event.locals.user, application: application[0] || null }
}

export const actions: Actions = {
	apply: async (event) => {
		const user = auth.requireLogin(event)
		const formData = await event.request.formData()

		const existingApplication = await db
			.select()
			.from(table.mmlMinor)
			.innerJoin(table.application, eq(table.mmlMinor.applicationId, table.application.id))
			.where(eq(table.application.userId, user.id))
			.limit(1)

		if (existingApplication.length > 0) {
			return fail(400, { message: 'You have already submitted an application for this program.' })
		}

		if (Date.now() < Date.parse('2025-07-14T00:00:00+05:30') && Date.now() > Date.parse('2025-08-04T00:00:00+05:30')) return fail(400, { message: 'Applications are not open yet or closed.' })

		const institution = formData.get('institution') as string
		const major = formData.get('major') as string
		const discipline = formData.get('discipline') as string
		const semester = parseInt(formData.get('semester') as string)
		const idNumber = formData.get('idNumber') as string
		const cgpa = formData.get('cgpa') as string
		const expectedGradutionYear = parseInt(formData.get('expectedGradutionYear') as string)
		const declarationAccepted = formData.get('declaration') === 'on'

		const idDocument = formData.get('idDocument') as File
		const cgpaDocument = formData.get('cgpaDocument') as File
		const signatureDocument = formData.get('signatureDocument') as File

		if (!declarationAccepted) return fail(400, { message: 'You must accept the declaration to proceed.' })
		if (!institution || !major || !discipline || !semester || !idNumber || !cgpa || !expectedGradutionYear) {
			return fail(400, { message: 'All fields are required.' })
		}

		if (!idDocument || !cgpaDocument || !signatureDocument) {
			return fail(400, { message: 'All documents are required.' })
		}

		try {
			const filePath = path.join('content', 'mmlMinor')
			await mkdir(filePath, { recursive: true })

			const idDocumentId = generateId(30)
			const cgpaDocumentId = generateId(30)
			const signatureDocumentId = generateId(30)

			const idExt = idDocument.name.split('.').pop()
			const cgpaExt = cgpaDocument.name.split('.').pop()
			const signatureExt = signatureDocument.name.split('.').pop()

			const idDocumentPath = join(filePath, `${idDocumentId}.${idExt}`)
			const cgpaDocumentPath = join(filePath, `${cgpaDocumentId}.${cgpaExt}`)
			const signatureDocumentPath = join(filePath, `${signatureDocumentId}.${signatureExt}`)

			await writeFile(idDocumentPath, Buffer.from(await idDocument.arrayBuffer()))
			await writeFile(cgpaDocumentPath, Buffer.from(await cgpaDocument.arrayBuffer()))
			await writeFile(signatureDocumentPath, Buffer.from(await signatureDocument.arrayBuffer()))

			const applicationId = generateId()

			await Promise.all([
				db.insert(table.files).values({
					filePath: idDocumentPath,
					ownerId: user.id,
				}),
				db.insert(table.files).values({
					filePath: cgpaDocumentPath,
					ownerId: user.id,
				}),
				db.insert(table.files).values({
					filePath: signatureDocumentPath,
					ownerId: user.id,
				}),
				db.insert(table.application).values({
					id: applicationId,
					userId: user.id,
					courseName: 'Minor in Modern Machine Learning',
					courseTable: 'mmlMinor',
					status: 'pending'
				})
			])

			await db.insert(table.mmlMinor).values({
				applicationId,
				institution,
				major,
				discipline,
				semester,
				idNumber,
				idUrl: idDocumentPath,
				cgpa,
				cgpaDocumentUrl: cgpaDocumentPath,
				expectedGradutionYear,
				SignatureUrl: signatureDocumentPath
			})

			return { success: true, message: 'Application submitted successfully!' }
		} catch (error) {logError(error as Error)}
	}
}
