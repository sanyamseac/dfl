<script lang="ts">
	import '../app.css'
	import NavBar from '$lib/components/NavBar.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import { onMount } from 'svelte'

	let { children } = $props()
</script>

<NavBar />
{@render children()}
<Footer />
