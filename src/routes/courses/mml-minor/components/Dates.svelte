<script>
	const importantDates = [
		{ event: 'Program Launch', date: 'July 12, 2025' },
		{ event: 'Applications Open', date: 'July 14, 2025' },
		{ event: 'Application Deadline', date: 'August 4, 2025' },
		{ event: 'Admission Confirmation', date: 'August 9, 2025' },
		{ event: 'Fee Payment Deadline', date: 'August 14, 2025' },
		{ event: 'Orientation Session', date: 'August 16, 2025' },
		{ event: 'Program Start Date', date: 'August 18, 2025' },
		{ event: 'Program Completion', date: 'August 14, 2026' },
	]
</script>

<section class="bg-muted py-16">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="text-foreground mb-4 text-3xl font-bold">Important Dates</h2>
			<p class="text-foreground-alt text-xl">Mark your calendar for these key milestones</p>
		</div>
		<div class="p-2">
			<div class="grid gap-4 sm:grid-cols-2">
				{#each importantDates as date}
					<div class="flex items-center justify-between rounded-lg px-4 py-2">
						<span class="text-foreground font-medium">{date.event}</span>
						<span class="text-foreground-alt text-sm font-semibold">{date.date}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
