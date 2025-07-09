<script lang="ts">
    import { Accordion } from "bits-ui";
    import { ChevronDown } from "lucide-svelte";

    const faqs = [
        {
            id: "faq-1",
            question: "Who can apply for this Minor Program?",
            answer: "Students currently in the 3rd year of an undergraduate program in Science, Mathematics, Engineering, or Technology are eligible to apply."
        },
        {
            id: "faq-2",
            question: "Is the program fully online?",
            answer: "Yes, the program is conducted entirely online with a mix of live sessions, inverted classes, and project-based learning."
        },
        {
            id: "faq-3",
            question: "How much time do I need to commit per week?",
            answer: "You should be able to manage with 6–8 hours per week, including lectures, assignments, and projects. The program is designed to be flexible and manageable alongside your regular coursework."
        },
        {
            id: "faq-4",
            question: "What certification will I receive upon completion?",
            answer: "You will receive a Minor in Machine Learning certificate from IIIT Hyderabad. Based on credit accumulation, single-course certificates may also be issued."
        },
        {
            id: "faq-5",
            question: "Can I earn additional certifications?",
            answer: "Yes. After completing the Minor, you can opt to pursue advanced certificate courses. Completing both the Minor and Advanced Certificate tracks may make you eligible to join IIIT-H as a researcher."
        },
        {
            id: "faq-6",
            question: "What is the fee and payment structure?",
            answer: "The total fee is ₹1.2 Lakhs (inclusive of GST). You can avail up to 20% discount with full payment. Alternatively, you can pay in two installments of ₹60,000 each."
        }
    ]
</script>
<section class="py-16 bg-background">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p class="text-xl text-foreground-alt">
                Get answers to common questions about the program
            </p>
        </div>
        <Accordion.Root class="space-y-4" type="multiple">
            {#each faqs as faq}
                <Accordion.Item value={faq.id} class="border-b overflow-hidden pb-2">
                    <Accordion.Header>
                        <Accordion.Trigger class="cursor-pointer w-full px-6 py-4 text-left flex items-center justify-between transition-colors group">
                            <span class="font-semibold text-foreground">{faq.question}</span>
                            <ChevronDown class="h-5 w-5 text-foreground-alt transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content class="px-6 pb-4 text-foreground-alt data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-up-1 data-[state=open]:slide-down-1">
                        {faq.answer}
                    </Accordion.Content>
                </Accordion.Item>
            {/each}
        </Accordion.Root>
    </div>
</section>