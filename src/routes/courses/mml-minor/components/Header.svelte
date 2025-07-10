<script>
	import { goto } from '$app/navigation'
	import { Button } from 'bits-ui'
	import { BookOpen, CheckCircle, Pause, Play } from 'lucide-svelte'

	let { early, late } = $props()
	let showVideo = $state(false)

	function toggleVideo() {
		showVideo = !showVideo
	}
</script>

<section
	class="from-primary via-primary/90 to-primary/80 relative overflow-hidden bg-gradient-to-br text-white"
>
	<div class="absolute inset-0 bg-black/10"></div>
	<div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
		<div class="grid gap-12 lg:grid-cols-2 lg:items-center">
			<div>
				<div class="mb-6">
					<span
						class="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-green-300 backdrop-blur-sm"
					>
						<BookOpen class="mr-2 h-4 w-4" />
						Minor Program by IIIT Hyderabad
					</span>
				</div>
				<h1 class="mb-6 text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
					Minor in
					<span
						class="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent"
					>
						Modern Machine Learning
					</span>
				</h1>
				<p class="mb-8 text-xl leading-relaxed text-white/90">
					Complement your core academic training with expertise in Machine Learning. Join
					India's top research-driven institution for a comprehensive 1-year online
					program.
				</p>
				<div class="flex flex-col gap-4 sm:flex-row">
					{#if early}
						<Button.Root
							onclick={() => goto('/courses/mml-minor/apply')}
							class="text-primary inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-200 hover:scale-105 hover:bg-white/95 hover:shadow-xl"
						>
							Applications Open on 14th July
						</Button.Root>
					{:else if late}
						<Button.Root
							class="inline-flex items-center justify-center rounded-lg bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
						>
							Applications Closed
						</Button.Root>
					{:else}
						<Button.Root
							onclick={() => goto('/courses/mml-minor/apply')}
							class="text-primary inline-flex cursor-pointer items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-200 hover:scale-105 hover:bg-white/95 hover:shadow-xl"
						>
							Apply Now
						</Button.Root>
					{/if}
					{#if !showVideo}
						<Button.Root
							onclick={toggleVideo}
							class="inline-flex cursor-pointer items-center justify-center rounded-lg border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
						>
							<Play class="mr-2 h-5 w-5" />
							Watch Overview
						</Button.Root>
					{:else}
						<Button.Root
							onclick={toggleVideo}
							class="inline-flex cursor-pointer items-center justify-center rounded-lg border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
						>
							<Pause class="mr-2 h-5 w-5" />
							Hide Overview
						</Button.Root>
					{/if}
				</div>

				{#if showVideo}
					<div class="mt-8 transform transition-all duration-500 ease-in-out">
						<video class="w-full rounded-lg shadow-lg" controls src="/mml.mp4" autoplay>
						</video>
					</div>
				{:else}
					<div
						class="mt-8 grid grid-cols-2 gap-6 transition-all duration-500 ease-in-out sm:grid-cols-4"
					>
						<div class="text-center">
							<div class="text-2xl font-bold">1 Year</div>
							<div class="text-sm text-white/80">Duration</div>
						</div>
						<div class="text-center">
							<div class="text-2xl font-bold">100%</div>
							<div class="text-sm text-white/80">Online</div>
						</div>
						<div class="text-center">
							<div class="text-2xl font-bold">18</div>
							<div class="text-sm text-white/80">Credits</div>
						</div>
						<div class="text-center">
							<div class="text-2xl font-bold">6-8h</div>
							<div class="text-sm text-white/80">Per Week</div>
						</div>
					</div>
				{/if}
			</div>
			<div class="relative">
				<div class="rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
					<img
						src="/iiit-logo.png"
						alt="IIIT Hyderabad"
						class="mx-auto mb-6 h-20 invert"
					/>
					<h3 class="mb-4 text-center text-xl font-semibold">Program Highlights</h3>
					<ul class="space-y-3">
						<li class="flex items-center">
							<CheckCircle class="mr-3 h-5 w-5 text-green-300" />
							Live interactive sessions with IIIT-H faculty
						</li>
						<li class="flex items-center">
							<CheckCircle class="mr-3 h-5 w-5 text-green-300" />
							Hands-on projects and real-world applications
						</li>
						<li class="flex items-center">
							<CheckCircle class="mr-3 h-5 w-5 text-green-300" />
							Access to exclusive campus events
						</li>
						<li class="flex items-center">
							<CheckCircle class="mr-3 h-5 w-5 text-green-300" />
							Pathway to advanced research opportunities
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>
