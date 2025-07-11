<script lang="ts">
	import { Button } from 'bits-ui'
	import { onMount } from 'svelte'
	import type { PageServerData } from './$types'
	import Curriculum from './components/Curriculum.svelte'
	import Eligibility from './components/Eligibility.svelte'
	import Features from './components/Features.svelte'
	import Pricing from './components/Pricing.svelte'
	import Dates from './components/Dates.svelte'
	import Faqs from './components/Faqs.svelte'
	import Bottom from './components/Bottom.svelte'
	import Header from './components/Header.svelte'
	import { goto } from '$app/navigation'

	let { data }: { data: PageServerData } = $props()
	let startDate = new Date('2025-07-14T00:00:00+05:30')
	let endDate = new Date('2025-08-04T23:59:59+05:30')
	let early = $state(Date.now() < startDate.getTime())
	let late = $state(Date.now() > endDate.getTime())

	let showFloatingButton = $state(false)

	function handleScroll() {
		showFloatingButton = window.scrollY > 800
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	})
</script>

<svelte:head>
	<title>Minor in Machine Learning - IIIT Hyderabad - DFL</title>
	<meta
		name="description"
		content="Earn a Minor in Machine Learning from IIIT Hyderabad. 1-year fully online program with live sessions, hands-on projects, and industry-relevant curriculum."
	/>
	<meta
		name="keywords"
		content="machine learning, minor degree, IIIT Hyderabad, online education, AI, computer vision, NLP"
	/>
</svelte:head>

<Header {late} {early} />

<Features />
<Curriculum />
<Eligibility />
<Pricing />
<Dates />
<Faqs />
<Bottom {late} {early} />
<div class="mx-auto max-w-4xl px-4 py-8 text-center">
	<span class="text-center text-sm text-foreground-alt">
		This Minor Program is a credit-bearing academic program offered by IIIT Hyderabad (DFL). The program leads to a Certificate of Completion. Recognition of this Minor by the student's home institution is subject to their internal academic policies or approval.
	</span>
</div>

{#if showFloatingButton && !late && !early}
	<div
		class="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform transition-all duration-300"
	>
		<Button.Root
			onclick={() => goto('/courses/mmlMinor/apply')}
			class="bg-primary/80 hover:bg-primary inline-flex cursor-pointer items-center justify-center rounded-full px-8 py-4 font-semibold text-white shadow-xl backdrop-blur-lg transition-all duration-200 hover:scale-105"
		>
			Apply Now
		</Button.Root>
	</div>
{/if}
