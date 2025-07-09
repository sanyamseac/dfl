<script lang="ts">
	import { CheckCircle } from "lucide-svelte"

    const outcomes = [
        "Access exclusive IIIT-H campus events and learning experiences",
        "Continuous evaluations through assignments, projects, and other assessments", 
        "Opportunity to pursue advanced certificate courses after completing the minor",
        "Pathway to research at IIIT-H - Students who complete both the Minor and Advanced Certificate programs may be eligible to join IIIT Hyderabad as a researcher"
    ]
</script>
<section class="py-16 bg-muted">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-foreground mb-4">Program Outcomes</h2>
            <p class="text-xl text-foreground-alt max-w-3xl mx-auto">
                What you'll gain from completing this program
            </p>
        </div>
        <div class="grid gap-6 md:grid-cols-2">
            {#each outcomes as outcome}
                <div class="flex items-start space-x-4 p-2 px-6">
                    <CheckCircle class="mt-1 h-6 w-6 flex-shrink-0 text-success" />
                    <p class="text-foreground">{outcome}</p>
                </div>
            {/each}
        </div>
    </div>
</section>