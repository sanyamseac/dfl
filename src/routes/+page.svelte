
<script lang="ts">
  import { onMount } from 'svelte';
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { goto } from '$app/navigation'

  let currentSlide = 0;
  let autoPlayInterval: NodeJS.Timeout | undefined;

  const slides = [
    {
      image: 'https://dfl.iiit.ac.in/assets/img/slide/lab1.png',
      title: 'Welcome to Division of Flexible Learning',
      subtitle: 'Empowering Education Through Innovation',
      description: 'Discover cutting-edge research and flexible learning solutions at IIIT Hyderabad'
    },
    {
      image: 'https://dfl.iiit.ac.in/assets/img/slide/at_a_glance1.png', 
      title: 'Research Excellence',
      subtitle: 'Advancing Knowledge and Technology',
      description: 'Leading breakthrough research in computer science and information technology'
    },
    {
      image: 'assets/img/slide/lab1.png',
      title: 'State-of-the-Art Facilities',
      subtitle: 'Modern Labs and Learning Spaces',
      description: 'Experience world-class infrastructure designed for innovative learning'
    }
  ];

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  }

  function goToSlide(index: number) {
    currentSlide = index;
  }

  onMount(() => {
    autoPlayInterval = setInterval(nextSlide, 5000);
    return () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
      }
    };
  });
</script>

<!-- Hero Section -->
<section id="hero" class="relative h-[90vh] overflow-hidden">
  <!-- Background Images -->
  {#each slides as slide, index}
    <div 
      class="absolute inset-0 transition-opacity duration-1000 ease-in-out {currentSlide === index ? 'opacity-100' : 'opacity-0'}"
      style="background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url({slide.image}); background-size: cover; background-position: center; background-repeat: no-repeat;"
    >
      <!-- Content Overlay -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center text-white px-4 max-w-4xl mx-auto">
          <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight {currentSlide === index ? 'animate-fade-in-up' : ''}">
            {slide.title}
          </h1>
          <p class="text-xl md:text-2xl mb-4 font-medium {currentSlide === index ? 'animate-fade-in-up animation-delay-200' : ''}">
            {slide.subtitle}
          </p>
          <p class="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto {currentSlide === index ? 'animate-fade-in-up animation-delay-400' : ''}">
            {slide.description}
          </p>
        </div>
      </div>
    </div>
  {/each}

  <!-- Navigation Controls -->
  <button 
    onclick={prevSlide}
    class="hidden md:inline absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-10"
    aria-label="Previous slide"
  >
    <ChevronLeft size={24} />
  </button>

  <button 
    onclick={nextSlide}
    class="hidden md:inline absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-10"
    aria-label="Next slide"
  >
    <ChevronRight size={24} />
  </button>

  <!-- Slide Indicators -->
  <div class="absolute bottom-20 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
    {#each slides as _, index}
      <button 
        onclick={() => goToSlide(index)}
        class="w-3 h-3 rounded-full transition-all duration-300 {currentSlide === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'}"
        aria-label="Go to slide {index + 1}"
      ></button>
    {/each}
  </div>

  <!-- Scroll Indicator -->
  <div onclick={() => goto('/')} class="absolute bottom-8 right-8 animate-bounce">
    <div class="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
      <div class="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
    </div>
  </div>
</section>

<!-- About Section -->
<section id="about" class="py-20 bg-gradient-to-br from-background to-muted/30">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <!-- Section Header -->
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold text-foreground mb-4">
        At a <span class="text-primary">Glance</span>
      </h2>
      <div class="w-24 h-1 bg-primary mx-auto rounded-full"></div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      
      <!-- Images Column -->
      <div class="order-2 lg:order-1 space-y-8">
        <div class="relative group">
          <div class="overflow-hidden rounded-2xl shadow-card transform group-hover:scale-105 transition-transform duration-500">
            <img 
              src="https://dfl.iiit.ac.in/assets/img/DigLib2.png" 
              alt="Research Laboratory" 
              class="w-full h-64 object-cover"
            />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div class="relative group">
          <div class="overflow-hidden rounded-2xl shadow-card transform group-hover:scale-105 transition-transform duration-500">
            <img 
              src="https://dfl.iiit.ac.in/assets/img/lab2.jpg" 
              alt="Digital Library" 
              class="w-full h-64 object-cover"
            />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-tertiary/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      <!-- Content Column -->
      <div class="order-1 lg:order-2 space-y-8">
        <div>
          <h3 class="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
            Research and Education that Makes a <span class="text-primary">Difference</span>
          </h3>
          
          <div class="space-y-6 text-foreground-alt text-lg leading-relaxed">
            <p>
              International Institute of Information Technology, Hyderabad (IIITH) is an autonomous university, founded as a not-for-profit public private partnership (N-PPP) in 1998, and is the first IIIT in India under this model. Over the years, the institute has evolved strong research programmes in various areas, with an emphasis on technology and applied research for industry and society.
            </p>
            
            <p>
              The institute facilitates interdisciplinary research and a seamless flow of knowledge. Several world-renowned centres of excellence are part of IIITH's research portfolio. It has established various joint collaboration and co-innovation models with an industry outreach spanning significant national and multinational companies.
            </p>
            
            <p>
              Its innovative curriculum allows students the flexibility of selecting their courses and projects. Apart from academics the institute provides students with a comprehensive environment that promotes art and culture, sports, societal contributions and self-governance. Even undergraduate students get to participate in ongoing research and technology development - an opportunity unprecedented in India.
            </p>
          </div>
        </div>

        <div class="mt-8">
          <a href="https://iiit.ac.in" class="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-btn">
            Learn More About IIITH
          </a>
        </div>
      </div>
      
    </div>
  </div>
</section>

<style>
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
  }

  .animation-delay-200 {
    animation-delay: 0.2s;
  }

  .animation-delay-400 {
    animation-delay: 0.4s;
  }
</style>