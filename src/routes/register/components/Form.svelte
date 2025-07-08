<script lang="ts">
	import { enhance } from '$app/forms'
	import { Button } from 'bits-ui'

	let password = $state('')
	let confirmPassword = $state('')
	let email = $state('')
	let form = $state({
		success: false,
		message: '',
	})

	let passwordValid = $derived(validatePassword(password))
	let emaiValid = $derived(validateEmail(email))
	let passwordsMatch = $derived(password === confirmPassword && confirmPassword !== '')
	let formValid = $derived(passwordValid.isValid && passwordsMatch && emaiValid)

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
</script>

<form
	action="?/register"
	method="post"
	use:enhance={() => {
		return ({ result }) => {
			if (result.type === 'success') {
				form.success = true
				form.message =
					(result.data as any)?.message ||
					'Registration successful! Please verify your email by clicking the link sent.'
			} else if (result.type === 'failure') {
				form.success = false
				form.message =
					(result.data as any)?.message || 'An error occurred during registration.'
			}
		}
	}}
	class="space-y-6"
>
	<div class="flex flex-col gap-4">
		<div class="flex flex-col gap-6 md:flex-row md:gap-4">
			<div>
				<label for="firstname" class="text-foreground mb-2 block text-sm font-medium">
					First Name*
				</label>
				<input
					type="text"
					id="firstname"
					name="firstname"
					placeholder="Enter your first name"
					required
					class="focus:ring-primary bg-background-alt border-border-input text-foreground placeholder:text-muted-foreground w-full rounded-md border px-3 py-2 transition duration-200 focus:ring-2 focus:outline-none"
				/>
			</div>

			<div>
				<label for="lastname" class="text-foreground mb-2 block text-sm font-medium">
					Last Name
				</label>
				<input
					type="text"
					id="lastname"
					name="lastname"
					placeholder="Enter your last name"
					class="focus:ring-primary bg-background-alt border-border-input text-foreground placeholder:text-muted-foreground w-full rounded-md border px-3 py-2 transition duration-200 focus:ring-2 focus:outline-none"
				/>
			</div>
		</div>
		<span class="text-muted-foreground mt-1 text-xs">
			Your name should match your official documents for verification purposes.
		</span>
	</div>

	<div>
		<label for="email" class="text-foreground mb-2 block text-sm font-medium">
			Email Address*
		</label>
		<input
			type="email"
			id="email"
			name="email"
			placeholder="Enter your personal email"
			required
			bind:value={email}
			class="focus:ring-primary bg-background-alt border-border-input text-foreground placeholder:text-muted-foreground w-full rounded-md border px-3 py-2 transition duration-200 focus:ring-2 focus:outline-none"
		/>
		{#if email && !emaiValid}
			<p class="text-destructive mt-1 text-xs">Invalid email format</p>
		{:else if email && emaiValid}
			<p class="text-success mt-1 text-xs">✓ Valid email</p>
		{/if}
	</div>

	<div>
		<label for="password" class="text-foreground mb-2 block text-sm font-medium">
			Set a password*
		</label>
		<input
			type="password"
			id="password"
			name="password"
			bind:value={password}
			placeholder="Create a secure password"
			required
			class="bg-background-alt text-foreground placeholder:text-muted-foreground w-full rounded-md border px-3 py-2 transition duration-200 focus:ring-2 focus:outline-none {password &&
			!passwordValid.isValid
				? 'border-destructive focus:ring-destructive'
				: 'border-border-input focus:ring-primary'}"
		/>
		<div class="mt-2 space-y-1">
			<div
				class="flex items-center text-xs {passwordValid.hasMinLength
					? 'text-success'
					: 'text-muted-foreground'}"
			>
				<span class="mr-2">{passwordValid.hasMinLength ? '✓' : '○'}</span>
				At least 8 characters
			</div>
			<div
				class="flex items-center text-xs {passwordValid.hasLetter
					? 'text-success'
					: 'text-muted-foreground'}"
			>
				<span class="mr-2">{passwordValid.hasLetter ? '✓' : '○'}</span>
				At least 1 letter
			</div>
			<div
				class="flex items-center text-xs {passwordValid.hasNumber
					? 'text-success'
					: 'text-muted-foreground'}"
			>
				<span class="mr-2">{passwordValid.hasNumber ? '✓' : '○'}</span>
				At least 1 number
			</div>
			<div
				class="flex items-center text-xs {passwordValid.hasSymbol
					? 'text-success'
					: 'text-muted-foreground'}"
			>
				<span class="mr-2">{passwordValid.hasSymbol ? '✓' : '○'}</span>
				At least 1 symbol (!@#$%^&*(),.?":|{'<>'})
			</div>
		</div>
	</div>

	<div>
		<label for="confirmPassword" class="text-foreground mb-2 block text-sm font-medium">
			Confirm Password*
		</label>
		<input
			type="password"
			id="confirmPassword"
			name="confirmPassword"
			bind:value={confirmPassword}
			placeholder="Confirm your password"
			required
			class="bg-background-alt text-foreground placeholder:text-muted-foreground w-full rounded-md border px-3 py-2 transition duration-200 focus:ring-2 focus:outline-none {confirmPassword &&
			!passwordsMatch
				? 'border-destructive focus:ring-destructive'
				: 'border-border-input focus:ring-primary'}"
		/>
		{#if confirmPassword && !passwordsMatch}
			<p class="text-destructive mt-1 text-xs">Passwords do not match</p>
		{:else if confirmPassword && passwordsMatch}
			<p class="text-success mt-1 text-xs">✓ Passwords match</p>
		{/if}
	</div>

	<div>
		<Button.Root
			type="submit"
			disabled={!formValid}
			class="flex w-full items-center justify-center rounded-md px-4 py-2 font-medium transition duration-200 disabled:cursor-not-allowed {formValid
				? 'bg-primary text-background hover:opacity-90'
				: 'bg-muted text-muted-foreground'}"
		>
			Create Account
		</Button.Root>
	</div>
	{#if form?.success}
		<div class="bg-success border-success text-background rounded-md border p-4">
			<div class="flex">
				<div class="text-sm">{form.message}</div>
			</div>
		</div>
	{:else if form?.message}
		<div class="bg-destructive border-destructive text-background rounded-md border p-4">
			<div class="flex">
				<div class="text-sm">{form.message}</div>
			</div>
		</div>
	{/if}
</form>
