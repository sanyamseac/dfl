<script>
	import { CheckCircle, IndianRupee } from "lucide-svelte"

</script>
<section class="py-16 bg-background">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-foreground mb-4">Program Investment</h2>
            <p class="text-xl text-foreground-alt">
                Flexible payment options to suit your needs
            </p>
        </div>
        <div class="grid gap-8 md:grid-cols-2">
            <!-- Full Payment Option -->
            <div class="relative rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 text-white shadow-xl">
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
            <div class="rounded-2xl bg-background-alt p-8 shadow-card border border-border-card">
                <div class="mb-6">
                    <h3 class="text-2xl font-bold text-foreground">Installment Plan</h3>
                    <p class="text-foreground-alt">Pay in two parts</p>
                </div>
                <div class="mb-6">
                    <div class="flex items-baseline text-foreground">
                        <IndianRupee class="h-8 w-8" />
                        <span class="text-4xl font-bold">60,000</span>
                        <span class="ml-2 text-lg">× 2</span>
                    </div>
                    <p class="text-foreground-alt">Two installments of ₹60,000 each</p>
                    <p class="text-sm text-foreground-alt">Inclusive of GST</p>
                </div>
                <ul class="space-y-2">
                    <li class="flex items-center text-foreground">
                        <CheckCircle class="mr-2 h-4 w-4 text-success" />
                        Complete program access
                    </li>
                    <li class="flex items-center text-foreground">
                        <CheckCircle class="mr-2 h-4 w-4 text-success" />
                        All course materials
                    </li>
                    <li class="flex items-center text-foreground">
                        <CheckCircle class="mr-2 h-4 w-4 text-success" />
                        Certificate upon completion
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>