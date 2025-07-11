import { error } from '@sveltejs/kit'
import { readFile } from 'fs/promises'
import type { RequestHandler } from './$types'
import * as auth from '$lib/server/auth'
import path from 'path'
import { logError } from '$lib/helper'
import * as table from '$lib/server/db/schema'
import { db } from '$lib/server/db'
import { eq } from 'drizzle-orm'

export const GET: RequestHandler = async (event) => {
    const filePath = event.params.filePath
    const application = event.params.application
    if (!filePath) throw error(400, 'File path is required')
    const user = auth.requireLogin(event)
    const owner = await db
        .select()
        .from(table.files)
        .where(eq(table.files.ownerId, user.id))
        .limit(1)
    
    if (!auth.admin_roles.includes(user.role) && user.id !== owner[0].ownerId)
        throw error(403, 'Access denied')

    try {
        const documentPath = path.join('content', application, filePath)
        const fileBuffer = await readFile(documentPath)
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
        case 'pdf':
            return 'application/pdf'
        default:
            return `image/${extension}`
    }
}
