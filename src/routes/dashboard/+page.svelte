<script lang="ts">
	import { enhance } from '$app/forms'
	import { User, LogOut, Settings, FileText, CheckCircle, Clock, XCircle, CreditCard } from 'lucide-svelte'
	import type { PageServerData } from './$types'

	let { data }: { data: PageServerData } = $props()

	function formatDate(date: Date) {
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}).format(new Date(date))
	}

	function getStatusColor(status: string) {
		switch (status) {
			case 'completed':
				return 'text-green-600 bg-green-50 border-green-200'
			case 'pending':
				return 'text-yellow-600 bg-yellow-50 border-yellow-200'
			case 'rejected':
				return 'text-red-600 bg-red-50 border-red-200'
			default:
				return 'text-gray-600 bg-gray-50 border-gray-200'
		}
	}

	function getStatusIcon(status: string) {
		switch (status) {
			case 'completed':
				return CheckCircle
			case 'pending':
				return Clock
			case 'rejected':
				return XCircle
			default:
				return FileText
		}
	}

	function getActionText(status: string, hasPayment: boolean) {
		if (status === 'completed') {
			return 'View Details'
		}
		if (status === 'pending' && !hasPayment) {
			return 'Complete Payment'
		}
		return 'Continue Application'
	}

	function getActionUrl(courseTable: string) {
		return `/courses/${courseTable}/apply`
	}
</script>

<div class="min-h-screen bg-background py-8">
	<div class="container mx-auto max-w-6xl px-4">
		<!-- Header -->
		<div class="mb-8">
			<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 class="text-foreground text-3xl font-bold">
						Welcome back, {data.user.firstname}!
					</h1>
					<p class="text-muted-foreground mt-1">
						Manage your applications and profile settings
					</p>
				</div>
				
				<!-- Action Buttons -->
				<div class="flex flex-row gap-3">
					<a
						href="/dashboard/profile"
						class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border-input bg-background-alt text-foreground hover:bg-muted transition-colors"
					>
						<User class="h-4 w-4" />
						View Profile
					</a>
					
					<form method="post" action="/login?/logout" use:enhance>
						<button
							type="submit"
							class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
						>
							<LogOut class="h-4 w-4" />
							Sign Out
						</button>
					</form>
				</div>
			</div>
		</div>

		<!-- Applications Section -->
		<div class="space-y-6">
			{#if data.applications && data.applications.length > 0}
				<div>
					<h2 class="text-foreground text-2xl font-semibold mb-4 flex items-center gap-2">
						<FileText class="h-6 w-6" />
						Your Applications
					</h2>
					
					<div class="grid gap-4">
						{#each data.applications as application}
						{@const StatusIcon = getStatusIcon(application.status)}
							<div class="bg-background-alt border-border-card rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
								<div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
									<!-- Application Info -->
									<div class="flex-1">
										<div class="flex items-start gap-4">
											<div class="flex-1">
												<h3 class="text-foreground text-lg font-semibold mb-2">
													{application.courseName}
												</h3>
												
												<div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
													<span class="flex items-center gap-1">
														<Clock class="h-4 w-4" />
														Applied: {formatDate(application.submittedAt)}
													</span>
													
													{#if application.paymentReference}
														<span class="flex items-center gap-1">
															<CreditCard class="h-4 w-4" />
															Payment: {application.paymentReference}
														</span>
													{/if}
												</div>
											</div>
											
											<!-- Status Badge -->
											<div class={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(application.status)}`}>
												<StatusIcon class="h-3 w-3" />
												{application.status.charAt(0).toUpperCase() + application.status.slice(1)}
											</div>
										</div>
									</div>
									
									<!-- Action Button -->
									<div class="flex-shrink-0">
										<a
											href={getActionUrl(application.courseTable)}
											class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors font-medium"
										>
											{getActionText(application.status, !!application.paymentReference)}
										</a>
									</div>
								</div>
								
								<!-- Payment Status (if available) -->
								{#if application.paymentReference || application.paymentReceiptUrl}
									<div class="mt-4 pt-4 border-t border-border-card">
										<div class="flex items-center justify-between">
											<span class="text-sm text-muted-foreground">Payment Status:</span>
											<div class="flex items-center gap-2">
												{#if application.paymentReceiptUrl}
													<span class="text-sm text-green-600 font-medium">Paid</span>
													<a
														href={application.paymentReceiptUrl}
														target="_blank"
														class="text-sm text-primary hover:underline"
													>
														View Receipt
													</a>
												{:else if application.paymentReference}
													<span class="text-sm text-yellow-600 font-medium">Processing</span>
													<span class="text-xs text-muted-foreground">Ref: {application.paymentReference}</span>
												{:else}
													<span class="text-sm text-red-600 font-medium">Pending</span>
												{/if}
											</div>
										</div>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{:else}
				<!-- No Applications -->
				<div class="text-center py-12">
					<div class="bg-background-alt border-border-card rounded-lg border p-8">
						<FileText class="h-16 w-16 text-muted-foreground mx-auto mb-4" />
						<h3 class="text-foreground text-xl font-semibold mb-2">No Applications Yet</h3>
						<p class="text-muted-foreground mb-6">
							You haven't submitted any applications. Explore our courses and apply for programs that interest you.
						</p>
						<div class="flex flex-col sm:flex-row gap-3 justify-center">
							<a
								href="/courses"
								class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors font-medium"
							>
								<FileText class="h-4 w-4" />
								Browse Courses
							</a>
							<a
								href="/admissions"
								class="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border-input bg-background-alt text-foreground hover:bg-muted transition-colors font-medium"
							>
								<Settings class="h-4 w-4" />
								Admission Information
							</a>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Quick Actions -->
		<div class="mt-8">
			<h2 class="text-foreground text-xl font-semibold mb-4">Quick Actions</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<a
					href="/dashboard/profile"
					class="bg-background-alt border-border-card rounded-lg border p-4 hover:shadow-md transition-shadow group"
				>
					<div class="flex items-center gap-3">
						<div class="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
							<User class="h-5 w-5" />
						</div>
						<div>
							<h3 class="text-foreground font-medium">Profile Settings</h3>
							<p class="text-muted-foreground text-sm">Update your personal information</p>
						</div>
					</div>
				</a>
				
				<a
					href="/courses"
					class="bg-background-alt border-border-card rounded-lg border p-4 hover:shadow-md transition-shadow group"
				>
					<div class="flex items-center gap-3">
						<div class="p-2 rounded-lg bg-green-50 text-green-600 group-hover:bg-green-100 transition-colors">
							<FileText class="h-5 w-5" />
						</div>
						<div>
							<h3 class="text-foreground font-medium">Explore Courses</h3>
							<p class="text-muted-foreground text-sm">Discover new learning opportunities</p>
						</div>
					</div>
				</a>
				
				<a
					href="/admissions"
					class="bg-background-alt border-border-card rounded-lg border p-4 hover:shadow-md transition-shadow group"
				>
					<div class="flex items-center gap-3">
						<div class="p-2 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-100 transition-colors">
							<Settings class="h-5 w-5" />
						</div>
						<div>
							<h3 class="text-foreground font-medium">Admission Info</h3>
							<p class="text-muted-foreground text-sm">Learn about admission process</p>
						</div>
					</div>
				</a>
			</div>
		</div>
	</div>
</div>
