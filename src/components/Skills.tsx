import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "React Native / Expo", level: 90, category: "Mobile" },
  { name: "Android (Java)", level: 85, category: "Mobile" },
  { name: "REST API Integration", level: 88, category: "Backend" },
  { name: "Full-Stack Development", level: 75, category: "Web" },
  { name: "JavaScript / TypeScript", level: 85, category: "Language" },
  { name: "Python", level: 70, category: "Language" },
  { name: "Node.js / Express", level: 78, category: "Backend" },
  { name: "Database (MySQL, MongoDB)", level: 80, category: "Backend" },
];

const softSkills = [
  { name: "Leadership", icon: "👑", description: "Team project guidance" },
  { name: "Team Collaboration", icon: "🤝", description: "Cross-functional work" },
  { name: "Problem-Solving", icon: "🧩", description: "Creative solutions" },
  { name: "Communication", icon: "💬", description: "Clear idea conveyance" },
  { name: "Adaptability", icon: "🔄", description: "Flexible learning" },
  { name: "Time Management", icon: "⏰", description: "Deadline-driven" },
];

const technologies = [
  { name: "React Native", icon: "⚛️", category: "Mobile" },
  { name: "Java", icon: "☕", category: "Language" },
  { name: "TypeScript", icon: "📘", category: "Language" },
  { name: "Python", icon: "🐍", category: "Language" },
  { name: "Node.js", icon: "🟢", category: "Backend" },
  { name: "Express.js", icon: "⚡", category: "Backend" },
  { name: "MongoDB", icon: "🍃", category: "Database" },
  { name: "MySQL", icon: "🐬", category: "Database" },
  { name: "Git", icon: "🌿", category: "Tools" },
  { name: "REST API", icon: "🔗", category: "Backend" },
  { name: "Tailwind CSS", icon: "🎨", category: "Frontend" },
  { name: "Bootstrap", icon: "🅱️", category: "Frontend" },
  { name: "Android Studio", icon: "📱", category: "Tools" },
  { name: "VS Code", icon: "💻", category: "Tools" },
  { name: "Expo", icon: "📲", category: "Mobile" },
  { name: "HTML5/CSS3", icon: "🌐", category: "Frontend" },
];

const categoryColors: Record<string, string> = {
  Mobile: "from-cyan-500 to-blue-600",
  Language: "from-violet-500 to-purple-600",
  Backend: "from-emerald-500 to-green-600",
  Database: "from-orange-500 to-amber-600",
  Frontend: "from-pink-500 to-rose-600",
  Tools: "from-slate-500 to-gray-600",
  Web: "from-blue-500 to-indigo-600",
};

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

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
    <section ref={sectionRef} className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Modern decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/3 to-secondary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
            Skills & Expertise
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Technical <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A comprehensive toolkit spanning mobile development, web technologies, and modern DevOps practices
          </p>
        </motion.div>

        {/* Tech Stack Grid - Modern Hexagon-like layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-xl font-bold text-foreground mb-8 text-center flex items-center justify-center gap-3">
            <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-primary" />
            Technologies I Work With
            <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-primary" />
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
                className="group relative"
              >
                <div className={`relative bg-card p-4 rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 cursor-default overflow-hidden ${hoveredTech === tech.name ? 'scale-110 z-10 shadow-xl' : ''}`}>
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[tech.category]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[tech.category]} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />
                  
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{tech.icon}</span>
                    <span className="text-xs font-medium text-foreground text-center leading-tight">{tech.name}</span>
                  </div>
                  
                  {/* Category badge on hover */}
                  <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-full text-[10px] font-medium bg-gradient-to-r ${categoryColors[tech.category]} text-white opacity-0 group-hover:opacity-100 group-hover:bottom-1 transition-all duration-300 whitespace-nowrap`}>
                    {tech.category}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Technical Skills with animated bars */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-colors duration-500"
          >
            <h3 className="text-xl font-bold text-foreground mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center">
                <span className="text-primary-foreground text-lg">⚡</span>
              </div>
              Technical Proficiency
            </h3>
            <div className="space-y-5">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="group"
                >
                  <div className="flex justify-between mb-2 items-center">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${categoryColors[skill.category]}`} />
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-primary font-bold text-sm">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isVisible ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                      className={`h-full rounded-full bg-gradient-to-r ${categoryColors[skill.category]} relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills - Card Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border/50 hover:border-secondary/30 transition-colors duration-500"
          >
            <h3 className="text-xl font-bold text-foreground mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-purple-500 flex items-center justify-center">
                <span className="text-secondary-foreground text-lg">🎯</span>
              </div>
              Soft Skills
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="group relative bg-muted/30 rounded-2xl p-4 hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 cursor-default hover:scale-105 border border-transparent hover:border-primary/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-background/80 group-hover:bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shrink-0">
                      <span className="text-2xl">{skill.icon}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-foreground text-sm block">{skill.name}</span>
                      <span className="text-muted-foreground text-xs">{skill.description}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Experience highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-3xl p-8 border border-primary/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-bold text-foreground mb-2">Currently Working At</h4>
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">Abrosys Technology Pvt. Ltd.</p>
              <p className="text-foreground mt-1">Software Developer (Mobile & Automation)</p>
            </div>
            <div className="flex gap-4">
              <div className="text-center px-6 py-3 bg-background/50 rounded-2xl">
                <span className="text-3xl font-bold text-primary">4+</span>
                <p className="text-xs text-muted-foreground">Months Exp</p>
              </div>
              <div className="text-center px-6 py-3 bg-background/50 rounded-2xl">
                <span className="text-3xl font-bold text-secondary">3+</span>
                <p className="text-xs text-muted-foreground">Projects</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
