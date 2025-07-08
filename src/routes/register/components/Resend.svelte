<script lang="ts">
	import { enhance } from '$app/forms'
	import { Dialog, Button } from 'bits-ui'

	let { openModal = $bindable() } = $props()

	let form = $state({
		success: false,
		message: '',
	})
	let loading = $state(false)
	let email = $state('')
	let emailValid = $derived(validateEmail(email))
	let formRef: HTMLFormElement

	function validateEmail(email: string) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}
</script>

<Dialog.Root bind:open={openModal}>
	<Dialog.Portal>
		<Dialog.Overlay
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
		/>
		<Dialog.Content
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-xl border border-gray-200 bg-gray-100 p-6 shadow-xl outline-none sm:max-w-[500px] md:w-full dark:border-gray-700 dark:bg-gray-800"
		>
			<Dialog.Title class="text-primary mb-4 text-xl font-semibold"
				>Resend Verification Email</Dialog.Title
			>
			<Dialog.Description class="text-muted-foreground mb-6 text-sm">
				If you didn't receive the verification email, you can request a new one.
			</Dialog.Description>
			<form
				bind:this={formRef}
				action="?/resendMail"
				method="post"
				class="space-y-4"
				use:enhance={() => {
					return ({ result }) => {
						if (result.type === 'success') {
							form.success = true
							form.message =
								(result.data as any)?.message ||
								'Verification email sent successfully!'
						} else if (result.type === 'error') {
							form.success = false
							form.message =
								result.error?.message ||
								'An error occurred while resending the email.'
						}
						loading = false
					}
				}}
			>
				<input
					type="email"
					name="email"
					placeholder="Enter your email address"
					bind:value={email}
					required
					class="focus:ring-primary bg-background-alt border-border-input text-foreground placeholder:text-muted-foreground w-full rounded-md border px-3 py-2 transition duration-200 focus:ring-2 focus:outline-none"
				/>
				<p class="text-muted-foreground mb-4 text-xs">
					A verification link will be sent to this address if it is registered with us.
				</p>
				<div class="flex gap-3 pt-4">
					<Button.Root
						type="submit"
						onclick={() => {
							loading = true
							formRef?.requestSubmit()
						}}
						disabled={loading || !emailValid}
						class="flex-1 cursor-pointer items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
					>
						{#if loading}
							<div
								class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
							></div>
						{/if}
						Submit
					</Button.Root>
					<Button.Root
						type="button"
						onclick={() => (openModal = false)}
						disabled={loading}
						class="flex-1 cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
					>
						Cancel
					</Button.Root>
				</div>
			</form>
			{#if form?.message}
				<p
					class={form?.success
						? 'text-success mt-4 text-sm'
						: 'text-destructive mt-4 text-sm'}
				>
					{form.message}
				</p>
			{/if}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
