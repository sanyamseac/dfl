<script>
  import { onMount } from 'svelte';
  
  let activeSection = 'vision-mission';
  
  // Handle smooth scrolling and active section tracking
  onMount(() => {
    const sections = document.querySelectorAll('.scroll-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeSection = entry.target.id;
        }
      });
    }, { threshold: 0.3 });
    
    sections.forEach(section => observer.observe(section));
    
    return () => observer.disconnect();
  });
  
  function scrollToSection(sectionId) {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
</script>

<div class="min-h-screen bg-background">
  <!-- Hero Section -->
  <section class="relative bg-gradient-to-br from-primary/5 via-accent/5 to-tertiary/5 py-16 lg:py-24">
    <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl lg:text-6xl font-bold text-foreground mb-6">
          About <span class="text-primary">DFL</span>
        </h1>
        <p class="text-xl lg:text-2xl text-foreground-alt max-w-3xl mx-auto leading-relaxed">
          Learn more about the Division of Flexible Learning at IIIT Hyderabad
        </p>
      </div>
    </div>
  </section>

  <!-- Main Content -->
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
    <div class="lg:flex lg:gap-12">
      <!-- Navigation Sidebar -->
      <div class="lg:w-64 mb-8 lg:mb-0">
        <div class="sticky top-8">
          <nav class="bg-background-alt rounded-xl border border-border-card p-6 shadow-card">
            <h2 class="text-lg font-semibold text-foreground mb-4">Contents</h2>
            <ul class="space-y-2">
              <li>
                <button 
                  class="nav-link w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 {activeSection === 'vision-mission' ? 'bg-primary text-white' : 'text-foreground-alt hover:bg-muted hover:text-foreground'}"
                  onclick={() => scrollToSection('vision-mission')}
                >
                  Vision & Mission
                </button>
              </li>
              <li>
                <button 
                  class="nav-link w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 {activeSection === 'director-team' ? 'bg-primary text-white' : 'text-foreground-alt hover:bg-muted hover:text-foreground'}"
                  onclick={() => scrollToSection('director-team')}
                >
                  Director & DFL Team
                </button>
              </li>
              <li>
                <button 
                  class="nav-link w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 {activeSection === 'leadership' ? 'bg-primary text-white' : 'text-foreground-alt hover:bg-muted hover:text-foreground'}"
                  onclick={() => scrollToSection('leadership')}
                >
                  Coordination Committee
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <!-- Content Area -->
      <div class="flex-1 space-y-16">
        <!-- Vision & Mission Section -->
        <section id="vision-mission" class="scroll-section">
          <div class="bg-background-alt rounded-2xl border border-border-card p-8 shadow-card">
            <h2 class="text-3xl lg:text-4xl font-bold text-foreground mb-8">Vision & Mission</h2>
            
            <div class="mb-8">
              <img 
                src="assets/img/campus1.jpeg" 
                alt="Division Overview" 
                class="w-full h-64 lg:h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
            
            <div class="prose prose-lg max-w-none">
              <p class="text-lg text-foreground-alt leading-relaxed mb-6">
                The Division of Flexible Learning (DFL) at IIIT Hyderabad is dedicated to providing high-quality education through flexible learning modes. Our vision is to make quality education accessible to all, regardless of geographical constraints or time limitations.
              </p>
              
              <div class="bg-accent/10 rounded-xl p-6 mb-6">
                <h3 class="text-xl font-semibold text-foreground mb-4">Our mission is to:</h3>
                <ul class="p-0 md:pl-10 items-start space-y-3 text-foreground-alt">
                  <li class="flex items-start gap-3">
                    <span class="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
                    Develop and deliver innovative educational programs that meet the needs of working professionals and students
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
                    Leverage technology to create engaging and effective learning experiences
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
                    Foster a community of learners who support and inspire each other
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
                    Contribute to the advancement of knowledge in technology and related fields
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
                    Build partnerships with industry to ensure our programs remain relevant and practical
                  </li>
                </ul>
              </div>
              
              <p class="text-lg text-foreground-alt leading-relaxed">
                Through our commitment to excellence and innovation, we strive to empower individuals with the knowledge and skills they need to succeed in today's rapidly evolving world.
              </p>
            </div>
          </div>
        </section>

        <!-- Director & DFL Team Section -->
        <section id="director-team" class="scroll-section">
          <div class="bg-background-alt rounded-2xl border border-border-card p-8 shadow-card">
            <h2 class="text-3xl lg:text-4xl font-bold text-foreground mb-12">Director & DFL Team</h2>
            
            <!-- Director Profile -->
            <div class="mb-16">
              <div class="bg-gradient-to-r from-primary/5 to-tertiary/5 rounded-2xl p-8">
                <div class="lg:flex lg:gap-8 items-start">
                  <div class="flex-shrink-0 mb-6 lg:mb-0">
                    <a href="https://www.iiit.ac.in/faculty/venkatesh-choppella/" target="_blank" class="block">
                      <img 
                        src="assets/img/team/VenkateshChoppella.png" 
                        alt="Prof. Venkatesh Choppella" 
                        class="w-48 h-48 object-cover rounded-xl shadow-lg mx-auto lg:mx-0 hover:shadow-xl transition-shadow duration-300"
                      />
                    </a>
                  </div>
                  
                  <div class="flex-1 lg:text-left text-center">
                    <h3 class="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                      <a 
                        href="https://www.iiit.ac.in/faculty/venkatesh-choppella/" 
                        target="_blank" 
                        class="hover:text-primary transition-colors duration-200"
                      >
                        Prof. Venkatesh Choppella
                      </a>
                    </h3>
                    <p class="text-primary font-semibold text-lg mb-6">Director, Division of Flexible Learning</p>
                    
                    <div class="space-y-4 text-foreground-alt leading-relaxed">
                      <p>
                        Dr. Venkatesh Choppella serves as an Associate Professor at the International Institute of Information Technology, Hyderabad (IIIT-H), where he also holds the position of Director of the Division of Flexible Learning. His research encompasses programming languages, software architectures, formal methods, and computer science education.
                      </p>
                      
                      <p>
                        Dr. Choppella is notably the Principal Investigator for the 
                        <a 
                          href="https://www.vlab.co.in/participating-institute-iiit-hyderabad" 
                          target="_blank" 
                          class="text-primary font-semibold hover:underline"
                        >
                          Virtual Labs
                        </a>
                        project at IIIT-H, a national initiative involving a consortium of 11 institutes across India. This project has significantly expanded access to experimental learning, particularly during the COVID-19 pandemic.
                      </p>
                      
                      <div class="bg-background rounded-lg p-4 mt-6">
                        <p class="font-semibold text-foreground">
                          Email: <span class="font-normal">venkatesh<span class="hidden">REMOVE</span>.choppella [at] iiit.ac.in</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- DFL Team Grid -->
            <div>
              <h3 class="text-2xl font-bold text-foreground mb-8">DFL Team</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Mr. K. Sudheendra -->
                <div class="bg-background rounded-xl border border-border-card p-6 shadow-card hover:shadow-lg transition-shadow duration-300">
                  <div class="text-center">
                    <img 
                      src="assets/img/team/image_8.jpeg" 
                      alt="Mr. K. Sudheendra" 
                      class="w-24 h-24 object-cover rounded-full mx-auto mb-4 shadow-md"
                    />
                    <h4 class="text-lg font-semibold text-foreground mb-1">Mr. K. Sudheendra</h4>
                    <p class="text-primary font-medium mb-3">Division Executive</p>
                    <div class="text-sm text-foreground-alt space-y-2">
                      <p class="font-medium">sudheendra<span class="hidden">REMOVE</span>.k [at] iiit.ac.in</p>
                      <p class="leading-relaxed">
                        Manages day-to-day operations and ensures implementation of strategic initiatives while maintaining high standards of academic excellence.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Team Member Template for Others -->
                {#each [
                  { name: '[Name Placeholder]', role: 'Accounts Assistant', email: 'accounts', desc: 'Manages financial records, payments, and budgeting within the DFL division.' },
                  { name: '[Name Placeholder]', role: 'Administration Assistant', email: 'admin', desc: 'Supports administrative operations including scheduling and documentation.' },
                  { name: '[Name Placeholder]', role: 'Admissions Assistant', email: 'admissions', desc: 'Manages admissions process and communication with prospective students.' },
                  { name: '[Name Placeholder]', role: 'Course Coordinator', email: 'courses', desc: 'Coordinates course logistics and ensures timely delivery of educational content.' },
                  { name: '[Name Placeholder]', role: 'Operations Manager', email: 'operations', desc: 'Oversees overall operations including planning and monitoring workflows.' },
                  { name: '[Name Placeholder]', role: 'Software Engineer', email: 'software', desc: 'Develops and maintains software systems supporting DFL\'s learning platforms.' },
                  { name: '[Name Placeholder]', role: 'Technical Assistant', email: 'tech', desc: 'Provides technical support for hardware, software, and online platforms.' },
                  { name: '[Name Placeholder]', role: 'Web Developer', email: 'web', desc: 'Designs and maintains DFL website and web-based tools.' }
                ] as member}
                  <div class="bg-background rounded-xl border border-border-card p-6 shadow-card hover:shadow-lg transition-shadow duration-300">
                    <div class="text-center">
                      <img 
                        src="assets/img/team/image_8.jpeg" 
                        alt="{member.name}" 
                        class="w-24 h-24 object-cover rounded-full mx-auto mb-4 shadow-md"
                      />
                      <h4 class="text-lg font-semibold text-foreground mb-1">{member.name}</h4>
                      <p class="text-primary font-medium mb-3">{member.role}</p>
                      <div class="text-sm text-foreground-alt space-y-2">
                        <p class="font-medium">{member.email}<span class="hidden">REMOVE</span>.dfl [at] iiit.ac.in</p>
                        <p class="leading-relaxed">{member.desc}</p>
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </section>

        <!-- Leadership/Coordination Committee Section -->
        <section id="leadership" class="scroll-section">
          <div class="bg-background-alt rounded-2xl border border-border-card p-8 shadow-card">
            <h2 class="text-3xl lg:text-4xl font-bold text-foreground mb-12">DFL Coordination Committee</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {#each [
                { 
                  name: 'Prof. Venkatesh Choppella', 
                  role: 'Chair', 
                  email: 'venkatesh.choppella', 
                  research: 'Programming Languages, Software Architectures, Formal Methods, Computer Science Education',
                  image: 'VenkateshChoppella.png',
                  link: 'https://www.iiit.ac.in/faculty/venkatesh-choppella/'
                },
                { 
                  name: 'Dr. Kishore Kothapalli', 
                  role: 'Dean (Academic), Member', 
                  email: 'kishore', 
                  research: 'Multicore and Many Core Algorithms, Distributed Algorithms',
                  image: 'KishoreKothapalli.png',
                  link: 'https://www.iiit.ac.in/faculty/kishore-kothapalli/'
                },
                { 
                  name: 'Dr. Sujit Gujar', 
                  role: 'Member', 
                  email: 'sujit.gujar', 
                  research: 'Game Theory, Mechanism Design, Machine Learning, Cryptography applied to Modern Web and AI Applications',
                  image: 'SujitGujar.png',
                  link: 'https://www.iiit.ac.in/faculty/sujit-prakash-gujar/'
                },
                { 
                  name: 'Dr. Aakansha Natani', 
                  role: 'Member', 
                  email: 'aakansha.natani', 
                  research: 'Internet and Democracy, E-Governance, Data Ownership and Privacy Debates, Online Civic Engagement',
                  image: 'AakanshaNatani.jpg',
                  link: 'https://hsrc.iiit.ac.in/people/faculty/aakansha.html'
                },
                { 
                  name: 'Dr. Rajakrishnan P Raj Kumar', 
                  role: 'Member', 
                  email: 'raja', 
                  research: 'Computational Linguistics',
                  image: 'RajakrishnanRajkumar.jpg',
                  link: 'https://www.iiit.ac.in/faculty/rajakrishnan-p-rajkumar/'
                },
                { 
                  name: 'Dr. Raman Saxena', 
                  role: 'Member', 
                  email: 'raman.saxena', 
                  research: 'Human-Centered Design, HCI, Interaction Technologies, Design Thinking',
                  image: 'RamanSaxena.png',
                  link: 'https://www.iiit.ac.in/faculty/raman-saxena/'
                }
              ] as member}
                <div class="group">
                  <a 
                    href="{member.link}" 
                    target="_blank" 
                    class="block bg-background rounded-xl border border-border-card p-6 shadow-card hover:shadow-lg transition-all duration-300 group-hover:border-primary/30"
                  >
                    <div class="text-center">
                      <img 
                        src="assets/img/team/{member.image}" 
                        alt="{member.name}" 
                        class="w-28 h-28 object-cover rounded-full mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300"
                      />
                      <h4 class="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
                        {member.name}
                      </h4>
                      <p class="text-primary font-medium mb-3">{member.role}</p>
                      <div class="text-sm text-foreground-alt space-y-3">
                        <p class="font-medium">{member.email}<span class="hidden">REMOVE</span> [at] iiit.ac.in</p>
                        <div>
                          <p class="font-semibold text-foreground mb-1">Research Areas:</p>
                          <p class="leading-relaxed">{member.research}</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              {/each}
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</div>

<style>
  .bg-grid-pattern {
    background-image: 
      linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  }
</style>