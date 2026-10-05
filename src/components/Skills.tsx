import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SKILLS } from "@/data/resume";

const categoryColorMap: Record<string, string> = {
  "Mobile Development": "from-cyan-500 to-blue-600",
  "Programming Languages": "from-violet-500 to-purple-600",
  Frontend: "from-pink-500 to-rose-500",
  Backend: "from-emerald-500 to-green-600",
  Databases: "from-amber-500 to-orange-600",
  "APIs & Authentication": "from-teal-500 to-cyan-600",
  Testing: "from-red-500 to-rose-600",
  "Developer Tools": "from-slate-500 to-zinc-600",
  "Other Skills": "from-indigo-500 to-blue-600",
};

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section ref={sectionRef} id="skills" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-16">
            <span className="text-primary font-semibold uppercase tracking-widest text-xs">
              Skills & Expertise
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 tracking-tight">
              Technical{" "}
              <span className="text-primary">Toolkit</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              Technologies and tools I use to build production applications — organized by domain.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILLS.map((category) => {
              const gradientClass = categoryColorMap[category.category] || "from-gray-500 to-gray-600";
              const isActive = activeCategory === category.category;

              return (
                <motion.div
                  key={category.category}
                  variants={itemVariants}
                  className={`group bg-card border rounded-2xl p-6 transition-all duration-300 cursor-default hover:shadow-lg ${
                    isActive
                      ? "border-primary/40 shadow-lg"
                      : "border-border/40 hover:border-primary/20"
                  }`}
                  onMouseEnter={() => setActiveCategory(category.category)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white text-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">
                        {category.category}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {category.skills.length} skills
                      </span>
                    </div>
                  </div>

                  {/* Skills list */}
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs bg-muted/50 text-foreground/80 rounded-lg border border-border/30 hover:border-primary/30 hover:text-primary transition-all duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
