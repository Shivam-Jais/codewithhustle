import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Github, Linkedin } from "lucide-react";
import profileImage from "@/assets/profile-shivam.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full animate-float blur-xl" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-secondary/20 rounded-full animate-float-delayed blur-xl" />
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary/30 rounded-full animate-blob" />
      
      {/* Decorative Shapes */}
      <svg className="absolute top-32 left-20 w-12 h-12 text-secondary animate-float" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" />
      </svg>
      <svg className="absolute bottom-40 right-32 w-16 h-16 text-primary animate-float-delayed" viewBox="0 0 100 100">
        <path d="M50 10 L90 90 L10 90 Z" fill="currentColor" opacity="0.3" />
      </svg>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">Available for projects</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Hello, I'm{" "}
              <span className="text-gradient">Shivam Jaiswal</span>
              <br />
              A Software Developer
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Specializing in mobile application development and automation. Building scalable, 
              performance-driven applications with clean UI and reliable functionality.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button variant="hero" size="lg" asChild>
                <a href="#portfolio">
                  View Portfolio <ArrowRight className="ml-2" size={20} />
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="#about">
                  <Play className="mr-2" size={20} /> Watch Intro
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/Shivam-Jais"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com/in/shivam_6371"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <div className="h-8 w-px bg-border" />
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-background" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  <strong className="text-foreground">8+</strong> Projects Delivered
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center animate-fade-in">
            <div className="relative">
              {/* Background decorative circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl scale-110" />
              
              {/* Yellow background shape */}
              <div className="absolute -top-4 -right-4 w-80 h-80 md:w-96 md:h-96 gradient-primary rounded-3xl rotate-6 opacity-90" />
              
              {/* Image container */}
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden border-4 border-background shadow-elevated">
                <img
                  src={profileImage}
                  alt="Shivam Jaiswal - Software Developer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-background rounded-2xl p-4 shadow-elevated flex items-center gap-3">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">4+</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Months</p>
                  <p className="font-semibold text-foreground">Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
