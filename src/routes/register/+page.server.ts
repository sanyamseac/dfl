import { hash } from '@node-rs/argon2'
import { fail, redirect } from '@sveltejs/kit'
import { db } from '$lib/server/db'
import * as table from '$lib/server/db/schema'
import type { Actions, PageServerLoad } from './$types'
import { generateId, logError } from '$lib/helper'
import { sendVerifyEmail } from '$lib/server/verifyMail'
import { eq } from 'drizzle-orm'

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) return redirect(302, '/dashboard')
	return {}
}

export const actions: Actions = {
	register: async (event) => {
		if (event.locals.user) return redirect(302, '/dashboard')
		const formData = await event.request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string
		const firstname = formData.get('firstname') as string
		const lastname = formData.get('lastname') as string

		if (!email || !validateEmail(email)) return fail(400, { message: 'Invalid Email' })
		if (!password || !validatePassword(password))
			return fail(400, { message: 'Invalid Password' })
		if (!firstname) return fail(400, { message: 'Invalid Firstname' })

		const userId = generateId()
		const passwordHash = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		})

		try {
			const existingUser = await db
				.select()
				.from(table.user)
				.where(eq(table.user.email, email))
				.limit(1)

			if (existingUser.length > 0)
				return fail(400, {
					message: 'Email already registered. Please login or contact support.',
				})

			const check = await db
				.select()
				.from(table.unverified)
				.where(eq(table.unverified.email, email))
				.limit(1)

			if (check.length > 0)
				return fail(400, {
					message: 'Email already registered. Please verify your email or try another.',
				})

			await db.insert(table.unverified).values({
				id: userId,
				email,
				firstname,
				lastname,
				passwordHash,
				verificationToken: generateId(18),
				verificationExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
			})
		} catch (err) {
			return logError(err as Error)
		}
		return {
			success: true,
			message:
				'Registration successful! Please verify your email by clicking on the link sent to proceed.',
		}
	},

	resendMail: async (event) => {
		if (event.locals.user) return redirect(302, '/dashboard')
		const formData = await event.request.formData()
		const email = formData.get('email') as string

		if (!email || !validateEmail(email)) return fail(400, { message: 'Invalid Email' })
		return await sendVerifyEmail(email)
	},
}

function validatePassword(pwd: string) {
	const hasMinLength = pwd.length >= 8
	const hasLetter = /[a-zA-Z]/.test(pwd)
	const hasNumber = /\d/.test(pwd)
	const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(pwd)

	return {
		isValid: hasMinLength && hasLetter && hasNumber && hasSymbol,
		hasMinLength,
		hasLetter,
		hasNumber,
		hasSymbol,
	}
}

function validateEmail(email: string) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(email)
}
