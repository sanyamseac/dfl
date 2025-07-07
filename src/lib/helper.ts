import { generateRandomString } from '@oslojs/crypto/random'
import { fail } from '@sveltejs/kit';

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export function generateId(length = 21): string {
	return generateRandomString(
		{ read: (bytes) => crypto.getRandomValues(bytes) },
		alphabet,
		length,
	)
}

export function logError(err: Error) {
	const id = generateId(10)
	console.error(`Error ID: ${id}`, err)
	return fail(500, {
		message: `An error has occurred. The error is logged with ID: ${id}. Please contact support with this ID.`,
	})
}