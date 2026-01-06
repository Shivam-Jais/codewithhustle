import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "React Native / Expo", level: 90, icon: "⚛️" },
  { name: "Android (Java)", level: 85, icon: "📱" },
  { name: "REST API Integration", level: 88, icon: "🔗" },
  { name: "Full-Stack Development", level: 75, icon: "🖥️" },
  { name: "Git Version Control", level: 85, icon: "🌿" },
  { name: "Database Management", level: 80, icon: "🗄️" },
];

const softSkills = [
  { name: "Leadership", icon: "👑" },
  { name: "Team Collaboration", icon: "🤝" },
  { name: "Problem-Solving", icon: "🧩" },
  { name: "Effective Communication", icon: "💬" },
  { name: "Adaptability", icon: "🔄" },
  { name: "Time Management", icon: "⏰" },
];

const technologies = [
  { name: "React Native", color: "from-cyan-500 to-blue-500" },
  { name: "Java", color: "from-red-500 to-orange-500" },
  { name: "TypeScript", color: "from-blue-500 to-blue-700" },
  { name: "Node.js", color: "from-green-500 to-green-700" },
  { name: "Git", color: "from-orange-500 to-red-500" },
  { name: "REST API", color: "from-purple-500 to-pink-500" },
  { name: "XML/JSON", color: "from-yellow-500 to-orange-500" },
  { name: "Expo", color: "from-gray-700 to-gray-900" },
];

const Skills = () => {
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

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-muted/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border-4 border-primary/20 rounded-full animate-spin-slow" style={{ animationDuration: "20s" }} />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-secondary/10 rounded-2xl rotate-12 animate-float" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">My Skills</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Technical Expertise
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div className={`bg-background rounded-3xl p-8 shadow-card transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="w-2 h-8 gradient-primary rounded-full" />
              Technical Skills
            </h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div 
                  key={index}
                  className="group"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between mb-2 items-center">
                    <span className="font-medium text-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
                      <span className="text-lg">{skill.icon}</span>
                      {skill.name}
                    </span>
                    <span className="text-primary font-bold text-lg">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className="gradient-primary h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                      style={{ 
                        width: isVisible ? `${skill.level}%` : "0%",
                        transitionDelay: `${index * 150}ms`
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className={`bg-background rounded-3xl p-8 shadow-card transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="w-2 h-8 gradient-secondary rounded-full" />
              Soft Skills
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {softSkills.map((skill, index) => (
                <div
                  key={index}
                  className={`bg-muted rounded-2xl p-5 text-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default group hover:scale-105 hover:shadow-glow ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${(index + 6) * 100}ms` }}
                >
                  <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-primary/10 group-hover:bg-primary-foreground/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <span className="text-3xl">{skill.icon}</span>
                  </div>
                  <span className="font-medium text-sm">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack Icons */}
        <div className={`mt-16 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h3 className="text-center text-lg font-semibold text-muted-foreground mb-8">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="group relative bg-background px-6 py-3 rounded-full shadow-card hover:shadow-elevated hover:-translate-y-2 transition-all duration-300 cursor-default overflow-hidden"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <span className="font-medium text-foreground relative z-10 group-hover:text-primary transition-colors">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
