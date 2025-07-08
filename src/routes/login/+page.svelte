<script lang="ts">
	import { goto } from '$app/navigation'
	import { Button } from 'bits-ui'
	import { enhance } from '$app/forms'

	let form = $state({
		success: false,
		message: '',
	})
	let loading = $state(false)
</script>

<svelte:head>
	<title>Applicant Login - DFL IIIT</title>
	<meta name="description" content="Register for an account" />
	<meta name="keywords" content="register, signup, create account" />
</svelte:head>

<div class="bg-background flex min-h-[80vh] items-center justify-center px-2 py-12 sm:px-4 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div class="text-center">
			<h2 class="text-primary mb-2 text-3xl font-semibold">Applicant Login</h2>
			<p class="text-foreground-alt text-sm">Login to proceed</p>
		</div>

		<div class="bg-background-alt border-border-card rounded-lg border p-4 shadow-xl md:p-8">
			<form
				action="?/login"
				method="post"
				use:enhance={() => {
					return async ({ result }) => {
						if (result.type === 'redirect') {
							goto(result.location)
						} else if (result.type === 'failure') {
							form.success = false
							form.message =
								(result.data as any)?.message ||
								'An error occurred during registration.'
						}
						loading = false
					}
				}}
				class="space-y-6"
			>
				<div>
					<label for="email" class="text-foreground mb-2 block text-sm font-medium">
						Email Address*
					</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="Enter your email address"
						required
						class="focus:ring-primary bg-background-alt border-border-input text-foreground placeholder:text-muted-foreground w-full rounded-md border px-3 py-2 transition duration-200 focus:ring-2 focus:outline-none"
					/>
				</div>
				<div>
					<label for="password" class="text-foreground mb-2 block text-sm font-medium">
						Password*
					</label>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="Enter your password"
						required
						class="bg-background-alt text-foreground placeholder:text-muted-foreground border-border-input focus:ring-primary w-full rounded-md border px-3 py-2 transition duration-200 focus:ring-2 focus:outline-none"
					/>
				</div>

				<div>
					<Button.Root
						type="submit"
						disabled={loading}
						class="bg-primary text-background flex w-full items-center justify-center rounded-md px-4 py-2 font-medium transition duration-200 hover:opacity-90 disabled:cursor-not-allowed"
					>
						Login
					</Button.Root>
				</div>
				{#if form?.success}
					{goto('/dashboard')}
				{:else if form?.message}
					<div
						class="bg-destructive border-destructive text-background rounded-md border p-4"
					>
						<div class="flex">
							<div class="text-sm">{form.message}</div>
						</div>
					</div>
				{/if}
			</form>
			<div class="mt-6 text-center">
				<p class="text-foreground-alt text-sm">
					Don't have an account?
					<a
						href="/register"
						class="text-primary cursor-pointer font-medium transition duration-200 hover:opacity-80"
					>
						Register here
					</a>
				</p>
			</div>
		</div>
	</div>
</div>
