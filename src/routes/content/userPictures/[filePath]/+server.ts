import { error } from '@sveltejs/kit'
import { readFile } from 'fs/promises'
import type { RequestHandler } from './$types'
import * as auth from '$lib/server/auth'
import path from 'path'
import { logError } from '$lib/helper'

export const GET: RequestHandler = async (event) => {
	const { filePath } = event.params
	if (!filePath) throw error(400, 'File path is required')
	const userId = filePath.split('.')[0]
	const user = auth.requireLogin(event)
	if (!auth.admin_roles.includes(user.role) && user.id !== userId)
		throw error(403, 'Access denied')

	try {
		const picturePath = path.join('userPictures', filePath)
		const fileBuffer = await readFile(picturePath)
		const extension = filePath.split('.').pop()?.toLowerCase()
		const contentType = getContentType(extension)

		return new Response(fileBuffer, {
			headers: {
				'Content-Type': contentType,
				'Cache-Control': 'private, max-age=3600',
			},
		})
	} catch (err) {
		logError(err as Error)
		throw error(500, 'File not found')
	}
}

function getContentType(extension: string | undefined): string {
	switch (extension) {
		case 'jpg':
		case 'jpeg':
			return 'image/jpeg'
		case 'png':
			return 'image/png'
		case 'gif':
			return 'image/gif'
		case 'webp':
			return 'image/webp'
		default:
			return `image/${extension}`
	}
}
