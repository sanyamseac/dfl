<script lang="ts">
	import { onMount } from 'svelte'
	import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight } from 'lucide-svelte'
	import { fade, fly } from 'svelte/transition'
	import { cubicOut } from 'svelte/easing'
	import { Button } from 'bits-ui'

	interface CalendarEvent {
		id: number
		title: string
		description: string
		date: string
		time?: string
		location?: string
		type: 'academic' | 'admission' | 'workshop' | 'seminar' | 'deadline' | 'other'
		participants?: string
		isUpcoming: boolean
	}

	const eventTypes = {
		academic: {
			label: 'Academic',
			color: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20',
		},
		admission: {
			label: 'Admission',
			color: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20',
		},
		workshop: {
			label: 'Workshop',
			color: 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/20',
		},
		seminar: {
			label: 'Seminar',
			color: 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20',
		},
		deadline: {
			label: 'Deadline',
			color: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20',
		},
		other: {
			label: 'Other',
			color: 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900/20',
		},
	}

	const allEvents: CalendarEvent[] = [
		{
			id: 1,
			title: 'Modern Machine Learning Minor Program Application Deadline',
			description:
				'Final date to submit applications for the Modern Machine Learning Minor Program',
			date: '2025-08-04',
			time: '23:59',
			location: 'Online',
			type: 'deadline',
			isUpcoming: true,
		},
		{
			id: 2,
			title: 'Modern Machine Learning Minor Program Application Start',
			description: 'Start date for applications to the Modern Machine Learning Minor Program',
			date: '2025-07-14',
			time: '00:00',
			location: 'Online',
			type: 'admission',
			isUpcoming: true,
		},
		{
			id: 3,
			title: 'MML Minor Program Orientation',
			description: 'Orientation session for the Modern Machine Learning Minor Program',
			date: '2025-08-16',
			location: 'Online',
			type: 'admission',
			isUpcoming: true,
		},
		{
			id: 4,
			title: 'MML Minor Academics Term 1 Start',
			description:
				'Start of the first academic term for the Modern Machine Learning Minor Program',
			date: '2025-08-18',
			type: 'academic',
			isUpcoming: true,
		},
		{
			id: 5,
			title: 'MML Minor Academics Term 2 Start',
			description:
				'Start of the second academic term for the Modern Machine Learning Minor Program',
			date: '2025-11-03',
			type: 'academic',
			isUpcoming: true,
		},
		{
			id: 6,
			title: 'MML Minor Academics Term 3 Start',
			description:
				'Start of the third academic term for the Modern Machine Learning Minor Program',
			date: '2026-01-19',
			type: 'academic',
			isUpcoming: true,
		},
		{
			id: 7,
			title: 'MML Minor Academics Term 4 Start',
			description:
				'Start of the fourth academic term for the Modern Machine Learning Minor Program',
			date: '2026-04-06',
			type: 'academic',
			isUpcoming: true,
		},
		{
			id: 7,
			title: 'MML Minor Academics Last Term Start',
			description:
				'Start of the fifth (last) academic term for the Modern Machine Learning Minor Program',
			date: '2026-06-22',
			type: 'academic',
			isUpcoming: true,
		},
	]

	let selectedMonth = $state<number>(new Date().getMonth())
	let selectedYear = $state<number>(new Date().getFullYear())
	let selectedFilter = $state<string>('all')

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]

	function formatTime(timeString: string) {
		const [hours, minutes] = timeString.split(':')
		const hour = parseInt(hours)
		const ampm = hour >= 12 ? 'PM' : 'AM'
		const displayHour = hour % 12 || 12
		return `${displayHour}:${minutes} ${ampm}`
	}

	function getDaysUntil(dateString: string) {
		const eventDate = new Date(dateString)
		const today = new Date()
		const diffTime = eventDate.getTime() - today.getTime()
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
		return diffDays
	}

	function isEventInMonth(event: CalendarEvent, month: number, year: number) {
		const eventDate = new Date(event.date)
		return eventDate.getMonth() === month && eventDate.getFullYear() === year
	}

	function nextMonth() {
		if (selectedMonth === 11) {
			selectedMonth = 0
			selectedYear += 1
		} else {
			selectedMonth += 1
		}
	}

	function prevMonth() {
		if (selectedMonth === 0) {
			selectedMonth = 11
			selectedYear -= 1
		} else {
			selectedMonth -= 1
		}
	}

	let filteredEvents = $derived.by(() => {
		let events = allEvents
		events = events.filter((event) => isEventInMonth(event, selectedMonth, selectedYear))
		if (selectedFilter !== 'all') {
			events = events.filter((event) => event.type === selectedFilter)
		}
		return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
	})
</script>

<svelte:head>
	<title>Calendar - DFL Events | IIIT Hyderabad</title>
	<meta
		name="description"
		content="Stay updated with upcoming events, deadlines, and activities at the Division of Flexible Learning, IIIT Hyderabad."
	/>
</svelte:head>

<div class="bg-background min-h-screen">
	<div class="border-border-card bg-background-alt border-b">
		<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
			<div class="text-center">
				<h1 class="text-foreground text-3xl font-bold sm:text-4xl lg:text-5xl">
					Event <span class="text-primary">Calendar</span>
				</h1>
				<p class="text-foreground-alt mt-3 text-base sm:mt-4 sm:text-lg">
					Stay updated with upcoming events, deadlines, and activities at DFL
				</p>
			</div>
		</div>
	</div>

	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div class="flex items-center justify-between gap-4">
				<Button.Root
					onclick={prevMonth}
					class="border-border-card text-foreground hover:bg-muted flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 transition-colors"
				>
					<ChevronLeft size={20} />
					<span class="hidden sm:inline">Previous</span>
				</Button.Root>

				<h2 class="text-foreground text-2xl font-bold">
					{monthNames[selectedMonth]}
					{selectedYear}
				</h2>

				<Button.Root
					onclick={nextMonth}
					class="border-border-card text-foreground hover:bg-muted flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 transition-colors"
				>
					<span class="hidden sm:inline">Next</span>
					<ChevronRight size={20} />
				</Button.Root>
			</div>

			<div class="flex items-center justify-end gap-4">
				<label for="filter" class="text-foreground-alt text-sm font-medium"
					>Filter by:</label
				>
				<select
					bind:value={selectedFilter}
					class="border-border-input bg-background text-foreground focus:border-primary focus:ring-primary w-40 rounded-lg border px-4 py-2 focus:ring-1 focus:outline-none"
				>
					<option value="all">All Events</option>
					{#each Object.entries(eventTypes) as [type, config]}
						<option value={type}>{config.label}</option>
					{/each}
				</select>
			</div>
		</div>

		<div class="space-y-6">
			{#if filteredEvents.length > 0}
				{#each filteredEvents as event, index (event.id)}
					<div
						class="bg-background-alt border-border-card shadow-card group rounded-xl border p-6 transition-all duration-300 hover:shadow-lg"
						in:fly={{ y: 20, duration: 400, delay: index * 100, easing: cubicOut }}
					>
						<div
							class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"
						>
							<div class="flex-1">
								<div class="mb-3 flex flex-wrap items-center gap-3">
									<span
										class="flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium {eventTypes[
											event.type
										].color}"
									>
										{eventTypes[event.type].label}
									</span>

									<!-- Days Until -->
									{#if event.isUpcoming}
										{@const daysUntil = getDaysUntil(event.date)}
										{#if daysUntil >= 0}
											<span
												class="text-primary bg-primary/10 rounded-full px-3 py-1 text-xs font-medium"
											>
												{daysUntil === 0
													? 'Today'
													: daysUntil === 1
														? 'Tomorrow'
														: `${daysUntil} days`}
											</span>
										{/if}
									{/if}
								</div>

								<h3 class="text-foreground mb-2 text-xl font-bold">
									{event.title}
								</h3>

								<p class="text-foreground-alt mb-4 leading-relaxed">
									{event.description}
								</p>

								<div class="flex flex-wrap gap-6 text-sm">
									{#if event.time}
										<div class="flex items-center gap-2">
											<Clock size={16} class="text-foreground-alt" />
											<span class="text-foreground-alt"
												>{formatTime(event.time)}</span
											>
										</div>
									{/if}

									<div class="flex items-center gap-2">
										<MapPin size={16} class="text-foreground-alt" />
										<span class="text-foreground-alt">{event.location}</span>
									</div>

									{#if event.participants}
										<div class="flex items-center gap-2">
											<Users size={16} class="text-foreground-alt" />
											<span class="text-foreground-alt"
												>{event.participants} participants</span
											>
										</div>
									{/if}
								</div>
							</div>

							<!-- Event Date Display -->
							<div class="text-center lg:text-right">
								<div class="bg-primary/10 text-primary rounded-lg p-4">
									<div class="text-2xl font-bold">
										{new Date(event.date).getDate()}
									</div>
									<div class="text-sm tracking-wide uppercase">
										{new Date(event.date).toLocaleDateString('en-US', {
											month: 'short',
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			{:else}
				<div
					class="bg-background-alt border-border-card rounded-xl border p-12 text-center"
				>
					<Calendar size={48} class="text-foreground-alt mx-auto mb-4" />
					<h3 class="text-foreground mb-2 text-xl font-bold">No Events Found</h3>
					<p class="text-foreground-alt">
						There are no events scheduled for {monthNames[selectedMonth]}
						{selectedYear}.
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>
