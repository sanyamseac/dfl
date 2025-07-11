<script lang="ts">
	import { CheckCircle } from 'lucide-svelte'

	const outcomes = [
		'',
		'Gain deep knowledge in emerging areas such as deep learning, and large language models',
		'',
		'Research driven Pedagogy',
		'',
		'',
		'',
		'',
	]
</script>

<section class="bg-background py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="text-foreground mb-4 text-3xl font-bold">What will you earn?</h2>
			<p class="text-foreground-alt mx-auto max-w-3xl text-xl">
				What you'll gain from completing this program
			</p>
		</div>
		<div class="grid gap-6 md:grid-cols-2">
			{#each outcomes as outcome}
				<div class="flex items-start space-x-4 p-2 px-6">
					<CheckCircle class="text-success mt-1 h-6 w-6 flex-shrink-0" />
					<p class="text-foreground">{outcome}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
