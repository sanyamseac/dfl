<script lang="ts">
	import { NavigationMenu, Dialog, DropdownMenu } from 'bits-ui'
	import { page } from '$app/state'
	import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-svelte'

	let mobileMenuOpen = $state(false)
	let darkMode = $state(false)

	const navigationItems = $derived([
		{
			title: 'Home',
			href: '/',
			active: page.url.pathname === '/',
		},
		{
			title: 'Academics',
			href: null,
			active: page.url.pathname.startsWith('/academics'),
			submenu: [
				{
					title: 'Courses',
					href: '/courses',
					active: page.url.pathname === '/courses',
				},
				{
					title: 'Calendar',
					href: '/calendar',
					active: page.url.pathname === '/calendar',
				},
			],
		},
		{
			title: 'Admissions',
			href: '/admissions',
			active: page.url.pathname === '/admissions',
		},
		{
			title: 'About Us',
			href: '/about',
			active: page.url.pathname === '/about',
		},
		...(page.data.user
			? [
					{
						title: 'Dashboard',
						href: '/dashboard',
						active: page.url.pathname === '/dashboard',
					},
				]
			: [
					{
						title: 'Login',
						href: '/login',
						active: page.url.pathname === '/login',
					},
				]),
	])
</script>

<nav
	class="sticky top-0 z-50 w-full border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-gray-900"
>
	<div class="mx-auto w-full px-4 md:px-6 lg:px-8">
		<div class="flex h-24 items-center justify-between">
			<!-- Logo -->
			<div class="flex items-center">
				<a href="/" class="flex items-center space-x-3">
					<div class="flex items-center space-x-2">
						<img
							src="/iiit-logo.png"
							alt="IIIT Hyderabad Logo"
							class="h-20 object-contain dark:invert"
						/>
						<img
							src="/logo.png"
							alt="DFL Logo"
							class="h-16 object-contain dark:invert"
						/>
					</div>
				</a>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex md:items-center md:space-x-1">
				<NavigationMenu.Root>
					<NavigationMenu.List
						class="group flex list-none items-center justify-center space-x-1"
					>
						{#each navigationItems as item}
							<NavigationMenu.Item>
								{#if item.submenu}
									<DropdownMenu.Root>
										<DropdownMenu.Trigger
											class={`group text-md inline-flex h-10 items-center justify-center space-x-1 rounded-md px-4 py-2 font-medium transition-colors hover:text-blue-600 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 ` +
												(item.active
													? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300'
													: 'text-slate-700 dark:text-slate-200')}
										>
											<span>{item.title}</span>
											<ChevronDown
												class="h-4 w-4 transition-transform group-data-[state=open]:rotate-180"
											/>
										</DropdownMenu.Trigger>
										<DropdownMenu.Content
											class="min-w-[180px] rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-600 dark:bg-gray-900"
											align="start"
										>
											{#each item.submenu as subItem}
												<DropdownMenu.Item
													class="flex cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-700 dark:hover:text-blue-300"
												>
													<a href={subItem.href} class="w-full"
														>{subItem.title}</a
													>
												</DropdownMenu.Item>
											{/each}
										</DropdownMenu.Content>
									</DropdownMenu.Root>
								{:else}
									<NavigationMenu.Link
										class={`focus:text-accent-foreground data-[state=open]:shadow-mini group text-md inline-flex h-10 items-center justify-center rounded-md px-4 py-2 font-medium transition-colors hover:text-blue-600 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 ` +
											(item.active
												? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300'
												: 'text-slate-700 dark:text-slate-200')}
										href={item.href}
									>
										{item.title}
									</NavigationMenu.Link>
								{/if}
							</NavigationMenu.Item>
						{/each}
					</NavigationMenu.List>
				</NavigationMenu.Root>

				<!-- Theme Toggle -->
				<button
					onclick={() => (darkMode = !darkMode)}
					class="ml-4 inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-blue-300"
					aria-label="Toggle theme"
				>
					{#if darkMode}
						<Sun class="h-5 w-5" />
					{:else}
						<Moon class="h-5 w-5" />
					{/if}
				</button>
			</div>

			<!-- Mobile Menu Button -->
			<div class="md:hidden">
				<Dialog.Root bind:open={mobileMenuOpen}>
					<Dialog.Trigger
						class="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:hover:bg-slate-700 dark:hover:text-slate-200"
					>
						<Menu class="h-6 w-6" />
					</Dialog.Trigger>
					<Dialog.Portal>
						<Dialog.Overlay class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
						<Dialog.Content
							class="fixed top-0 right-0 z-50 h-full w-3/4 transform bg-white shadow-xl transition-transform duration-300 ease-in-out dark:bg-gray-900"
						>
							<div class="flex h-full flex-col">
								<!-- Header -->
								<div class="flex items-center justify-end p-4">
									<Dialog.Close
										class="mt-3 inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:hover:bg-slate-700 dark:hover:text-slate-200"
									>
										<X class="h-6 w-6" />
									</Dialog.Close>
								</div>

								<!-- Navigation Links -->
								<div class="flex-1 overflow-y-auto p-4">
									<nav class="space-y-2">
										{#each navigationItems as item}
											{#if item.submenu}
												<div class="space-y-1">
													<div
														class="px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-200"
													>
														{item.title}
													</div>
													{#each item.submenu as subItem}
														<a
															href={subItem.href}
															class={`ml-4 flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-700 dark:hover:text-blue-300 ` +
																(subItem.active
																	? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300'
																	: 'text-slate-600 dark:text-slate-300')}
															onclick={() => (mobileMenuOpen = false)}
														>
															<span>{subItem.title}</span>
														</a>
													{/each}
												</div>
											{:else}
												<a
													href={item.href}
													class={`flex items-center space-x-3 rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-700 dark:hover:text-blue-300 ` +
														(item.active
															? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300'
															: 'text-slate-700 dark:text-slate-200')}
													onclick={() => (mobileMenuOpen = false)}
												>
													<span>{item.title}</span>
												</a>
											{/if}
										{/each}
									</nav>

									<!-- Mobile Theme Toggle -->
									<div
										class="mt-6 border-t border-slate-200 pt-4 dark:border-slate-600"
									>
										<button
											onclick={() => (darkMode = !darkMode)}
											class="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-base font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-blue-300"
										>
											{#if darkMode}
												<Sun class="h-5 w-5" />
												<span>Light Mode</span>
											{:else}
												<Moon class="h-5 w-5" />
												<span>Dark Mode</span>
											{/if}
										</button>
									</div>
								</div>

								<!-- Footer -->
								<div class="border-t border-slate-200 p-4 dark:border-slate-600">
									<p class="text-sm text-slate-500 dark:text-slate-300">
										Division of Flexible Learning, IIIT Hyderabad
									</p>
								</div>
							</div>
						</Dialog.Content>
					</Dialog.Portal>
				</Dialog.Root>
			</div>
		</div>
	</div>
</nav>
