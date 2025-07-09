<script>
	import { goto } from "$app/navigation"
	import { Button } from "bits-ui"

    let { late, early } = $props()
</script>
<section class="py-16 bg-primary text-white">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="mb-4 text-3xl font-bold">Ready to Start Your ML Journey?</h2>
        <p class="mb-8 text-xl text-white/90">
            Join hundreds of students advancing their careers with machine learning expertise from IIIT Hyderabad
        </p>
        <div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
            {#if late}
                <Button.Root
                    class="inline-flex items-center justify-center rounded-lg bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
                >
                    Applications Closed
                </Button.Root>
            {:else if early}
                <Button.Root
                    class="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg transition-all duration-200 hover:bg-white/95 hover:shadow-xl"
                >
                    Applications Open July 14
                </Button.Root>
            {:else}
                <Button.Root
                    onclick={() => goto('/courses/ml-minor/apply')}
                    class="cursor-pointer inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg transition-all duration-200 hover:bg-white/95 hover:shadow-xl"
                >
                    Apply Now
                </Button.Root>
            {/if}
            <Button.Root
                onclick={() => window.open('mailto:enquiries@dfl.iiit.ac.in', '_blank')}
                class="cursor-pointer inline-flex items-center justify-center rounded-lg border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
            >
                Have Questions? Contact Us
            </Button.Root>
        </div>
    </div>
</section>