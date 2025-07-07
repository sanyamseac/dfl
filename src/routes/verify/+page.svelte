<script lang="ts">
    import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
    let { data } = $props()

    onMount(()=> {
        setTimeout(() => {
            goto('/dashboard')
        }, 2000)
    })
</script>

<svelte:head>
    <title>Verification Successful - DFL IIIT</title>
    <meta name="description" content="Your account has been successfully verified." />
</svelte:head>

<div class="min-h-screen flex items-center justify-center py-8 px-2 sm:px-4 lg:px-8 bg-background">
    <div class="max-w-md w-full space-y-8">
        <div class="text-center">
            <h2 class="text-3xl font-semibold mb-2 text-primary">Verification Successful</h2>
            <h3 class="text-center text-xl text-success">Hi {data.user?.firstname}👋.</h3>
            <p class="text-center text-sm text-foreground-alt mt-4">Your account has been successfully verified!. Redirecting to dashboard...</p>
        </div>
    </div>
</div>