<script>
	import { page } from '$app/state'
</script>

<svelte:head>
	<title>Error {page.status}</title>
</svelte:head>

<div class="flex min-h-[80vh] flex-col items-center justify-center p-8 text-center">
	<h1 class="mb-4 text-6xl font-bold text-red-600">{page.status}</h1>
	<h2 class="text-foreground mb-4 text-2xl">{page.error?.message || 'Something went wrong'}</h2>
	<p class="mb-8 text-gray-500">Sorry, we encountered an unexpected error.</p>
	<a
		href="/"
		class="rounded-md bg-blue-500 px-6 py-3 text-white no-underline transition-colors duration-200 hover:bg-blue-600"
	>
		Go back home
	</a>
</div>
