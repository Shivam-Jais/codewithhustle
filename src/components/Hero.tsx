import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, ChevronDown } from "lucide-react";
import profileImage from "@/assets/profile-shivam.jpg";

const roles = ["Software Developer", "Mobile App Developer", "Automation Expert"];

// Static particle positions to prevent CLS
const particlePositions = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  top: `${(i * 3.33) % 100}%`,
  left: `${(i * 7.77) % 100}%`,
  delay: `${(i * 0.1) % 3}s`,
  duration: `${2 + (i % 3)}s`,
}));

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const scrollToSection = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Memoize static elements
  const particles = useMemo(() => (
    <div className="absolute inset-0 opacity-30" aria-hidden="true">
      {particlePositions.map((p) => (
        <div
          key={p.id}
          className="absolute w-1 h-1 bg-primary/40 rounded-full animate-pulse"
          style={{
            top: p.top,
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  ), []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" aria-hidden="true" />
      
      {/* Particle dots pattern - optimized with static positions */}
      {particles}

      {/* Decorative Elements - will-change for GPU acceleration */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-primary/20 rounded-full animate-float blur-2xl will-change-transform" aria-hidden="true" />
      <div className="absolute top-40 right-20 w-40 h-40 bg-secondary/20 rounded-full animate-float-delayed blur-2xl will-change-transform" aria-hidden="true" />
      <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-primary/30 rounded-full animate-blob blur-xl will-change-transform" aria-hidden="true" />
      
      {/* Geometric shapes */}
      <svg className="absolute top-32 left-20 w-16 h-16 text-secondary/40 animate-spin-slow will-change-transform" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="20 10" />
      </svg>
      <svg className="absolute bottom-40 right-32 w-20 h-20 text-primary/50 animate-float-delayed will-change-transform" viewBox="0 0 100 100" aria-hidden="true">
        <polygon points="50,15 90,85 10,85" fill="currentColor" />
      </svg>
      <svg className="absolute top-1/2 right-10 w-12 h-12 text-secondary/30 animate-float will-change-transform" viewBox="0 0 100 100" aria-hidden="true">
        <rect x="20" y="20" width="60" height="60" fill="currentColor" rx="10" transform="rotate(45 50 50)" />
      </svg>

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Changed to lg:grid-cols-12 for granular control */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content - 5 columns */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="inline-flex items-center gap-2 bg-muted/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-sm text-muted-foreground">Available for projects</span>
              </div>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
                Hello, I'm{" "}
                <span className="relative inline-block z-10">
                  <span className="bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent relative z-10">
                    Shivam Jaiswal
                  </span>
                  <svg className="absolute -bottom-2 left-0 w-full z-0" viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0,5 Q50,0 100,5 T200,5" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" className="animate-draw" />
                  </svg>
                </span>
              </h1>
              {/* Fixed height to prevent CLS */}
              <div className="text-2xl md:text-3xl font-semibold text-foreground/80 mb-6 min-h-[2.5rem]">
                A <span className="text-primary">{displayText}</span>
                <span className="animate-blink text-primary">|</span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl animate-slide-up" style={{ animationDelay: "0.3s" }}>
              Specializing in mobile application development and automation. Building scalable, 
              performance-driven applications with clean UI and reliable functionality.
            </p>

            <div className="flex flex-wrap gap-4 mb-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <Button variant="hero" size="lg" className="group" asChild>
                <a href="#portfolio">
                  View Portfolio 
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" className="group" asChild>
                <a href="/resume/shivam-jaiswal-resume.pdf" download="shivam-jaiswal-resume.pdf">
                  <Download className="mr-2 group-hover:scale-110 transition-transform" size={20} /> 
                  Download Resume
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-6 animate-slide-up" style={{ animationDelay: "0.5s" }}>
              <a
                href="https://github.com/Shivam-Jais"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-12 h-12 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow"
              >
                <Github size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/shivam-jaiswal-cgu/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-12 h-12 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow"
              >
                <Linkedin size={22} />
              </a>
              <div className="h-10 w-px bg-border" aria-hidden="true" />
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i} 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-500 border-2 border-background flex items-center justify-center text-xs font-bold text-primary-foreground"
                      aria-hidden="true"
                    >
                      {i === 1 ? "☕" : i === 2 ? "📱" : "💻"}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  <strong className="text-foreground text-lg">8+</strong> Projects
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Profile Image Area (7 columns) */}
          <div className="order-1 lg:order-2 lg:col-span-7 flex justify-center">
            <div className="relative animate-fade-in">
              {/* Animated rings - sized for larger image */}
              <div 
                className="absolute inset-0 -m-8 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow will-change-transform" 
                style={{ animationDuration: "20s" }} 
                aria-hidden="true"
              />
              <div 
                className="absolute inset-0 -m-16 rounded-full border-2 border-dotted border-secondary/20 animate-spin-slow will-change-transform" 
                style={{ animationDuration: "30s", animationDirection: "reverse" }} 
                aria-hidden="true"
              />
              
              {/* Background glow - increased scale */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full blur-3xl scale-150 animate-pulse will-change-transform" aria-hidden="true" />
              
              {/* Image container - 450px on desktop */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden border-4 border-primary/30 shadow-elevated">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-10 pointer-events-none" aria-hidden="true" />
                <img
                  src={profileImage}
                  alt="Shivam Jaiswal - Software Developer"
                  width={450}
                  height={450}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Floating badge - adjusted position for larger radius */}
              <div className="absolute -bottom-6 -left-6 bg-background/90 backdrop-blur-sm rounded-2xl p-4 shadow-elevated flex items-center gap-3 animate-float border border-border will-change-transform">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-500 rounded-xl flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-2xl">4+</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Months</p>
                  <p className="font-bold text-foreground text-lg">Experience</p>
                </div>
              </div>

              {/* Tech floating badge */}
              <div className="absolute top-6 -right-10 bg-background/90 backdrop-blur-sm rounded-xl px-5 py-3 shadow-elevated animate-float-delayed hidden md:block border border-border will-change-transform">
                <p className="text-base font-semibold text-foreground">React Native</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button 
        onClick={scrollToSection}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer animate-bounce will-change-transform"
        aria-label="Scroll to About section"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} />
      </button>
    </section>
  );
};

export default Hero;
