import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Briefcase, GraduationCap, Star } from "lucide-react";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const highlights = [
    { number: "8+", label: "Projects Completed", icon: Star },
    { number: "4+", label: "Months Experience", icon: Briefcase },
    { number: "100%", label: "Client Satisfaction", icon: CheckCircle },
  ];

  const experiences = [
    "React Native (Expo) Development",
    "Android Development (Java)",
    "REST API Integration",
    "Windows Installer (EXE/MSI)",
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-muted/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />
      
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <div className={`relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <div className="relative z-10">
              <div className="bg-muted rounded-3xl p-8 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 border-4 border-primary/30 rounded-2xl animate-float" />
                <div className="absolute bottom-8 left-8 w-16 h-16 bg-secondary/20 rounded-full animate-float-delayed" />
                
                <div className="space-y-6">
                  {/* Education Card */}
                  <div className="flex items-center gap-4 group">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-glow">
                      <GraduationCap className="text-primary-foreground" size={28} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Master of Computer Applications</h4>
                      <p className="text-sm text-muted-foreground">C. V. Raman Global University</p>
                    </div>
                  </div>
                  
                  {/* CGPA Progress */}
                  <div className="bg-background rounded-2xl p-6 shadow-card hover:shadow-elevated transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-muted-foreground">CGPA</span>
                      <span className="text-3xl font-bold text-gradient">8.56</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div 
                        className="gradient-primary h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: isVisible ? "85.6%" : "0%" }}
                      />
                    </div>
                  </div>

                  {/* Current Role */}
                  <div className="bg-background rounded-2xl p-6 shadow-card hover:shadow-elevated transition-shadow duration-300 group">
                    <div className="flex items-center gap-3 mb-3">
                      <Briefcase className="text-primary" size={20} />
                      <h5 className="font-semibold text-foreground">Current Role</h5>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Software Developer (Mobile & Automation)
                    </p>
                    <p className="text-primary font-medium mt-1 group-hover:translate-x-1 transition-transform">
                      Abrosys Technology Pvt. Ltd.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating stats */}
            <div className={`absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 bg-background rounded-2xl p-4 shadow-elevated hidden lg:block transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              {highlights.map((item, index) => (
                <div key={index} className={`text-center group ${index !== 0 ? "mt-4 pt-4 border-t border-border" : ""}`}>
                  <div className="flex justify-center mb-1">
                    <item.icon className="text-primary group-hover:scale-110 transition-transform" size={18} />
                  </div>
                  <p className="text-2xl font-bold text-gradient">{item.number}</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Content */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">About Me</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              Building Solutions, Not Just Applications
            </h2>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              I'm a passionate Software Developer specializing in mobile application development and automation. 
              With hands-on experience in React Native (Expo), Android (Java), and REST APIs, I build scalable, 
              performance-driven applications with clean UI and reliable functionality.
            </p>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Currently at Abrosys Technology Pvt. Ltd., I transform complex requirements into practical 
              digital solutions. My approach combines technical expertise with creative problem-solving.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {experiences.map((exp, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="text-primary group-hover:scale-110 transition-transform" size={20} />
                  <span className="text-sm text-foreground group-hover:text-primary transition-colors">{exp}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" className="group" asChild>
                <a href="#contact">
                  Hire Me
                </a>
              </Button>
              <Button variant="outline" className="group" asChild>
                <a href="#portfolio">
                  <Download className="mr-2 group-hover:animate-bounce" size={18} /> Download CV
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
