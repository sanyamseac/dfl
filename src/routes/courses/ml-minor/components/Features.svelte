<script lang="ts">
    import { Globe, Clock, Users, Award } from "lucide-svelte"
    const features = [
        {
            icon: Globe,
            title: "Fully Online",
            description: "Learn from anywhere with live interactive sessions and flexible scheduling"
        },
        {
            icon: Clock,
            title: "6-8 Hours/Week",
            description: "Manageable time commitment alongside your regular coursework"
        },
        {
            icon: Users,
            title: "Expert Faculty",
            description: "Learn from IIIT-H faculty and industry experts"
        },
        {
            icon: Award,
            title: "Industry Recognition",
            description: "Earn a prestigious Minor degree from IIIT Hyderabad"
        }
    ]
</script>
<section class="py-16 bg-background">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-foreground mb-4">Why Choose This Program?</h2>
            <p class="text-xl text-foreground-alt max-w-3xl mx-auto">
                Designed for undergraduate students who want to complement their core training with cutting-edge ML expertise
            </p>
        </div>
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {#each features as feature}
                <div class="group p-6 border-b transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div class="mb-4">
                        <feature.icon class="h-10 w-10 text-primary" />
                    </div>
                    <h3 class="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p class="text-foreground-alt">{feature.description}</p>
                </div>
            {/each}
        </div>
    </div>
</section>