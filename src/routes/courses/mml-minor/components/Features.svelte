<script lang="ts">
	import Teacher from '../pictures/Teacher.svelte'
	import Award from '../pictures/Award.svelte'
	import Online from '../pictures/Online.svelte'
	import Project from '../pictures/Project.svelte'
	const features = [
		{
			icon: Teacher,
			className: 'h-14',
			title: 'Expert Faculty',
			description: 'Learn from IIIT-H faculty and industry experts',
		},
		{
			icon: Award,
			className: 'h-11 mt-2 mb-5',
			title: 'Industry Recognition',
			description: 'Earn a prestigious Minor Program certificate from IIIT Hyderabad',
		},
		{
			icon: Online,
			className: 'h-14',
			title: 'Fully Online',
			description:
				'Learn from anywhere with live interactive sessions and flexible scheduling',
		},
		{
			icon: Project,
			className: 'h-10 mt-2 mb-5',
			title: 'Projects',
			description: 'Hands-on projects to apply your learning in real-world scenarios',
		},
	]
</script>

<section class="bg-muted py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="text-foreground mb-4 text-3xl font-bold">
				<span class="text-green-600 dark:text-green-500">Four Reasons</span> to Join This Program
			</h2>
			<p class="text-foreground-alt mx-auto max-w-3xl text-xl">
				Designed for undergraduate students who want to complement their core training with
				cutting-edge ML expertise
			</p>
		</div>
		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{#each features as feature}
				<div
					class="group border-b p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
				>
					<div class="mb-4">
						<feature.icon class={feature.className} />
					</div>
					<h3 class="text-foreground mb-2 text-lg font-semibold">{feature.title}</h3>
					<p class="text-foreground-alt">{feature.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
