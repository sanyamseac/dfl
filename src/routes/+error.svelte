<script>
    import { page } from '$app/state';
</script>

<svelte:head>
    <title>Error {page.status}</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-[80vh] text-center p-8">
    <h1 class="text-6xl font-bold text-red-600 mb-4">{page.status}</h1>
    <h2 class="text-2xl mb-4 text-foreground">{page.error?.message || 'Something went wrong'}</h2>
    <p class="text-gray-500 mb-8">Sorry, we encountered an unexpected error.</p>
    <a href="/" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition-colors duration-200 no-underline">
        Go back home
    </a>
</div>
