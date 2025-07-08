<script lang="ts">
	import { onMount } from 'svelte'
	import { ChevronLeft, ChevronRight } from 'lucide-svelte'
	import { goto } from '$app/navigation'

	let currentSlide = 0
	let autoPlayInterval: NodeJS.Timeout | undefined

	const slides = [
		{
			image: 'https://dfl.iiit.ac.in/assets/img/slide/lab1.png',
			title: 'Welcome to Division of Flexible Learning',
			subtitle: 'Empowering Education Through Innovation',
			description:
				'Discover cutting-edge research and flexible learning solutions at IIIT Hyderabad',
		},
		{
			image: 'https://dfl.iiit.ac.in/assets/img/slide/at_a_glance1.png',
			title: 'Research Excellence',
			subtitle: 'Advancing Knowledge and Technology',
			description:
				'Leading breakthrough research in computer science and information technology',
		},
		{
			image: 'assets/img/slide/lab1.png',
			title: 'State-of-the-Art Facilities',
			subtitle: 'Modern Labs and Learning Spaces',
			description: 'Experience world-class infrastructure designed for innovative learning',
		},
	]

	function nextSlide() {
		currentSlide = (currentSlide + 1) % slides.length
	}

	function prevSlide() {
		currentSlide = (currentSlide - 1 + slides.length) % slides.length
	}

	function goToSlide(index: number) {
		currentSlide = index
	}

	onMount(() => {
		autoPlayInterval = setInterval(nextSlide, 5000)
		return () => {
			if (autoPlayInterval) {
				clearInterval(autoPlayInterval)
			}
		}
	})
</script>

<!-- Hero Section -->
<section id="hero" class="relative h-[90vh] overflow-hidden">
	<!-- Background Images -->
	{#each slides as slide, index}
		<div
			class="absolute inset-0 transition-opacity duration-1000 ease-in-out {currentSlide ===
			index
				? 'opacity-100'
				: 'opacity-0'}"
			style="background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url({slide.image}); background-size: cover; background-position: center; background-repeat: no-repeat;"
		>
			<!-- Content Overlay -->
			<div class="absolute inset-0 flex items-center justify-center">
				<div class="mx-auto max-w-4xl px-4 text-center text-white">
					<h1
						class="mb-6 text-5xl leading-tight font-bold md:text-7xl {currentSlide ===
						index
							? 'animate-fade-in-up'
							: ''}"
					>
						{slide.title}
					</h1>
					<p
						class="mb-4 text-xl font-medium md:text-2xl {currentSlide === index
							? 'animate-fade-in-up animation-delay-200'
							: ''}"
					>
						{slide.subtitle}
					</p>
					<p
						class="mx-auto mb-8 max-w-2xl text-lg opacity-90 md:text-xl {currentSlide ===
						index
							? 'animate-fade-in-up animation-delay-400'
							: ''}"
					>
						{slide.description}
					</p>
				</div>
			</div>
		</div>
	{/each}

	<!-- Navigation Controls -->
	<button
		onclick={prevSlide}
		class="absolute top-1/2 left-4 z-10 hidden -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30 md:inline"
		aria-label="Previous slide"
	>
		<ChevronLeft size={24} />
	</button>

	<button
		onclick={nextSlide}
		class="absolute top-1/2 right-4 z-10 hidden -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30 md:inline"
		aria-label="Next slide"
	>
		<ChevronRight size={24} />
	</button>

	<!-- Slide Indicators -->
	<div class="absolute bottom-20 left-1/2 z-10 flex -translate-x-1/2 space-x-3">
		{#each slides as _, index}
			<button
				onclick={() => goToSlide(index)}
				class="h-3 w-3 rounded-full transition-all duration-300 {currentSlide === index
					? 'scale-125 bg-white'
					: 'bg-white/50 hover:bg-white/70'}"
				aria-label="Go to slide {index + 1}"
			></button>
		{/each}
	</div>

	<!-- Scroll Indicator -->
	<div onclick={() => goto('/')} class="absolute right-8 bottom-8 animate-bounce">
		<div class="flex h-10 w-6 justify-center rounded-full border-2 border-white/50">
			<div class="mt-2 h-3 w-1 animate-pulse rounded-full bg-white/70"></div>
		</div>
	</div>
</section>

<!-- About Section -->
<section id="about" class="from-background to-muted/30 bg-gradient-to-br py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="mb-16 text-center">
			<h2 class="text-foreground mb-4 text-4xl font-bold md:text-5xl">
				At a <span class="text-primary">Glance</span>
			</h2>
			<div class="bg-primary mx-auto h-1 w-24 rounded-full"></div>
		</div>

		<!-- Main Content Grid -->
		<div class="grid items-center gap-16 lg:grid-cols-2">
			<!-- Images Column -->
			<div class="order-2 space-y-8 lg:order-1">
				<div class="group relative">
					<div
						class="shadow-card transform overflow-hidden rounded-2xl transition-transform duration-500 group-hover:scale-105"
					>
						<img
							src="https://dfl.iiit.ac.in/assets/img/DigLib2.png"
							alt="Research Laboratory"
							class="h-64 w-full object-cover"
						/>
					</div>
					<div
						class="from-primary/20 absolute inset-0 rounded-2xl bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					></div>
				</div>

				<div class="group relative">
					<div
						class="shadow-card transform overflow-hidden rounded-2xl transition-transform duration-500 group-hover:scale-105"
					>
						<img
							src="https://dfl.iiit.ac.in/assets/img/lab2.jpg"
							alt="Digital Library"
							class="h-64 w-full object-cover"
						/>
					</div>
					<div
						class="from-tertiary/20 absolute inset-0 rounded-2xl bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					></div>
				</div>
			</div>

			<!-- Content Column -->
			<div class="order-1 space-y-8 lg:order-2">
				<div>
					<h3 class="text-foreground mb-6 text-3xl leading-tight font-bold md:text-4xl">
						Research and Education that Makes a <span class="text-primary"
							>Difference</span
						>
					</h3>

					<div class="text-foreground-alt space-y-6 text-lg leading-relaxed">
						<p>
							International Institute of Information Technology, Hyderabad (IIITH) is
							an autonomous university, founded as a not-for-profit public private
							partnership (N-PPP) in 1998, and is the first IIIT in India under this
							model. Over the years, the institute has evolved strong research
							programmes in various areas, with an emphasis on technology and applied
							research for industry and society.
						</p>

						<p>
							The institute facilitates interdisciplinary research and a seamless flow
							of knowledge. Several world-renowned centres of excellence are part of
							IIITH's research portfolio. It has established various joint
							collaboration and co-innovation models with an industry outreach
							spanning significant national and multinational companies.
						</p>

						<p>
							Its innovative curriculum allows students the flexibility of selecting
							their courses and projects. Apart from academics the institute provides
							students with a comprehensive environment that promotes art and culture,
							sports, societal contributions and self-governance. Even undergraduate
							students get to participate in ongoing research and technology
							development - an opportunity unprecedented in India.
						</p>
					</div>
				</div>

				<div class="mt-8">
					<a
						href="https://iiit.ac.in"
						class="bg-primary hover:bg-primary/90 shadow-btn transform rounded-lg px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105"
					>
						Learn More About IIITH
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes fade-in-up {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in-up {
		animation: fade-in-up 0.8s ease-out forwards;
	}

	.animation-delay-200 {
		animation-delay: 0.2s;
	}

	.animation-delay-400 {
		animation-delay: 0.4s;
	}
</style>
