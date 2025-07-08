<script lang="ts">
	import { goto } from '$app/navigation'
	import Form from './components/Form.svelte'
	import Resend from './components/Resend.svelte'
	import { Button } from 'bits-ui'

	let openModal = $state(false)
</script>

<svelte:head>
	<title>Applicant Registration - Academic Institute</title>
	<meta name="description" content="Register for an account" />
	<meta name="keywords" content="register, signup, create account" />
</svelte:head>

<Resend bind:openModal />
<div class="bg-background flex items-center justify-center px-2 py-12 sm:px-4 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div class="text-center">
			<h2 class="text-primary mb-2 text-3xl font-semibold">Applicant Registration</h2>
			<p class="text-foreground-alt text-sm">Create an account to apply</p>
		</div>

		<div class="bg-background-alt border-border-card rounded-lg border p-4 shadow-xl md:p-8">
			<Form />
			<div class="mt-6 text-center">
				<p class="text-foreground-alt text-sm">
					Already have an account?
					<a
						href="/login"
						class="text-primary cursor-pointer font-medium transition duration-200 hover:opacity-80"
					>
						Sign in here
					</a>
				</p>
			</div>
			<div class="mt-6 text-center">
				<p class="text-foreground-alt text-sm">
					Didn't receive a verification email?
					<Button.Root
						onclick={() => (openModal = true)}
						class="text-primary cursor-pointer font-medium transition duration-200 hover:opacity-80"
					>
						Resend verification email
					</Button.Root>
				</p>
			</div>
		</div>

		<div class="text-muted-foreground text-center text-xs">
			<p>By registering, you agree to our Terms of Service and Privacy Policy</p>
		</div>
	</div>
</div>
