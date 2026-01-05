import { Button } from "@/components/ui/button";
import { CheckCircle, Download } from "lucide-react";

const About = () => {
  const highlights = [
    { number: "8+", label: "Projects Completed" },
    { number: "4+", label: "Months Experience" },
    { number: "100%", label: "Client Satisfaction" },
  ];

  const experiences = [
    "React Native (Expo) Development",
    "Android Development (Java)",
    "REST API Integration",
    "Windows Installer (EXE/MSI)",
  ];

  return (
    <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-muted/50 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image/Visual */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-muted rounded-3xl p-8 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 border-4 border-primary/30 rounded-2xl" />
                <div className="absolute bottom-8 left-8 w-16 h-16 bg-secondary/20 rounded-full" />
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-foreground">MCA</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Master of Computer Applications</h4>
                      <p className="text-sm text-muted-foreground">C. V. Raman Global University</p>
                    </div>
                  </div>
                  
                  <div className="bg-background rounded-2xl p-6 shadow-card">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-muted-foreground">CGPA</span>
                      <span className="text-2xl font-bold text-gradient">8.56</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="gradient-primary h-2 rounded-full" style={{ width: "85.6%" }} />
                    </div>
                  </div>

                  <div className="bg-background rounded-2xl p-6 shadow-card">
                    <h5 className="font-semibold text-foreground mb-3">Current Role</h5>
                    <p className="text-muted-foreground text-sm">
                      Software Developer (Mobile & Automation)
                    </p>
                    <p className="text-primary font-medium mt-1">
                      Abrosys Technology Pvt. Ltd.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating stats */}
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 bg-background rounded-2xl p-4 shadow-elevated hidden lg:block">
              {highlights.map((item, index) => (
                <div key={index} className={`text-center ${index !== 0 ? "mt-4 pt-4 border-t border-border" : ""}`}>
                  <p className="text-2xl font-bold text-gradient">{item.number}</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Content */}
          <div>
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
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="text-primary" size={20} />
                  <span className="text-sm text-foreground">{exp}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" asChild>
                <a href="#contact">
                  Hire Me
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#portfolio">
                  <Download className="mr-2" size={18} /> Download CV
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
