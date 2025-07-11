<script lang="ts">
	import { enhance } from '$app/forms'
	import { Upload, FileText, CheckCircle, Clock, AlertCircle, ChevronDown, Check } from 'lucide-svelte'
	import { Checkbox, Select } from 'bits-ui'
	import type { PageData } from './$types'
	import { invalidateAll } from '$app/navigation'

	let { data }: { data: PageData } = $props()

	const semesterOptions = [
		{ value: '5', label: 'Semester 5' },
		{ value: '6', label: 'Semester 6' }
	]
	
	let selectedSemester = $state('')
	let selectedGraduationYear = $state('')
	let declarationAccepted = $state(false)
	let signaturePreview = $state<string | null>(null)

	let idDocument = $state<File | null>(null)
	let cgpaDocument = $state<File | null>(null)
	let signatureDocument = $state<File | null>(null)

	let loading = $state(false)
	let message = $state<string | null>(null)

	const existingApplication = $derived(data.application)

	$effect(() => {
		if (existingApplication?.mmlMinor) {
			const app = existingApplication.mmlMinor
			selectedSemester = app.semester.toString()
			selectedGraduationYear = app.expectedGradutionYear.toString()
		}
	})

	function handleFileUpload(event: Event, fileType: 'id' | 'cgpa' | 'signature') {
		const target = event.target as HTMLInputElement
		const file = target.files?.[0]
		if (file) {
			if (file.size > 5 * 1024 * 1024) {
				message = 'File size must be less than 5MB'
				return
			}
			
			// Validate file type based on document type
			if (fileType === 'signature' && !file.type.startsWith('image/')) {
				message = 'Signature must be an image file'
				return
			}
			
			if (fileType !== 'signature' && !file.type.includes('pdf') && !file.type.startsWith('image/')) {
				message = 'Document must be a PDF or image file'
				return
			}

			switch (fileType) {
				case 'id':
					idDocument = file
					break
				case 'cgpa':
					cgpaDocument = file
					break
				case 'signature':
					signatureDocument = file
					// Create preview for signature
					const reader = new FileReader()
					reader.onload = (e) => {
						signaturePreview = e.target?.result as string
					}
					reader.readAsDataURL(file)
					break
			}
			message = null
		}
	}

	const currentYear = new Date().getFullYear() + 1
	const yearOptions = Array.from({ length: 5 }, (_, i) => ({
		value: (currentYear + i).toString(),
		label: (currentYear + i).toString()
	}))
</script>

<div class="min-h-screen bg-background py-8">
	<div class="container mx-auto max-w-4xl px-4">
		<div class="bg-background-alt border-border-card rounded-lg border p-8 shadow-sm">
			<div class="mb-8">
				<h1 class="text-foreground mb-2 text-3xl font-bold">MML Minor Program Application</h1>
				<p class="text-muted-foreground">
					Complete your application for the Modern Machine Learning Minor program
				</p>
			</div>

			{#if existingApplication?.mmlMinor}
				<div class="bg-green-50 border-green-200 mb-6 rounded-lg border p-4">
					<div class="flex items-center gap-2 mb-2">
						<CheckCircle class="h-5 w-5 text-green-600" />
						<h3 class="text-green-800 font-semibold">Application Submitted</h3>
					</div>
					<p class="text-green-700 text-sm">
						Your application has been submitted successfully. The details are shown below for your reference.
					</p>
				</div>

				<div class="space-y-6">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label for="institution-display" class="text-foreground block text-sm font-medium mb-2">Institution</label>
							<div id="institution-display" class="bg-muted text-foreground p-3 rounded-md">
								{existingApplication.mmlMinor.institution}
							</div>
						</div>
						<div>
							<label for="major-display" class="text-foreground block text-sm font-medium mb-2">Major</label>
							<div id="major-display" class="bg-muted text-foreground p-3 rounded-md">
								{existingApplication.mmlMinor.major}
							</div>
						</div>
						<div>
							<label for="discipline-display" class="text-foreground block text-sm font-medium mb-2">Discipline</label>
							<div id="discipline-display" class="bg-muted text-foreground p-3 rounded-md">
								{existingApplication.mmlMinor.discipline}
							</div>
						</div>
						<div>
							<label for="semester-display" class="text-foreground block text-sm font-medium mb-2">Current Semester</label>
							<div id="semester-display" class="bg-muted text-foreground p-3 rounded-md">
								{existingApplication.mmlMinor.semester}
							</div>
						</div>
						<div>
							<label for="id-number-display" class="text-foreground block text-sm font-medium mb-2">ID Number</label>
							<div id="id-number-display" class="bg-muted text-foreground p-3 rounded-md">
								{existingApplication.mmlMinor.idNumber}
							</div>
						</div>
						<div>
							<label for="id-document" class="text-foreground block text-sm font-medium mb-2">Student ID Document</label>
							<div id="id-document" class="bg-muted text-foreground p-3 rounded-md">
								<a href="/{existingApplication.mmlMinor.idUrl}" target="_blank" class="text-blue-600 hover:underline">
									View ID Document
								</a>
							</div>
						</div>
						<div>
							<label for="cgpa-display" class="text-foreground block text-sm font-medium mb-2">CGPA</label>
							<div id="cgpa-display" class="bg-muted text-foreground p-3 rounded-md">
								{existingApplication.mmlMinor.cgpa}
							</div>
						</div>
						<div>
							<label for="cgpa-document" class="text-foreground block text-sm font-medium mb-2">CGPA Document</label>
							<div id="cgpa-document" class="bg-muted text-foreground p-3 rounded-md">
								<a href="/{existingApplication.mmlMinor.cgpaDocumentUrl}" target="_blank" class="text-blue-600 hover:underline">
									View CGPA Document
								</a>
							</div>
						</div>
						<div>
							<label for="graduation-year-display" class="text-foreground block text-sm font-medium mb-2">Expected Graduation Year</label>
							<div id="graduation-year-display" class="bg-muted text-foreground p-3 rounded-md">
								{existingApplication.mmlMinor.expectedGradutionYear}
							</div>
						</div>
						<div>
							<label for="signature-display" class="text-foreground block text-sm font-medium mb-2">Signature</label>
							<img src="/{existingApplication.mmlMinor.SignatureUrl}" alt="Signature" class="max-h-32 max-w-full rounded border border-border-input bg-white p-2" />
						</div>
					</div>

					<div class="bg-blue-50 border-blue-200 rounded-lg border p-6 mt-8">
						<div class="flex items-center gap-2 mb-3">
							<Clock class="h-5 w-5 text-blue-600" />
							<h3 class="text-blue-800 font-semibold">Next Steps</h3>
						</div>
						<p class="text-blue-700 mb-4">
							Your application details are submitted. The next step is to complete the fee payment.
						</p>
						<button 
							class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
						>
							Not Yet Started. Please visit on or after 20th July
						</button>
					</div>
				</div>
			{:else}
				<form
					action="?/apply"
					method="post"
					enctype="multipart/form-data"
					use:enhance={() => {
						loading = true
						return ({ result }) => {
							loading = false
							if (result.type === 'success') {
								message = 'Application submitted successfully!'
								invalidateAll()
							} else if (result.type === 'failure') {
								message = (result.data as any)?.message || 'An error occurred during submission.'
							}
						}
					}}
					class="space-y-8"
				>
					<div class="space-y-6">
						<h2 class="text-foreground text-xl font-semibold border-b border-border-card pb-2">
							Academic Information
						</h2>

						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label for="institution" class="text-foreground mb-2 block text-sm font-medium">
									Institute Name*
								</label>
								<input
									type="text"
									id="institution"
									name="institution"
									placeholder="e.g., International Institute of Information Technology, Hyderabad"
									required
									class="focus:ring-primary bg-background-alt border-border-input text-foreground placeholder:text-muted-foreground w-full rounded-md border px-3 py-2 transition duration-200 focus:ring-2 focus:outline-none"
								/>
								<span class="text-muted-foreground text-xs">
									Please provide the full name of your institute.
								</span>
							</div>

							<div>
								<label for="major" class="text-foreground mb-2 block text-sm font-medium">
									Ongoing Degree*
								</label>
								<input
									type="text"
									id="major"
									name="major"
									placeholder="e.g., Bachelor of Technology"
									required
									class="focus:ring-primary bg-background-alt border-border-input text-foreground placeholder:text-muted-foreground w-full rounded-md border px-3 py-2 transition duration-200 focus:ring-2 focus:outline-none"
								/>
								<span class="text-muted-foreground text-xs">
									Please provide the full name of your ongoing degree without discipline.
								</span>
							</div>

							<div>
								<label for="discipline" class="text-foreground mb-2 block text-sm font-medium">
									Discipline*
								</label>
								<input
									type="text"
									id="discipline"
									name="discipline"
									placeholder="e.g., Engineering, Mathematics"
									required
									class="focus:ring-primary bg-background-alt border-border-input text-foreground placeholder:text-muted-foreground w-full rounded-md border px-3 py-2 transition duration-200 focus:ring-2 focus:outline-none"
								/>
							</div>

							<div>
								<label for="idNumber" class="text-foreground mb-2 block text-sm font-medium">
									Student ID Number/Code*
								</label>
								<input
									type="text"
									id="idNumber"
									name="idNumber"
									placeholder="e.g., 2021101001"
									required
									class="focus:ring-primary bg-background-alt border-border-input text-foreground placeholder:text-muted-foreground w-full rounded-md border px-3 py-2 transition duration-200 focus:ring-2 focus:outline-none"
								/>
							</div>

							<div>
								<label for="semester" class="text-foreground mb-2 block text-sm font-medium">
									Current Semester*
								</label>
								<Select.Root type="single" bind:value={selectedSemester} required>
									<Select.Trigger
										class="focus:ring-primary bg-background-alt border-border-input text-foreground data-[state=open]:ring-primary flex w-full items-center justify-between rounded-md border px-3 py-2 transition duration-200 focus:ring-2 focus:outline-none data-[state=open]:ring-2 {selectedSemester
											? ''
											: 'text-muted-foreground'}"
									>
										{semesterOptions.find(option => option.value === selectedSemester)?.label || 'Select semester'}
										<ChevronDown
											class="text-muted-foreground h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180"
										/>
									</Select.Trigger>
									<Select.Content
										class="border-border-card bg-background-alt text-foreground shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=top]:slide-in-from-bottom-2 z-50 h-max max-h-[var(--bits-select-content-available-height)] w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)] overflow-hidden rounded-md border px-1 py-3 outline-hidden select-none data-[side=top]:-translate-y-1"
									>
										{#each semesterOptions as option}
											<Select.Item
												value={option.value}
												class="focus:bg-muted focus:text-foreground hover:bg-muted relative flex w-full cursor-default items-center rounded-sm py-1 pr-2 pl-3 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
											>
												{option.label}
											</Select.Item>
										{/each}
									</Select.Content>
									<input type="hidden" name="semester" value={selectedSemester} />
								</Select.Root>
								<span class="text-muted-foreground text-xs">
									The program is currently available for 3rd year undergraduate students only.
								</span>
							</div>

							<div>
								<label for="cgpa" class="text-foreground mb-2 block text-sm font-medium">
									CGPA/Percentage*
								</label>
								<input
									type="text"
									id="cgpa"
									name="cgpa"
									placeholder="e.g., 8.5 out of 10, 70%"
									required
									class="focus:ring-primary bg-background-alt border-border-input text-foreground placeholder:text-muted-foreground w-full rounded-md border px-3 py-2 transition duration-200 focus:ring-2 focus:outline-none"
								/>
								<span class="text-muted-foreground text-xs">
									Please provide your latest CGPA out of maximum possible or percentage (whichever is used in your institute).
								</span>
							</div>

							<div class="md:col-span-2">
								<label for="expectedGradutionYear" class="text-foreground mb-2 block text-sm font-medium">
									Expected Graduation Year*
								</label>
								<Select.Root type="single" bind:value={selectedGraduationYear} required>
									<Select.Trigger
										class="focus:ring-primary bg-background-alt border-border-input text-foreground data-[state=open]:ring-primary flex w-full items-center justify-between rounded-md border px-3 py-2 transition duration-200 focus:ring-2 focus:outline-none data-[state=open]:ring-2 {selectedGraduationYear
											? ''
											: 'text-muted-foreground'}"
									>
										{yearOptions.find(option => option.value === selectedGraduationYear)?.label || 'Select graduation year'}
										<ChevronDown
											class="text-muted-foreground h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180"
										/>
									</Select.Trigger>
									<Select.Content
										class="border-border-card bg-background-alt text-foreground shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=top]:slide-in-from-bottom-2 z-50 h-max max-h-[var(--bits-select-content-available-height)] w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)] overflow-hidden rounded-md border px-1 py-3 outline-hidden select-none data-[side=top]:-translate-y-1"
									>
										{#each yearOptions as option}
											<Select.Item
												value={option.value}
												class="focus:bg-muted focus:text-foreground hover:bg-muted relative flex w-full cursor-default items-center rounded-sm py-1 pr-2 pl-3 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
											>
												{option.label}
											</Select.Item>
										{/each}
									</Select.Content>
									<input type="hidden" name="expectedGradutionYear" value={selectedGraduationYear} />
								</Select.Root>
							</div>
						</div>
					</div>

					<div class="space-y-6">
						<h2 class="text-foreground text-xl font-semibold border-b border-border-card pb-2">
							Required Documents
						</h2>

						<div class="space-y-3">
							<label for="idDocumentInput" class="text-foreground block text-sm font-medium">
								Student ID Document*
							</label>
							<div class="border-border-input border-dashed rounded-lg border-2 text-center">
								<div class="relative">
									<input
										type="file"
										name="idDocument"
										accept=".pdf,image/*"
										onchange={(e) => handleFileUpload(e, 'id')}
										class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
										id="idDocumentInput"
										required
									/>
									<div class="p-6">
										<Upload class="text-muted-foreground mx-auto mb-2 h-8 w-8" />
										<p class="text-muted-foreground text-sm">
											{idDocument ? idDocument.name : 'Click to upload your student ID card or document'}
										</p>
										<p class="text-muted-foreground mt-1 text-xs">PDF or image files, max 5MB</p>
									</div>
								</div>
							</div>
						</div>

						<!-- CGPA Document -->
						<div class="space-y-3">
							<label for="cgpaDocumentInput" class="text-foreground block text-sm font-medium">
								CGPA/Transcript Document*
							</label>
							<div class="border-border-input border-dashed rounded-lg border-2 text-center">
								<div class="relative">
									<input
										type="file"
										name="cgpaDocument"
										accept=".pdf,image/*"
										onchange={(e) => handleFileUpload(e, 'cgpa')}
										class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
										id="cgpaDocumentInput"
										required
									/>
									<div class="p-6">
										<FileText class="text-muted-foreground mx-auto mb-2 h-8 w-8" />
										<p class="text-muted-foreground text-sm">
											{cgpaDocument ? cgpaDocument.name : 'Click to upload your official transcript or CGPA certificate'}
										</p>
										<p class="text-muted-foreground mt-1 text-xs">PDF or image files, max 5MB</p>
									</div>
								</div>
							</div>
						</div>

						<!-- Declaration -->
						<div class="space-y-3">
							<h3 class="text-foreground text-lg font-medium">Declaration*</h3>
							<div class="bg-muted/50 rounded-lg p-4">
								<label class="flex items-start space-x-3 cursor-pointer">
									<Checkbox.Root 
										bind:checked={declarationAccepted}
										name="declaration"
										required
										class="w-5 h-5 border-2 border-muted bg-background data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=unchecked]:hover:border-primary/40 peer inline-flex items-center justify-center rounded border transition-all duration-150 ease-in-out active:scale-[0.98] flex-shrink-0"
									>
										{#snippet children({ checked })}
											<div class="text-white inline-flex items-center justify-center">
												{#if checked}
												<Check class="size-3" />
												{/if}
											</div>
										{/snippet}
									</Checkbox.Root>
									<div class="text-foreground text-sm">
										I hereby declare that all the information provided in this application is true and accurate to the best of my knowledge. I understand that any false information may result in the rejection of my application or cancellation of admission.
									</div>
								</label>
							</div>
						</div>

						<!-- Signature -->
						<div class="space-y-3">
							<label for="signatureDocumentInput" class="text-foreground block text-sm font-medium">
								Upload Signature*
							</label>
							<div class="border-border-input border-dashed rounded-lg border-2 text-center">
								<div class="relative">
									<input
										type="file"
										name="signatureDocument"
										accept="image/*"
										onchange={(e) => handleFileUpload(e, 'signature')}
										class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
										id="signatureDocumentInput"
										required
									/>
									<div class="p-6">
										{#if signaturePreview}
											<div class="space-y-3">
												<img 
													src={signaturePreview} 
													alt="Signature preview" 
													class="mx-auto max-h-32 max-w-full rounded border border-border-input bg-white p-2"
												/>
												<p class="text-muted-foreground text-sm">
														{signatureDocument?.name}
													</p>
													<p class="text-muted-foreground text-xs">
														Click to change signature
												</p>
											</div>
										{:else}
											<Upload class="text-muted-foreground mx-auto mb-2 h-8 w-8" />
											<p class="text-muted-foreground text-sm">
												Click to upload your signature
											</p>
											<p class="text-muted-foreground mt-1 text-xs">Image files only, max 5MB</p>
										{/if}
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Submit Button -->
					<div class="flex flex-col items-center gap-4 pt-6">
						<button
							type="submit"
							disabled={loading}
							class="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading ? 'Submitting Application...' : 'Submit Application'}
						</button>
						{#if message}
							<div class="bg-red-50 border-red-200 text-red-700 mb-6 rounded-lg border p-4">
								<span>{message}</span>
							</div>
						{/if}

						
						<div class="bg-yellow-50 border-yellow-200 rounded-lg border p-4 max-w-md text-center">
							<p class="text-yellow-800 text-sm">
								<strong>Next Step:</strong> After submitting your application, you'll proceed to fee payment to complete the application
							</p>
						</div>
					</div>
				</form>
			{/if}
		</div>
	</div>
</div>