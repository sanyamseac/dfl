<script lang="ts">
    import { goto } from '$app/navigation'
    import { Button } from 'bits-ui'
	import { enhance } from '$app/forms'

    let form = $state({
        success: false,
        message: ''
    })
	let loading = $state(false)
</script>

<svelte:head>
    <title>Applicant Login - DFL IIIT</title>
    <meta name="description" content="Register for an account" />
    <meta name="keywords" content="register, signup, create account" />
</svelte:head>

<div class="min-h-[80vh] flex items-center justify-center py-12 px-2 sm:px-4 lg:px-8 bg-background">
    <div class="max-w-md w-full space-y-8">
        <div class="text-center">
            <h2 class="text-3xl font-semibold mb-2 text-primary">Applicant Login</h2>
            <p class="text-sm text-foreground-alt">Login to proceed</p>
        </div>

        <div class="shadow-xl rounded-lg p-4 md:p-8 border bg-background-alt border-border-card">
            <form action="?/login" method="post" use:enhance={() => {
						return async ({ result }) => {
							if (result.type === 'redirect') {
								goto(result.location)
							} else if (result.type === 'failure') {
								form.success = false
								form.message = (result.data as any)?.message || 'An error occurred during registration.'
							}
							loading = false
						}
					}
				} class="space-y-6"
			>
					<div>
						<label for="email" class="block text-sm font-medium mb-2 text-foreground">
							Email Address*
						</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Enter your email address"
							required
							class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 bg-background-alt border-border-input text-foreground placeholder:text-muted-foreground"
						/>
					</div>
					<div>
						<label for="password" class="block text-sm font-medium mb-2 text-foreground">
							Password*
						</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Enter your password"
							required
							class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition duration-200 bg-background-alt text-foreground placeholder:text-muted-foreground border-border-input focus:ring-primary"
						/>
					</div>

					<div>
						<Button.Root
							type="submit"
							
							disabled={loading}
							class="w-full font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center disabled:cursor-not-allowed bg-primary text-background hover:opacity-90"
						>
							Login
						</Button.Root>
					</div>
					{#if form?.success}
						{goto('/dashboard')}
					{:else if form?.message}
						<div class="rounded-md p-4 border bg-destructive border-destructive text-background">
							<div class="flex">
								<div class="text-sm">{form.message}</div>
							</div>
						</div>
					{/if}
				</form>
            <div class="mt-6 text-center">
                <p class="text-sm text-foreground-alt">
                    Don't have an account? 
                    <a href="/register" class="cursor-pointer font-medium transition duration-200 text-primary hover:opacity-80">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    </div>
</div>