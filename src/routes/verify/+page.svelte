<script lang="ts">
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	let { data } = $props()

	onMount(() => {
		setTimeout(() => {
			goto('/dashboard')
		}, 2000)
	})
</script>

<svelte:head>
	<title>Verification Successful - DFL IIIT</title>
	<meta name="description" content="Your account has been successfully verified." />
</svelte:head>

<div class="bg-background flex min-h-screen items-center justify-center px-2 py-8 sm:px-4 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div class="text-center">
			<h2 class="text-primary mb-2 text-3xl font-semibold">Verification Successful</h2>
			<h3 class="text-success text-center text-xl">Hi {data.user?.firstname}👋.</h3>
			<p class="text-foreground-alt mt-4 text-center text-sm">
				Your account has been successfully verified!. Redirecting to dashboard...
			</p>
		</div>
	</div>
</div>
