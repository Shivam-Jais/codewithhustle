import { Smartphone, Code, Palette, Bug, Settings, Zap } from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Building high-performance Android & React Native applications with clean UI and smooth user experience.",
  },
  {
    icon: Code,
    title: "API Integration",
    description: "Seamless REST API integration and backend support to connect your applications with powerful services.",
  },
  {
    icon: Palette,
    title: "UI Implementation",
    description: "Transforming design mockups into pixel-perfect, responsive interfaces that look great on all devices.",
  },
  {
    icon: Bug,
    title: "App Testing & Bug Fixing",
    description: "Comprehensive testing and debugging to ensure your application runs flawlessly.",
  },
  {
    icon: Settings,
    title: "Automation & Tools",
    description: "Creating automation scripts and internal tools to streamline workflows and boost productivity.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Optimizing application performance for faster load times and better user experience.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3" />

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
              className="group bg-background rounded-3xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-primary/20"
            >
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="text-primary-foreground" size={28} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
