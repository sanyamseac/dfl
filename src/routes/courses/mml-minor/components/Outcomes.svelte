<script lang="ts">
	import { CheckCircle } from 'lucide-svelte'

	const outcomes = [
		'Develop a strong foundation in core machine learning concepts and techniques',
		'Structured to reflect current industry trends and skills in demand',
		'Gain deep knowledge in emerging areas such as deep learning, and large language models',
		'Apply learning through hands-on projects, coding exercises, and real-world case studies',
		'Research driven Pedagogy',
		'Creates pathway to internships in premier research labs/institutions',
		'Access exclusive IIIT-H campus events and learning experiences',
		'Opportunity to pursue advanced certificate courses after completing the minor',
		'Pathway to research at IIIT-H: Students who complete both the Minor and Advanced Certificate programs may be eligible to join IIIT Hyderabad as a researcher',
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
