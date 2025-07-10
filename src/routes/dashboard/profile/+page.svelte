<script lang="ts">
	import { enhance } from '$app/forms'
	import { Button, Select } from 'bits-ui'
	import { User, ChevronDown, AlertCircle, Upload, FileText } from 'lucide-svelte'
	import type { ActionData, PageServerData } from './$types'
	import { invalidateAll } from '$app/navigation'
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte'

	let open = $state(false)
	let profileImage = $state<File | null>(null)
	let profileImagePreview = $state<string | null>(null)
	let fileInputRef: HTMLInputElement

	let { data }: { data: PageServerData } = $props()
	let message = $state<string | null>(null)
	let selectedGender = $state('')
	let selectedIdType = $state('')
	let loading = $state(false)
	let formRef: HTMLFormElement

	function parseDateFromDB(dateString: string): Date {
		return new Date(dateString + 'T00:00:00')
	}

	function handleImageUpload(event: Event) {
		const target = event.target as HTMLInputElement
		const file = target.files?.[0]
		if (file) {
			if (file.size > 5 * 1024 * 1024) {
				message = 'Image size must be less than 5MB'
				return
			}
			if (!file.type.startsWith('image/')) {
				message = 'Please select a valid image file'
				return
			}
			profileImage = file
			const reader = new FileReader()
			reader.onload = (e) => {
				profileImagePreview = e.target?.result as string
			}
			reader.readAsDataURL(file)
		}
	}

	function handleIdDocumentUpload(event: Event) {
		const target = event.target as HTMLInputElement
		const file = target.files?.[0]
		if (file) {
			if (file.size > 5 * 1024 * 1024) {
				message = 'ID document size must be less than 5MB'
				return
			}
			if (file.type !== 'application/pdf') {
				message = 'Please select a valid PDF file'
				return
			}
		}
	}
</script>

<svelte:head>
	<title>Profile - {data.user.firstname} - DFL IIIT</title>
	<meta name="description" content="Manage your profile information" />
</svelte:head>

<ConfirmDialog
	{open}
	title="Confirm Profile Update"
	description="You will not be able to edit these details. Are you sure you want to save these profile details?"
	onClose={() => (open = false)}
	onConfirm={() => formRef.requestSubmit()}
	confirmText="Save Changes"
	cancelText="Cancel"
	variant="primary"
	{loading}
/>

<div class="bg-background min-h-screen px-4 py-8 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-4xl">
		<div class="flex flex-col gap-4">
			<div class="border-b py-2 md:py-4">
				<div class="flex items-center gap-4">
					{#if data.userDetails?.imageUrl}
						<img
							src={data.userDetails.imageUrl}
							alt="Profile"
							class="border-border-input h-16 w-16 rounded-full border-2 object-cover"
						/>
					{:else}
						<div
							class="bg-muted flex h-16 w-16 items-center justify-center rounded-full"
						>
							<User class="text-muted-foreground h-8 w-8" />
						</div>
					{/if}
					<div>
						<h2 class="text-foreground mb-1 text-xl font-semibold">
							{data.user.firstname}
							{data.user.lastname || ''}
						</h2>
						<p class="text-foreground-alt text-sm">{data.user.email}</p>
						<p class="text-muted-foreground text-xs">ID: {data.user.id}</p>
					</div>
				</div>
			</div>

			<!-- Profile Details -->
			<div class="lg:col-span-2">
				{#if data.userDetails}
					<div class="">
						<div class="mb-6 flex items-center justify-between">
							<h2 class="text-foreground text-2xl font-semibold">Profile Details</h2>
						</div>
						<div class="grid gap-6 md:grid-cols-2">
							<div class="flex items-center justify-between border-b pb-2">
								<span class="text-foreground text-sm font-medium">Phone Number</span
								>
								<span class="text-foreground">{data.userDetails.phone}</span>
							</div>

							<div class="flex items-center justify-between border-b pb-2">
								<span class="text-foreground text-sm font-medium"
									>Date of Birth</span
								>
								<span class="text-foreground">
									{parseDateFromDB(
										data.userDetails.dateOfBirth,
									).toLocaleDateString()}
								</span>
							</div>

							<div class="flex items-center justify-between border-b pb-2">
								<span class="text-foreground text-sm font-medium">Gender</span>
								<span class="text-foreground capitalize"
									>{data.userDetails.gender}</span
								>
							</div>

							<div class="flex items-center justify-between border-b pb-2">
								<span class="text-foreground text-sm font-medium">ID Type</span>
								<span class="text-foreground capitalize">
									{data.userDetails.idType}
								</span>
							</div>

							<div class="flex items-center justify-between border-b pb-2">
								<span class="text-foreground text-sm font-medium">ID Code</span>
								<span class="text-foreground">{data.userDetails.idNumber}</span>
							</div>

							<div class="flex items-center justify-between border-b pb-2">
								<span class="text-foreground text-sm font-medium">ID Document</span>
								<a
									href={`/content/userIdFiles/${data.user.id}.pdf`}
									target="_blank"
									class="text-primary hover:text-primary/80 text-sm underline"
								>
									View Document
								</a>
							</div>
						</div>
					</div>
				{:else}
					<div
						class="bg-background-alt shadow-card border-border-card rounded-lg border p-6"
					>
						<div class="mb-6">
							<h2
								class="text-foreground mb-2 flex items-center gap-2 gap-4 text-2xl font-semibold"
							>
								<AlertCircle class="text-warning h-5 w-5" />
								Complete Your Profile
							</h2>
							<p class="text-foreground-alt">
								Add your personal details to complete your profile setup.
							</p>
						</div>

						<form
							method="post"
							action="?/addDetails"
							enctype="multipart/form-data"
							use:enhance={(e) => {
								if (!open) {
									e.cancel()
									open = true
									return
								}
								loading = true
								return async ({ result }) => {
									if (result.type === 'success') {
										invalidateAll()
									} else if (result.type === 'failure') {
										message =
											(result.data as { message?: string })?.message ??
											'An error occurred while saving your profile details.'
									}
									loading = false
									open = false
								}
							}}
							class="space-y-4"
							bind:this={formRef}
						>
							<div class="space-y-4">
								<div class="text-center">
									<label
										for="image"
										class="text-foreground mb-4 block text-sm font-medium"
									>
										Upload Picture*
									</label>

									<div class="relative mx-auto inline-block">
										{#if profileImagePreview}
											<img
												src={profileImagePreview}
												alt="Profile preview"
												class="border-border-input h-32 w-32 rounded-full border-4 object-cover"
											/>
										{:else}
											<div
												class="bg-muted border-border-input mx-auto flex h-32 w-32 items-center justify-center rounded-full border-4 border-dashed"
											>
												<Upload class="text-muted-foreground h-8 w-8" />
											</div>
										{/if}
										<input
											type="file"
											bind:this={fileInputRef}
											onchange={handleImageUpload}
											accept="image/*"
											name="image"
											id="image"
											class="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
											required
										/>
									</div>

									<p class="text-muted-foreground mt-2 text-xs">
										Max size: 5MB. Supports all image formats.
									</p>
									<p class="text-foreground-alt mt-1 text-xs">
										Please upload a clear, recent photo of yourself.
									</p>
								</div>
							</div>

							<div class="grid gap-4 md:grid-cols-2">
								<div class="space-y-2">
									<label for="phone" class="text-foreground text-sm font-medium">
										Phone Number*
									</label>
									<input
										type="tel"
										id="phone"
										name="phone"
										required
										inputmode="tel"
										pattern="^\+\d\{(1, 3)}\s?\d\{(4, 14)}$"
										placeholder="+91 1234567890"
										class="focus:ring-primary bg-background-alt border-border-input text-foreground placeholder:text-muted-foreground w-full rounded-md border px-3 py-2 transition duration-200 focus:ring-2 focus:outline-none"
										title="Include country code, e.g. +1 5551234567"
									/>
									<span class="text-muted-foreground text-xs">
										Please include your country code (e.g. +1 5551234567).
									</span>
								</div>

								<div class="space-y-2">
									<label
										for="dateofbirth"
										class="text-foreground text-sm font-medium"
									>
										Date of Birth*
									</label>
									<input
										type="date"
										id="dateofbirth"
										name="dateOfBirth"
										required
										max={new Date().toISOString().split('T')[0]}
										class="focus:ring-primary bg-background-alt border-border-input text-foreground w-full rounded-md border px-3 py-1 transition duration-200 focus:ring-2 focus:outline-none"
									/>
								</div>

								<div class="space-y-2">
									<label for="gender" class="text-foreground text-sm font-medium">
										Gender*
									</label>
									<Select.Root type="single" bind:value={selectedGender}>
										<Select.Trigger
											class="focus:ring-primary bg-background-alt border-border-input text-foreground data-[state=open]:ring-primary flex w-full items-center justify-between rounded-md border px-3 py-2 capitalize transition duration-200 focus:ring-2 focus:outline-none data-[state=open]:ring-2 {selectedGender
												? ''
												: 'text-muted-foreground'}"
										>
											{selectedGender || 'Select your gender'}
											<ChevronDown
												class="text-muted-foreground h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180"
											/>
										</Select.Trigger>
										<Select.Content
											class="border-border-card bg-background-alt text-foreground shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=top]:slide-in-from-bottom-2 z-50 h-max max-h-[var(--bits-select-content-available-height)] w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)] overflow-hidden rounded-md rounded-xl border px-1 py-3 outline-hidden select-none data-[side=top]:-translate-y-1"
										>
											<Select.Item
												value="Male"
												class="focus:bg-muted focus:text-foreground hover:bg-muted relative flex w-full cursor-default items-center rounded-sm py-1 pr-2 pl-3 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
											>
												Male
											</Select.Item>
											<Select.Item
												value="Female"
												class="focus:bg-muted focus:text-foreground hover:bg-muted relative flex w-full cursor-default items-center rounded-sm py-1 pr-2 pl-3 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
											>
												Female
											</Select.Item>
											<Select.Item
												value="Other"
												class="focus:bg-muted focus:text-foreground hover:bg-muted relative flex w-full cursor-default items-center rounded-sm py-1 pr-2 pl-3 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
											>
												Others
											</Select.Item>
										</Select.Content>
										<input
											type="hidden"
											name="gender"
											value={selectedGender || ''}
										/>
									</Select.Root>
								</div>

								<div class="space-y-2">
									<label for="idType" class="text-foreground text-sm font-medium">
										ID Type*
									</label>
									<Select.Root type="single" bind:value={selectedIdType}>
										<Select.Trigger
											class="focus:ring-primary bg-background-alt border-border-input text-foreground data-[state=open]:ring-primary flex w-full items-center justify-between rounded-md border px-3 py-2 capitalize transition duration-200 focus:ring-2 focus:outline-none data-[state=open]:ring-2 {selectedIdType
												? ''
												: 'text-muted-foreground'}"
										>
											{selectedIdType || 'Select ID type'}
											<ChevronDown
												class="text-muted-foreground h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180"
											/>
										</Select.Trigger>
										<Select.Content
											class="border-border-card bg-background-alt text-foreground shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=top]:slide-in-from-bottom-2 z-50 h-max max-h-[var(--bits-select-content-available-height)] w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)] overflow-hidden rounded-md rounded-xl border px-1 py-3 outline-hidden select-none data-[side=top]:-translate-y-1"
										>
											<Select.Item
												value="aadhar"
												class="focus:bg-muted focus:text-foreground hover:bg-muted relative flex w-full cursor-default items-center rounded-sm py-1 pr-2 pl-3 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
											>
												Aadhar
											</Select.Item>
											<Select.Item
												value="passport"
												class="focus:bg-muted focus:text-foreground hover:bg-muted relative flex w-full cursor-default items-center rounded-sm py-1 pr-2 pl-3 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
											>
												Passport
											</Select.Item>
											<Select.Item
												value="others"
												class="focus:bg-muted focus:text-foreground hover:bg-muted relative flex w-full cursor-default items-center rounded-sm py-1 pr-2 pl-3 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
											>
												Others
											</Select.Item>
										</Select.Content>
									</Select.Root>
								</div>

								<div
									class="space-y-2 {selectedIdType === 'others' ? '' : 'hidden'}"
								>
									<label
										for="customIdType"
										class="text-foreground text-sm font-medium"
									>
										Specify ID Type*
									</label>
									<input
										type="text"
										id="idType"
										name="idType"
										value={selectedIdType === 'others' ? '' : selectedIdType}
										required
										placeholder="Enter ID type (e.g., Voter ID, Driving License)"
										class="focus:ring-primary bg-background-alt border-border-input text-foreground placeholder:text-muted-foreground w-full rounded-md border px-3 py-2 transition duration-200 focus:ring-2 focus:outline-none"
									/>
								</div>

								<div class="space-y-2">
									<label
										for="idNumber"
										class="text-foreground text-sm font-medium"
									>
										ID Code/Number*
									</label>
									<input
										type="text"
										id="idNumber"
										name="idNumber"
										required
										placeholder="Enter your ID number"
										class="focus:ring-primary bg-background-alt border-border-input text-foreground placeholder:text-muted-foreground w-full rounded-md border px-3 py-2 transition duration-200 focus:ring-2 focus:outline-none"
									/>
								</div>

								<div class="space-y-2 md:col-span-2">
									<label
										for="idDocument"
										class="text-foreground text-sm font-medium"
									>
										Upload ID Document (PDF)*
									</label>

									<div class="flex flex-col gap-2">
										<div class="relative">
											<input
												type="file"
												onchange={handleIdDocumentUpload}
												accept="application/pdf"
												name="idDocument"
												id="idDocument"
												class="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
												required
											/>
											<div
												class="bg-background-alt border-border-input hover:border-primary focus-within:ring-primary text-foreground flex items-center justify-between rounded-md border px-4 py-3 transition-all duration-200 focus-within:ring-2"
											>
												<div class="flex items-center gap-3">
													<FileText
														class="text-muted-foreground h-5 w-5"
													/>
													<span
														class="text-muted-foreground text-sm"
														id="file-selected"
													>
														No file selected
													</span>
												</div>
												<span
													class="bg-muted text-foreground rounded-md px-3 py-1.5 text-xs font-medium"
												>
													Browse
												</span>
											</div>
										</div>
										<script>
											document
												.getElementById('idDocument')
												?.addEventListener('change', (e) => {
													const fileName =
														e.target.files?.[0]?.name ||
														'No file selected'
													document.getElementById(
														'file-selected',
													).textContent = fileName
												})
										</script>
									</div>
									<p class="text-muted-foreground mt-2 text-xs">
										Max size: 5MB. PDF format only.
									</p>
									<p class="text-foreground-alt mt-1 text-xs">
										Please upload a clear scan or photo of your ID document.
									</p>
								</div>
							</div>
							<div class="pt-6">
								<Button.Root
									type="submit"
									disabled={loading}
									class="bg-primary shadow-btn inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-2 font-medium text-white transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
								>
									{loading ? 'Saving Profile...' : 'Save Profile Details'}
								</Button.Root>
							</div>
						</form>

						{#if message}
							<span class="text-destructive mb-4 block text-sm">
								{message}
							</span>
						{/if}
					</div>
				{/if}
			</div>
		</div>

		<!-- Helper Text -->
		<div class="text-muted-foreground mt-8 text-center text-xs">
			<p>
				Your profile information is secure and will only be used for application processing.
			</p>
		</div>
	</div>
</div>

<style>
	input[type='date']::-webkit-calendar-picker-indicator {
		background-color: var(--primary);
		border-radius: 0.25rem;
		padding: 0.25rem;
		cursor: pointer;
		margin-left: 0.5rem;
		transition: all 0.2s ease;
	}

	input[type='date']::-webkit-calendar-picker-indicator:hover {
		background-color: var(--primary-hover);
		transform: scale(1.05);
	}

	input[type='date']::-webkit-datetime-edit {
		padding: 0.25rem 0;
	}

	input[type='date']::-webkit-datetime-edit-text {
		color: var(--text-muted);
		padding: 0 0.25rem;
	}

	input[type='date']::-webkit-datetime-edit-month-field,
	input[type='date']::-webkit-datetime-edit-day-field,
	input[type='date']::-webkit-datetime-edit-year-field {
		padding: 0.25rem 0.125rem;
		border-radius: 0.25rem;
		transition: background-color 0.2s ease;
	}

	input[type='date']::-webkit-datetime-edit-month-field:focus,
	input[type='date']::-webkit-datetime-edit-day-field:focus,
	input[type='date']::-webkit-datetime-edit-year-field:focus {
		background-color: var(--primary);
		color: white;
		outline: none;
	}

	/* Firefox */
	input[type='date']::-moz-calendar-picker-indicator {
		background-color: var(--primary);
		border-radius: 0.25rem;
		padding: 0.25rem;
		cursor: pointer;
		margin-left: 0.5rem;
		transition: all 0.2s ease;
	}

	input[type='date']::-moz-calendar-picker-indicator:hover {
		background-color: var(--primary-hover);
	}

	/* Placeholder styling */
	input[type='date']::placeholder {
		color: var(--text-muted);
		opacity: 1;
	}
</style>
