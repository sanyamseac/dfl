<script>
	import { ScrollArea } from 'bits-ui'

	const curriculum = [
		{
			term: 'Term I',
			duration: '11 weeks',
			course: 'Foundations of ML',
			credits: 4,
			description:
				'Build strong fundamentals in machine learning concepts, algorithms, and mathematical foundations.',
		},
		{
			term: 'Term II',
			duration: '11 weeks',
			course: 'Modern ML / Advanced ML',
			credits: 4,
			description:
				'Explore advanced machine learning techniques, deep learning, and state-of-the-art algorithms.',
		},
		{
			term: 'Term III',
			duration: '11 weeks',
			course: 'Computer Vision',
			credits: 4,
			description:
				'Master computer vision techniques, image processing, and visual recognition systems.',
		},
		{
			term: 'Term IV',
			duration: '11 weeks',
			course: 'Natural Language Processing',
			credits: 4,
			description:
				'Learn NLP fundamentals, text processing, and language understanding technologies.',
		},
		{
			term: 'Term V',
			duration: '8 weeks',
			course: 'Project / Capstone',
			credits: '2',
			description:
				'Apply your knowledge in a comprehensive project demonstrating mastery of ML concepts.',
		},
	]
</script>

<section class="bg-muted py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="text-foreground mb-4 text-3xl font-bold">Comprehensive Curriculum</h2>
			<p class="text-foreground-alt mx-auto max-w-3xl text-xl">
				Five terms of structured learning covering foundational to advanced machine learning
				concepts
			</p>
		</div>

		<!-- Horizontal Scrolling Curriculum -->
		<div class="relative">
			<ScrollArea.Root class="relative overflow-hidden px-4 py-4">
				<ScrollArea.Viewport class="h-full w-full">
					<div class="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
						{#each curriculum as term, index}
							<div class="w-80 flex-none snap-start">
								<div
									class="bg-background-alt shadow-card border-border-card h-full rounded-xl border p-6"
								>
									<div class="mb-4">
										<div
											class="bg-primary mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white"
										>
											{index + 1}
										</div>
										<div class="flex items-center justify-between">
											<div>
												<div class="text-foreground text-lg font-semibold">
													{term.term}
												</div>
												<div class="text-foreground-alt text-sm">
													{term.duration}
												</div>
											</div>
											<div
												class="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold"
											>
												{term.credits} Credits
											</div>
										</div>
									</div>
									<h3 class="text-foreground mb-3 text-xl font-semibold">
										{term.course}
									</h3>
									<p class="text-foreground-alt leading-relaxed">
										{term.description}
									</p>
								</div>
							</div>
						{/each}
					</div>
				</ScrollArea.Viewport>
				<ScrollArea.Scrollbar
					orientation="vertical"
					class="bg-muted hover:bg-dark-10 data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out-0 data-[state=visible]:fade-in-0 flex w-2.5 touch-none rounded-full border-l border-l-transparent p-px transition-all duration-200 select-none hover:w-3"
				>
					<ScrollArea.Thumb class="bg-muted-foreground flex-1 rounded-full" />
				</ScrollArea.Scrollbar>
				<ScrollArea.Scrollbar
					orientation="horizontal"
					class="bg-muted hover:bg-dark-10 flex h-2.5 touch-none rounded-full border-t border-t-transparent p-px transition-all duration-200 select-none hover:h-3 "
				>
					<ScrollArea.Thumb class="bg-muted-foreground rounded-full" />
				</ScrollArea.Scrollbar>
				<ScrollArea.Corner />
			</ScrollArea.Root>
		</div>
	</div>
</section>
