<script lang="ts">
    import { Button, Select } from 'bits-ui'
    import { ChevronDown, BookOpen, GraduationCap, Award, FileText } from 'lucide-svelte'
    import { fade, fly } from 'svelte/transition'
    import { cubicOut } from 'svelte/easing'
	import { goto } from '$app/navigation'

    type CourseType = 'degree' | 'minor' | 'diploma' | 'certificate';
    type CourseStructure = 'Online' | 'Offline' | 'Hybrid';
    
    interface Course {
        id: number;
        title: string;
        description: string;
        duration: string;
        level: string;
        type: CourseType;
        structure: CourseStructure;
        credits: string;
        image: string;
        url: string;
        applicationStart: string; // ISO date string
        applicationEnd: string; // ISO date string
    }

    const courseTypes: Record<CourseType, { label: string; icon: any; color: string }> = {
        degree: { label: 'Degree', icon: GraduationCap, color: 'text-blue-600 dark:text-blue-400' },
        minor: { label: 'Minor Degree', icon: BookOpen, color: 'text-green-600 dark:text-green-400' },
        diploma: { label: 'Diploma', icon: Award, color: 'text-purple-600 dark:text-purple-400' },
        certificate: { label: 'Certificate', icon: FileText, color: 'text-orange-600 dark:text-orange-400' }
    }

    const allCourses: Course[] = [
        {
            id: 1,
            title: "Minor Degree in Modern Machine Learning",
            description: "Comprehensive 1 year minor program focusing on modern machine learning techniques, deep learning, neural networks, and real-world applications in various industries.",
            duration: "1 year",
            level: "Undergraduate", 
            type: "minor",
            structure: "Online",
            credits: "18",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
            url: "/courses/ml-minor",
            applicationStart: "2025-07-14T00:00:00+05:30",
            applicationEnd: "2025-08-04T23:59:59+05:30"
        }
    ]

    const availableTypes = [...new Set(allCourses.map(course => course.type))];
    const showCategorySelector = availableTypes.length > 1;

    let selectedType = $state<string>('all');
    let searchQuery = $state<string>('');
    let hoveredCard = $state<number | null>(null);

    function getApplicationStatus(course: Course) {
        const now = new Date();
        const startDate = new Date(course.applicationStart);
        const endDate = new Date(course.applicationEnd);
        
        if (now < startDate) {
            return { status: 'upcoming', text: 'Applications Open Soon', color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' };
        } else if (now >= startDate && now <= endDate) {
            return { status: 'open', text: 'Applications Open', color: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' };
        } else {
            return { status: 'closed', text: 'Applications Closed', color: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20' };
        }
    }

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            timeZone: 'Asia/Kolkata'
        });
    }

    function getDaysRemaining(endDate: string) {
        const now = new Date();
        const end = new Date(endDate);
        const diffTime = end.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    let filteredCourses = $derived.by(() => {
        let courses = allCourses;
        
        if (selectedType !== 'all') {
            courses = courses.filter(course => course.type === selectedType);
        }
        
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            courses = courses.filter(course => 
                course.title.toLowerCase().includes(query) ||
                course.description.toLowerCase().includes(query)
            )
        }
        
        return courses
    })

    // Create options for the select dropdown
    let typeOptions = $derived.by(() => [
        { value: 'all', label: 'All Courses' },
        ...availableTypes.map(type => ({
            value: type,
            label: courseTypes[type as CourseType].label
        }))
    ])
</script>

<svelte:head>
    <title>Available Courses</title>
    <meta name="description" content="Explore our comprehensive course offerings including degrees, diplomas, and certificates" />
</svelte:head>

<div class="min-h-screen bg-background">
    <!-- Header Section -->
    <div class="border-b border-border-card bg-background-alt">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div class="text-center">
                <h1 class="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                    Available <span class="text-primary">Courses</span>
                </h1>
                <p class="mt-3 text-base text-foreground-alt sm:mt-4 sm:text-lg">
                    Discover our comprehensive range of educational programs
                </p>
            </div>
        </div>
    </div>

    <!-- Filters Section -->
    <div class="bg-background-alt/50 border-b border-border-card">
        <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            <div class="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
                <!-- Search Bar -->
                <div class="flex-1 sm:max-w-md">
                    <label for="search" class="sr-only">Search courses</label>
                    <input
                        type="text"
                        id="search"
                        bind:value={searchQuery}
                        placeholder="Search courses, instructors..."
                        class="w-full rounded-lg border border-border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 sm:text-base"
                    />
                </div>

                <!-- Category Filter (only show if multiple types exist) -->
                {#if showCategorySelector}
                    <div class="w-full sm:w-auto sm:min-w-[180px]">
                        <Select.Root type="single" bind:value={selectedType}>
                            <Select.Trigger
                                class="flex w-full items-center justify-between rounded-lg border border-border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 sm:text-base"
                            >
                                {selectedType === 'all' ? 'All Courses' : courseTypes[selectedType as CourseType]?.label || 'Select Category'}
                                <ChevronDown class="h-4 w-4 text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-180" />
                            </Select.Trigger>
                            <Select.Content
                                class="focus-override border-muted bg-background shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 outline-hidden z-50 h-min max-h-[var(--bits-select-content-available-height)] w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)] select-none rounded-xl border px-1 py-3 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
                                sideOffset={10}
                            >
                                {#each typeOptions as option}
                                    <Select.Item
                                        value={option.value}
                                        class="relative flex w-full cursor-pointer items-center rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground transition-colors"
                                    >
                                        {option.label}
                                    </Select.Item>
                                {/each}
                            </Select.Content>
                        </Select.Root>
                    </div>
                {/if}
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <!-- Results Summary -->
        <div class="mb-4 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-sm text-foreground-alt sm:text-base">
                {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
                {#if selectedType !== 'all'}
                    in {courseTypes[selectedType as CourseType].label}
                {/if}
            </p>
            
            {#if selectedType !== 'all' || searchQuery.trim()}
                <button
                    onclick={() => { selectedType = 'all'; searchQuery = ''; }}
                    class="text-sm text-primary hover:text-primary/80 underline transition-colors self-start sm:self-auto"
                >
                    Clear filters
                </button>
            {/if}
        </div>

        <!-- Courses Grid -->
        <div class="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {#each filteredCourses as course, index (course.id)}
                {@const appStatus = getApplicationStatus(course)}
                {@const daysLeft = getDaysRemaining(course.applicationEnd)}
                <div
                    aria-label="Course Card"
                    role="link"
                    tabindex="0"
                    class="group relative overflow-hidden rounded-xl border border-border-card bg-background-alt shadow-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 {hoveredCard === course.id ? 'border-primary/30 shadow-lg -translate-y-1' : ''}"
                    in:fly={{ y: 20, duration: 400, delay: index * 50, easing: cubicOut }}
                    out:fade={{ duration: 200 }}
                    onclick={(e) => {
                        // Don't trigger card tap if clicking on buttons
                        if (e.target instanceof Element && (e.target.closest('button') || e.target.closest('[role="button"]'))) {
                            return;
                        }
                        hoveredCard = hoveredCard === course.id ? null : course.id;
                    }}
                    onkeydown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            hoveredCard = hoveredCard === course.id ? null : course.id;
                        }
                    }}
                >
                    <!-- Course Image with Hover Overlay -->
                    <div class="relative h-48 overflow-hidden">
                        <img 
                            src={course.image} 
                            alt={course.title}
                            class="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-sm"
                            loading="lazy"
                        />
                        
                        <!-- Course Type Badge -->
                        <div class="absolute top-3 right-3 z-30">
                            <div class="flex items-center gap-1.5 rounded-md bg-background/95 border border-border-card/50 px-2.5 py-1.5 text-xs font-semibold backdrop-blur-sm shadow-sm {courseTypes[course.type as CourseType].color}">
                                {#if course.type === 'degree'}
                                    <GraduationCap class="h-3.5 w-3.5" />
                                {:else if course.type === 'minor'}
                                    <BookOpen class="h-3.5 w-3.5" />
                                {:else if course.type === 'diploma'}
                                    <Award class="h-3.5 w-3.5" />
                                {:else if course.type === 'certificate'}
                                    <FileText class="h-3.5 w-3.5" />
                                {/if}
                                <span class="uppercase tracking-wide">{courseTypes[course.type as CourseType].label}</span>
                            </div>
                        </div>

                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/30 {hoveredCard === course.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-all duration-500 ease-out transform {hoveredCard === course.id ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'} z-20">
                            <div class="absolute inset-0 flex flex-col justify-center p-4 text-white">
                                <div class="pt-4 transform {hoveredCard === course.id ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'} transition-transform duration-700 delay-100">
                                    <p class="text-sm text-gray-200 leading-relaxed line-clamp-4 mt-2">
                                        {course.description}
                                    </p>
                                    <div class="mt-4 pt-3 border-t border-white/20">
                                        <div class="flex items-center justify-between text-xs">
                                            <span class="font-medium">Duration: {course.duration}</span>
                                            <span class="font-medium">Credits: {course.credits}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="p-4">
                        <!-- Course Header (No description shown initially) -->
                        <div class="mb-3">
                            <h3 class="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                                {course.title}
                            </h3>
                        </div>

                        <!-- Course Details -->
                        <div class="grid grid-cols-2 gap-3 text-sm text-foreground-alt mb-4">
                            <div>
                                <span class="font-medium text-foreground block">Duration</span>
                                <span>{course.duration}</span>
                            </div>
                            <div>
                                <span class="font-medium text-foreground block">Level</span>
                                <span>{course.level}</span>
                            </div>
                            <div>
                                <span class="font-medium text-foreground block">Credits</span>
                                <span>{course.credits}</span>
                            </div>
                            <div>
                                <span class="font-medium text-foreground block">Mode</span>
                                <span>{course.structure}</span>
                            </div>
                        </div>

                        <!-- Application Deadline Info -->
                        {#if appStatus.status === 'open'}
                            <div class="mb-4 rounded-lg bg-green-50 dark:bg-green-900/20 p-3 border border-green-200 dark:border-green-800">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm font-medium text-green-800 dark:text-green-200">
                                        Applications Close:
                                    </span>
                                    <span class="text-sm font-bold text-green-600 dark:text-green-400">
                                        {formatDate(course.applicationEnd)}
                                    </span>
                                </div>
                                {#if daysLeft > 0 && daysLeft <= 7}
                                    <p class="mt-1 text-xs text-green-700 dark:text-green-300">
                                        Only {daysLeft} day{daysLeft !== 1 ? 's' : ''} left!
                                    </p>
                                {/if}
                            </div>
                        {:else if appStatus.status === 'upcoming'}
                            <div class="mb-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 p-3 border border-blue-200 dark:border-blue-800">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm font-medium text-blue-800 dark:text-blue-200">
                                        Applications Open:
                                    </span>
                                    <span class="text-sm font-bold text-blue-600 dark:text-blue-400">
                                        {formatDate(course.applicationStart)}
                                    </span>
                                </div>
                            </div>
                        {:else}
                            <div class="mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 p-3 border border-red-200 dark:border-red-800">
                                <div class="text-center">
                                    <span class="text-sm font-medium text-red-800 dark:text-red-200">
                                        Applications closed on {formatDate(course.applicationEnd)}
                                    </span>
                                </div>
                            </div>
                        {/if}
                        
                        <div class="flex items-center gap-2 h-min-96px">
                            {#if appStatus.status === 'open'}
                                <Button.Root
                                    class="cursor-pointer w-full rounded-lg bg-success text-white hover:bg-success/90 active:scale-95 px-4 py-2 font-medium shadow-btn transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                    onclick={() => {
                                        goto(`${course.url}/apply`)
                                    }}
                                >
                                    Apply Now
                                </Button.Root>
                            {:else if appStatus.status === 'upcoming'}
                                <Button.Root
                                    class="cursor-pointer w-full rounded-lg bg-gray-500 text-white hover:bg-gray-600 active:scale-95 px-4 py-2 font-medium shadow-btn transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                >
                                    Not Open
                                </Button.Root>
                            {:else}
                                <Button.Root
                                    class="cursor-pointer w-full rounded-lg bg-gray-500 text-white hover:bg-gray-600 active:scale-95 px-4 py-2 font-medium shadow-btn transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                    disabled
                                >
                                    Closed
                                </Button.Root>
                            {/if}
                            <Button.Root
                                class="cursor-pointer w-full rounded-lg bg-primary text-white hover:bg-primary/90 active:scale-95 px-4 py-2 font-medium shadow-btn transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                onclick={() => {
                                    goto(course.url)
                                }}
                            >
                                Learn More
                            </Button.Root>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <!-- Empty State -->
        {#if filteredCourses.length === 0}
            <div class="py-12 text-center" in:fade={{ duration: 300 }}>
                <div class="mx-auto max-w-md">
                    <div class="mb-4 text-6xl">📚</div>
                    <h3 class="text-xl font-semibold text-foreground mb-2">No courses found</h3>
                    <p class="text-foreground-alt mb-4">
                        {#if searchQuery.trim()}
                            No courses match your search "{searchQuery}".
                        {:else}
                            No courses available in this category.
                        {/if}
                    </p>
                    <button
                        onclick={() => { selectedType = 'all'; searchQuery = ''; }}
                        class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                    >
                        View All Courses
                    </button>
                </div>
            </div>
        {/if}
    </div>
</div>

