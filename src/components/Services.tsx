import { useEffect, useRef, useState } from "react";
import { Smartphone, Code, Palette, Bug, Settings, Zap } from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Building high-performance Android & React Native applications with clean UI and smooth user experience.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Code,
    title: "API Integration",
    description: "Seamless REST API integration and backend support to connect your applications with powerful services.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Palette,
    title: "UI Implementation",
    description: "Transforming design mockups into pixel-perfect, responsive interfaces that look great on all devices.",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: Bug,
    title: "App Testing & Bug Fixing",
    description: "Comprehensive testing and debugging to ensure your application runs flawlessly.",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: Settings,
    title: "Automation & Tools",
    description: "Creating automation scripts and internal tools to streamline workflows and boost productivity.",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Optimizing application performance for faster load times and better user experience.",
    color: "from-yellow-500 to-amber-500",
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">Services</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Expertise Services I Offer
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From concept to deployment, I provide comprehensive development services to bring your ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group bg-background rounded-3xl p-8 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-3 border border-transparent hover:border-primary/20 relative overflow-hidden ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className={`relative w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-glow`}>
                <service.icon className="text-primary-foreground" size={28} />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors relative">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed relative">
                {service.description}
              </p>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
