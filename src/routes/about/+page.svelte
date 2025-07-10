<script>
	import { onMount } from 'svelte'

	let activeSection = 'vision-mission'

	// Handle smooth scrolling and active section tracking
	onMount(() => {
		const sections = document.querySelectorAll('.scroll-section')
		const navLinks = document.querySelectorAll('.nav-link')

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeSection = entry.target.id
					}
				})
			},
			{ threshold: 0.3 },
		)

		sections.forEach((section) => observer.observe(section))

		return () => observer.disconnect()
	})

	function scrollToSection(sectionId) {
		document.getElementById(sectionId)?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		})
	}
</script>

<div class="bg-background min-h-screen">
	<!-- Hero Section -->
	<div class="border-border-card bg-background-alt border-b">
		<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
			<div class="text-center">
				<h1 class="text-foreground text-3xl font-bold sm:text-4xl lg:text-5xl">
					About <span class="text-primary">DFL</span>
				</h1>
				<p class="text-foreground-alt mt-3 text-base sm:mt-4 sm:text-lg">
					Learn more about the Division of Flexible Learning at IIIT Hyderabad
				</p>
			</div>
		</div>
	</div>

	<!-- Main Content -->
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="lg:flex lg:gap-12">
			<!-- Navigation Sidebar -->
			<!-- <div class="mb-8 lg:mb-0 lg:w-64">
				<div class="sticky top-8">
					<nav
						class="bg-background-alt border-border-card shadow-card rounded-xl border p-6"
					>
						<h2 class="text-foreground mb-4 text-lg font-semibold">Contents</h2>
						<ul class="space-y-2">
							<li>
								<button
									class="nav-link w-full rounded-lg px-4 py-3 text-left transition-colors duration-200 {activeSection ===
									'vision-mission'
										? 'bg-primary text-white'
										: 'text-foreground-alt hover:bg-muted hover:text-foreground'}"
									onclick={() => scrollToSection('vision-mission')}
								>
									Vision & Mission
								</button>
							</li>
							<li>
								<button
									class="nav-link w-full rounded-lg px-4 py-3 text-left transition-colors duration-200 {activeSection ===
									'director-team'
										? 'bg-primary text-white'
										: 'text-foreground-alt hover:bg-muted hover:text-foreground'}"
									onclick={() => scrollToSection('director-team')}
								>
									Director & DFL Team
								</button>
							</li>
							<li>
								<button
									class="nav-link w-full rounded-lg px-4 py-3 text-left transition-colors duration-200 {activeSection ===
									'leadership'
										? 'bg-primary text-white'
										: 'text-foreground-alt hover:bg-muted hover:text-foreground'}"
									onclick={() => scrollToSection('leadership')}
								>
									Coordination Committee
								</button>
							</li>
						</ul>
					</nav>
				</div>
			</div> -->

			<!-- Content Area -->
			<div class="flex-1 space-y-16">
				<!-- Vision & Mission Section -->
				<section id="vision-mission" class="scroll-section">
					<div
						class="bg-background-alt border-border-card shadow-card rounded-2xl border p-8"
					>
						<h2 class="text-foreground mb-8 text-3xl font-bold lg:text-4xl">
							Vision & Mission
						</h2>

						<div class="mb-8">
							<img
								src="campus1.jpg"
								alt="Division Overview"
								class="h-64 w-full rounded-xl object-cover shadow-lg lg:h-80"
							/>
						</div>

						<div class="prose prose-lg max-w-none">
							<p class="text-foreground-alt mb-6 text-lg leading-relaxed">
								The Division of Flexible Learning (DFL) at IIIT Hyderabad is
								dedicated to providing high-quality education through flexible
								learning modes. Our vision is to make quality education accessible
								to all, regardless of geographical constraints or time limitations.
							</p>

							<div class="bg-accent/10 mb-6 rounded-xl p-6">
								<h3 class="text-foreground mb-4 text-xl font-semibold">
									Our mission is to:
								</h3>
								<ul class="text-foreground-alt items-start space-y-3 p-0 md:pl-10">
									<li class="flex items-start gap-3">
										<span
											class="bg-primary mt-3 h-2 w-2 flex-shrink-0 rounded-full"
										></span>
										Develop and deliver innovative educational programs that meet
										the needs of working professionals and students
									</li>
									<li class="flex items-start gap-3">
										<span
											class="bg-primary mt-3 h-2 w-2 flex-shrink-0 rounded-full"
										></span>
										Leverage technology to create engaging and effective learning
										experiences
									</li>
									<li class="flex items-start gap-3">
										<span
											class="bg-primary mt-3 h-2 w-2 flex-shrink-0 rounded-full"
										></span>
										Foster a community of learners who support and inspire each other
									</li>
									<li class="flex items-start gap-3">
										<span
											class="bg-primary mt-3 h-2 w-2 flex-shrink-0 rounded-full"
										></span>
										Contribute to the advancement of knowledge in technology and
										related fields
									</li>
									<li class="flex items-start gap-3">
										<span
											class="bg-primary mt-3 h-2 w-2 flex-shrink-0 rounded-full"
										></span>
										Build partnerships with industry to ensure our programs remain
										relevant and practical
									</li>
								</ul>
							</div>

							<p class="text-foreground-alt text-lg leading-relaxed">
								Through our commitment to excellence and innovation, we strive to
								empower individuals with the knowledge and skills they need to
								succeed in today's rapidly evolving world.
							</p>
						</div>
					</div>
				</section>

				<!-- Director & DFL Team Section -->
				<!-- <section id="director-team" class="scroll-section">
					<div
						class="bg-background-alt border-border-card shadow-card rounded-2xl border p-8"
					>
						<h2 class="text-foreground mb-12 text-3xl font-bold lg:text-4xl">
							Director & DFL Team
						</h2>

						<div class="mb-16">
							<div
								class="from-primary/5 to-tertiary/5 rounded-2xl bg-gradient-to-r p-8"
							>
								<div class="items-start lg:flex lg:gap-8">
									<div class="mb-6 flex-shrink-0 lg:mb-0">
										<a
											href="https://www.iiit.ac.in/faculty/venkatesh-choppella/"
											target="_blank"
											class="block"
										>
											<img
												src="assets/img/team/VenkateshChoppella.png"
												alt="Prof. Venkatesh Choppella"
												class="mx-auto h-48 w-48 rounded-xl object-cover shadow-lg transition-shadow duration-300 hover:shadow-xl lg:mx-0"
											/>
										</a>
									</div>

									<div class="flex-1 text-center lg:text-left">
										<h3
											class="text-foreground mb-2 text-2xl font-bold lg:text-3xl"
										>
											<a
												href="https://www.iiit.ac.in/faculty/venkatesh-choppella/"
												target="_blank"
												class="hover:text-primary transition-colors duration-200"
											>
												Prof. Venkatesh Choppella
											</a>
										</h3>
										<p class="text-primary mb-6 text-lg font-semibold">
											Director, Division of Flexible Learning
										</p>

										<div class="text-foreground-alt space-y-4 leading-relaxed">
											<p>
												Dr. Venkatesh Choppella serves as an Associate
												Professor at the International Institute of
												Information Technology, Hyderabad (IIIT-H), where he
												also holds the position of Director of the Division
												of Flexible Learning. His research encompasses
												programming languages, software architectures,
												formal methods, and computer science education.
											</p>

											<p>
												Dr. Choppella is notably the Principal Investigator
												for the
												<a
													href="https://www.vlab.co.in/participating-institute-iiit-hyderabad"
													target="_blank"
													class="text-primary font-semibold hover:underline"
												>
													Virtual Labs
												</a>
												project at IIIT-H, a national initiative involving a
												consortium of 11 institutes across India. This project
												has significantly expanded access to experimental learning,
												particularly during the COVID-19 pandemic.
											</p>

											<div class="bg-background mt-6 rounded-lg p-4">
												<p class="text-foreground font-semibold">
													Email: <span class="font-normal"
														>venkatesh<span class="hidden">REMOVE</span
														>.choppella [at] iiit.ac.in</span
													>
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div>
							<h3 class="text-foreground mb-8 text-2xl font-bold">DFL Team</h3>
							<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
								<div
									class="bg-background border-border-card shadow-card rounded-xl border p-6 transition-shadow duration-300 hover:shadow-lg"
								>
									<div class="text-center">
										<img
											src="assets/img/team/image_8.jpeg"
											alt="Mr. K. Sudheendra"
											class="mx-auto mb-4 h-24 w-24 rounded-full object-cover shadow-md"
										/>
										<h4 class="text-foreground mb-1 text-lg font-semibold">
											Mr. K. Sudheendra
										</h4>
										<p class="text-primary mb-3 font-medium">
											Division Executive
										</p>
										<div class="text-foreground-alt space-y-2 text-sm">
											<p class="font-medium">
												sudheendra<span class="hidden">REMOVE</span>.k [at]
												iiit.ac.in
											</p>
											<p class="leading-relaxed">
												Manages day-to-day operations and ensures
												implementation of strategic initiatives while
												maintaining high standards of academic excellence.
											</p>
										</div>
									</div>
								</div>

								{#each [{ name: '[Name Placeholder]', role: 'Accounts Assistant', email: 'accounts', desc: 'Manages financial records, payments, and budgeting within the DFL division.' }, { name: '[Name Placeholder]', role: 'Administration Assistant', email: 'admin', desc: 'Supports administrative operations including scheduling and documentation.' }, { name: '[Name Placeholder]', role: 'Admissions Assistant', email: 'admissions', desc: 'Manages admissions process and communication with prospective students.' }, { name: '[Name Placeholder]', role: 'Course Coordinator', email: 'courses', desc: 'Coordinates course logistics and ensures timely delivery of educational content.' }, { name: '[Name Placeholder]', role: 'Operations Manager', email: 'operations', desc: 'Oversees overall operations including planning and monitoring workflows.' }, { name: '[Name Placeholder]', role: 'Software Engineer', email: 'software', desc: "Develops and maintains software systems supporting DFL's learning platforms." }, { name: '[Name Placeholder]', role: 'Technical Assistant', email: 'tech', desc: 'Provides technical support for hardware, software, and online platforms.' }, { name: '[Name Placeholder]', role: 'Web Developer', email: 'web', desc: 'Designs and maintains DFL website and web-based tools.' }] as member}
									<div
										class="bg-background border-border-card shadow-card rounded-xl border p-6 transition-shadow duration-300 hover:shadow-lg"
									>
										<div class="text-center">
											<img
												src="assets/img/team/image_8.jpeg"
												alt={member.name}
												class="mx-auto mb-4 h-24 w-24 rounded-full object-cover shadow-md"
											/>
											<h4 class="text-foreground mb-1 text-lg font-semibold">
												{member.name}
											</h4>
											<p class="text-primary mb-3 font-medium">
												{member.role}
											</p>
											<div class="text-foreground-alt space-y-2 text-sm">
												<p class="font-medium">
													{member.email}<span class="hidden">REMOVE</span
													>.dfl [at] iiit.ac.in
												</p>
												<p class="leading-relaxed">{member.desc}</p>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</section>

				<section id="leadership" class="scroll-section">
					<div
						class="bg-background-alt border-border-card shadow-card rounded-2xl border p-8"
					>
						<h2 class="text-foreground mb-12 text-3xl font-bold lg:text-4xl">
							DFL Coordination Committee
						</h2>

						<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
							{#each [{ name: 'Prof. Venkatesh Choppella', role: 'Chair', email: 'venkatesh.choppella', research: 'Programming Languages, Software Architectures, Formal Methods, Computer Science Education', image: 'VenkateshChoppella.png', link: 'https://www.iiit.ac.in/faculty/venkatesh-choppella/' }, { name: 'Dr. Kishore Kothapalli', role: 'Dean (Academic), Member', email: 'kishore', research: 'Multicore and Many Core Algorithms, Distributed Algorithms', image: 'KishoreKothapalli.png', link: 'https://www.iiit.ac.in/faculty/kishore-kothapalli/' }, { name: 'Dr. Sujit Gujar', role: 'Member', email: 'sujit.gujar', research: 'Game Theory, Mechanism Design, Machine Learning, Cryptography applied to Modern Web and AI Applications', image: 'SujitGujar.png', link: 'https://www.iiit.ac.in/faculty/sujit-prakash-gujar/' }, { name: 'Dr. Aakansha Natani', role: 'Member', email: 'aakansha.natani', research: 'Internet and Democracy, E-Governance, Data Ownership and Privacy Debates, Online Civic Engagement', image: 'AakanshaNatani.jpg', link: 'https://hsrc.iiit.ac.in/people/faculty/aakansha.html' }, { name: 'Dr. Rajakrishnan P Raj Kumar', role: 'Member', email: 'raja', research: 'Computational Linguistics', image: 'RajakrishnanRajkumar.jpg', link: 'https://www.iiit.ac.in/faculty/rajakrishnan-p-rajkumar/' }, { name: 'Dr. Raman Saxena', role: 'Member', email: 'raman.saxena', research: 'Human-Centered Design, HCI, Interaction Technologies, Design Thinking', image: 'RamanSaxena.png', link: 'https://www.iiit.ac.in/faculty/raman-saxena/' }] as member}
								<div class="group">
									<a
										href={member.link}
										target="_blank"
										class="bg-background border-border-card shadow-card group-hover:border-primary/30 block rounded-xl border p-6 transition-all duration-300 hover:shadow-lg"
									>
										<div class="text-center">
											<img
												src="assets/img/team/{member.image}"
												alt={member.name}
												class="mx-auto mb-4 h-28 w-28 rounded-full object-cover shadow-md transition-shadow duration-300 group-hover:shadow-lg"
											/>
											<h4
												class="text-foreground group-hover:text-primary mb-1 text-lg font-semibold transition-colors duration-200"
											>
												{member.name}
											</h4>
											<p class="text-primary mb-3 font-medium">
												{member.role}
											</p>
											<div class="text-foreground-alt space-y-3 text-sm">
												<p class="font-medium">
													{member.email}<span class="hidden">REMOVE</span>
													[at] iiit.ac.in
												</p>
												<div>
													<p class="text-foreground mb-1 font-semibold">
														Research Areas:
													</p>
													<p class="leading-relaxed">{member.research}</p>
												</div>
											</div>
										</div>
									</a>
								</div>
							{/each}
						</div>
					</div>
				</section> -->
			</div>
		</div>
	</div>
</div>

<style>
	.bg-grid-pattern {
		background-image:
			linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
			linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
		background-size: 20px 20px;
	}
</style>
