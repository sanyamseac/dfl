<script lang="ts">
	import { enhance } from '$app/forms'
	import { Button, Select } from 'bits-ui'
	import {
		User,
		Phone,
		MapPin,
		Calendar,
		ChevronDown,
		CheckCircle,
		AlertCircle,
	} from 'lucide-svelte'
	import type { ActionData, PageServerData } from './$types'
	import { invalidateAll } from '$app/navigation'
	import { PinInput, REGEXP_ONLY_DIGITS_AND_CHARS, type PinInputRootSnippetProps } from 'bits-ui'
	import cn from 'clsx'
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte'

	let value = $state('')
	let currentDigiPin = $state('')
	let permanentAddress = $state('')
	let currentAddress = $state('')
	let open = $state(false)

	function processDigiPin(inputValue: string): string {
		const cleanValue = inputValue.replace(/[^a-zA-Z0-9]/g, '')
		return cleanValue.slice(0, 10)
	}

	function formatDigiPin(cleanValue: string): string {
		if (cleanValue.length <= 3) return cleanValue
		if (cleanValue.length <= 6) return `${cleanValue.slice(0, 3)}-${cleanValue.slice(3)}`
		return `${cleanValue.slice(0, 3)}-${cleanValue.slice(3, 6)}-${cleanValue.slice(6)}`
	}

	function copyPermanentToCurrent() {
		currentAddress = permanentAddress
		currentDigiPin = value
	}

	function handlePinPaste(event: ClipboardEvent, pinType: 'permanent' | 'current') {
		event.preventDefault()
		const pastedText = event.clipboardData?.getData('text') || ''
		const processedValue = processDigiPin(pastedText)
		if (pinType === 'permanent') value = processedValue
		else currentDigiPin = processedValue
	}

	type CellProps = PinInputRootSnippetProps['cells'][0]

	let { data }: { data: PageServerData } = $props()
	let message = $state<string | null>(null)
	let selectedGender = $state('')
	let selectedDate = $state('')
	let loading = $state(false)
	let formRef: HTMLFormElement
	function parseDateFromDB(dateString: string): Date {
		return new Date(dateString + 'T00:00:00')
	}

	$effect(() => {
		if (data.userDetails) {
			selectedDate = data.userDetails.dateOfBirth
		}
	})
</script>

<svelte:head>
	<title>Profile - {data.user.firstname} - DFL IIIT</title>
	<meta name="description" content="Manage your profile information" />
</svelte:head>

{#snippet Cell(cell: CellProps)}
	<PinInput.Cell
		{cell}
		class={cn(
			'focus-override',
			'relative h-8 w-6 text-lg md:h-10 md:w-8',
			'flex items-center justify-center',
			'transition-all duration-75',
			'border-foreground/20 border-y border-r first:rounded-l-md first:border-l last:rounded-r-md',
			'text-foreground group-focus-within/pininput:border-primary group-hover/pininput:border-primary',
			'outline-0',
			'data-active:outline-primary data-active:outline-1',
		)}
	>
		{#if cell.char !== null}
			<div>
				{cell.char}
			</div>
		{/if}
		{#if cell.hasFakeCaret}
			<div
				class="animate-caret-blink pointer-events-none absolute inset-0 flex items-center justify-center"
			>
				<div class="h-6 w-px bg-white"></div>
			</div>
		{/if}
	</PinInput.Cell>
{/snippet}

<ConfirmDialog
	{open}
	title="Confirm Profile Update"
	description="You will not be able to edit these details. Are you sure you want to save these profile details?"
	onClose={() => (open = false)}
	onConfirm={() => {
		formRef.requestSubmit()
		open = false
	}}
	confirmText="Save Changes"
	cancelText="Cancel"
	variant="primary"
	{loading}
/>

<div class="bg-background min-h-screen px-4 py-8 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-4xl">
		<div class="flex flex-col gap-4">
			<div class="border-b py-2 md:py-4">
				<h2 class="text-foreground mb-1 text-xl font-semibold">
					{data.user.firstname}
					{data.user.lastname || ''}
				</h2>
				<p class="text-foreground-alt text-sm">{data.user.email}</p>
				<p class="text-muted-foreground text-xs">ID: {data.user.id}</p>
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
								<span class="text-foreground"
									>{parseDateFromDB(
										data.userDetails.dateOfBirth,
									).toLocaleDateString()}</span
								>
							</div>

							<div class="flex items-center justify-between border-b pb-2">
								<span class="text-foreground text-sm font-medium">Gender</span>
								<span class="text-foreground capitalize"
									>{data.userDetails.gender}</span
								>
							</div>

							<div class="flex flex-col gap-2 border-b pb-2">
								<span class="text-foreground text-sm font-medium"
									>Permanent Address</span
								>
								<span class="text-foreground whitespace-pre"
									>{data.userDetails.permanentAddress}</span
								>
							</div>

							{#if data.userDetails.permanentDigipin}
								<div class="flex flex-col gap-2 border-b pb-2">
									<span class="text-foreground text-sm font-medium"
										>Permanent DigiPin</span
									>
									<span class="text-foreground whitespace-pre"
										>{data.userDetails.permanentDigipin}</span
									>
								</div>
							{/if}

							<div class="flex flex-col gap-2 border-b pb-2">
								<span class="text-foreground text-sm font-medium"
									>Current Address</span
								>
								<span class="text-foreground whitespace-pre"
									>{data.userDetails.currentAddress}</span
								>
							</div>

							{#if data.userDetails.currentDigipin}
								<div class="flex flex-col gap-2 border-b pb-2">
									<span class="text-foreground text-sm font-medium"
										>Current DigiPin</span
									>
									<span class="text-foreground whitespace-pre"
										>{data.userDetails.currentDigipin}</span
									>
								</div>
							{/if}
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
							use:enhance={() => {
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
								}
							}}
							class="space-y-4"
							bind:this={formRef}
						>
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
										bind:value={selectedDate}
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
							</div>

							<div class="space-y-4">
								<div>
									<label
										for="permanentAddress"
										class="text-foreground text-sm font-medium"
									>
										Permanent Address*
									</label>
									<textarea
										id="permanentAddress"
										name="permanentAddress"
										bind:value={permanentAddress}
										required
										rows="3"
										placeholder="Enter your permanent address including city, state, and pincode"
										class="focus:ring-primary bg-background-alt border-border-input text-foreground placeholder:text-muted-foreground w-full resize-none rounded-md border px-3 py-1 transition duration-200 focus:ring-2 focus:outline-none"
									></textarea>

									<div class="mt-2">
										<label
											for="digipin"
											class="text-foreground mb-2 block text-sm font-medium"
										>
											DigiPin (Optional)
										</label>
										<PinInput.Root
											bind:value
											onpaste={(e) => handlePinPaste(e, 'permanent')}
											class="group/pininput text-foreground flex items-center has-disabled:opacity-30"
											maxlength={10}
											pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
											inputmode="text"
										>
											{#snippet children({ cells })}
												<div class="flex">
													{#each cells.slice(0, 3) as cell, i (i)}
														{@render Cell(cell)}
													{/each}
												</div>

												<div class="flex w-6 items-center justify-center">
													<div
														class="bg-foreground h-1 w-2 rounded-full"
													></div>
												</div>

												<div class="flex">
													{#each cells.slice(3, 6) as cell, i (i)}
														{@render Cell(cell)}
													{/each}
												</div>

												<div class="flex w-6 items-center justify-center">
													<div
														class="bg-foreground h-1 w-2 rounded-full"
													></div>
												</div>

												<div class="flex">
													{#each cells.slice(6, 10) as cell, i (i)}
														{@render Cell(cell)}
													{/each}
												</div>
											{/snippet}
										</PinInput.Root>
										<input
											type="hidden"
											name="digipin"
											value={formatDigiPin(value)}
										/>
										<span class="text-muted-foreground text-xs">
											Find your digipin <a
												href="https://dac.indiapost.gov.in/mydigipin"
												class="cursor-pointer underline"
											>
												here
											</a>
										</span>
									</div>

									<span class="text-muted-foreground text-xs">
										Please provide your complete permanent address for
										verification purposes.
									</span>
								</div>

								<div>
									<div class="mb-2 flex items-center justify-between">
										<label
											for="currentAddress"
											class="text-foreground text-sm font-medium"
										>
											Current Address*
										</label>
										<Button.Root
											type="button"
											onclick={copyPermanentToCurrent}
											class="bg-muted text-foreground hover:bg-muted/80 rounded-md px-2 py-1 text-xs transition-colors duration-200"
										>
											Same as permanent
										</Button.Root>
									</div>
									<textarea
										id="currentAddress"
										name="currentAddress"
										bind:value={currentAddress}
										required
										rows="3"
										placeholder="Enter your current address"
										class="dark-scroll focus:ring-primary bg-background-alt border-border-input text-foreground placeholder:text-muted-foreground w-full resize-none rounded-md border px-3 py-2 transition duration-200 focus:ring-2 focus:outline-none"
									></textarea>

									<div class="mt-2">
										<label
											for="currentDigipin"
											class="text-foreground mb-2 block text-sm font-medium"
										>
											DigiPin (Optional)
										</label>
										<PinInput.Root
											bind:value={currentDigiPin}
											onpaste={(e) => handlePinPaste(e, 'current')}
											class="group/pininput text-foreground flex items-center has-disabled:opacity-30"
											maxlength={10}
											pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
											inputmode="text"
										>
											{#snippet children({ cells })}
												<div class="flex">
													{#each cells.slice(0, 3) as cell, i (i)}
														{@render Cell(cell)}
													{/each}
												</div>

												<div class="flex w-6 items-center justify-center">
													<div
														class="bg-foreground h-1 w-2 rounded-full"
													></div>
												</div>

												<div class="flex">
													{#each cells.slice(3, 6) as cell, i (i)}
														{@render Cell(cell)}
													{/each}
												</div>

												<div class="flex w-6 items-center justify-center">
													<div
														class="bg-foreground h-1 w-2 rounded-full"
													></div>
												</div>

												<div class="flex">
													{#each cells.slice(6, 10) as cell, i (i)}
														{@render Cell(cell)}
													{/each}
												</div>
											{/snippet}
										</PinInput.Root>
										<input
											type="hidden"
											name="currentDigipin"
											value={formatDigiPin(currentDigiPin)}
										/>
									</div>
								</div>
							</div>
						</form>
						<div class="pt-6">
							<Button.Root
								type="submit"
								disabled={loading}
								onclick={() => (open = true)}
								class="bg-primary text-background shadow-btn inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-2 font-medium transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
							>
								{loading ? 'Saving Profile...' : 'Save Profile Details'}
							</Button.Root>
						</div>
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
	/* Dark mode compatible scrollbar */
	.dark-scroll {
		scrollbar-width: thin;
		scrollbar-color: hsl(var(--muted-foreground)) hsl(var(--background-alt));
	}

	.dark-scroll::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	.dark-scroll::-webkit-scrollbar-track {
		background: hsl(var(--background-alt));
		border-radius: 4px;
	}

	.dark-scroll::-webkit-scrollbar-thumb {
		background: hsl(var(--muted-foreground));
		border-radius: 4px;
		border: 1px solid hsl(var(--background-alt));
	}

	.dark-scroll::-webkit-scrollbar-thumb:hover {
		background: hsl(var(--foreground) / 0.6);
	}

	.dark-scroll::-webkit-scrollbar-corner {
		background: hsl(var(--background-alt));
	}

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
