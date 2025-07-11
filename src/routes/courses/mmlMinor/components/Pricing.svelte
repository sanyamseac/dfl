<script>
	import { CheckCircle, IndianRupee } from 'lucide-svelte'
</script>

<section class="bg-background py-16">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="text-foreground mb-4 text-3xl font-bold">Program Investment</h2>
			<p class="text-foreground-alt text-xl">Flexible payment options to suit your needs</p>
		</div>
		<div class="grid gap-8 md:grid-cols-2">
			<!-- Full Payment Option -->
			<div
				class="from-primary to-primary/80 relative rounded-2xl bg-gradient-to-br p-8 text-white shadow-xl"
			>
				<div class="absolute top-4 right-4">
					<span class="rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
						Save 20%
					</span>
				</div>
				<div class="mb-6">
					<h3 class="text-2xl font-bold">Full Payment</h3>
					<p class="text-white/90">Pay once and save</p>
				</div>
				<div class="mb-6">
					<div class="flex items-baseline">
						<IndianRupee class="h-8 w-8" />
						<span class="text-4xl font-bold">96,000</span>
					</div>
					<p class="text-white/80">
						<span class="line-through">₹1,20,000</span> (20% discount applied)
					</p>
					<p class="text-sm text-white/70">Inclusive of GST</p>
				</div>
				<ul class="space-y-2">
					<li class="flex items-center">
						<CheckCircle class="mr-2 h-4 w-4" />
						Complete program access
					</li>
					<li class="flex items-center">
						<CheckCircle class="mr-2 h-4 w-4" />
						All course materials
					</li>
					<li class="flex items-center">
						<CheckCircle class="mr-2 h-4 w-4" />
						Certificate upon completion
					</li>
				</ul>
			</div>

			<!-- Installment Option -->
			<div class="bg-background-alt shadow-card border-border-card rounded-2xl border p-8">
				<div class="mb-6">
					<h3 class="text-foreground text-2xl font-bold">Installment Plan</h3>
					<p class="text-foreground-alt">Pay in two parts</p>
				</div>
				<div class="mb-6">
					<div class="text-foreground flex items-baseline">
						<IndianRupee class="h-8 w-8" />
						<span class="text-4xl font-bold">60,000</span>
						<span class="ml-2 text-lg">× 2</span>
					</div>
					<p class="text-foreground-alt">Two installments of ₹60,000 each</p>
					<p class="text-foreground-alt text-sm">Inclusive of GST</p>
				</div>
				<ul class="space-y-2">
					<li class="text-foreground flex items-center">
						<CheckCircle class="text-success mr-2 h-4 w-4" />
						Complete program access
					</li>
					<li class="text-foreground flex items-center">
						<CheckCircle class="text-success mr-2 h-4 w-4" />
						All course materials
					</li>
					<li class="text-foreground flex items-center">
						<CheckCircle class="text-success mr-2 h-4 w-4" />
						Certificate upon completion
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>
