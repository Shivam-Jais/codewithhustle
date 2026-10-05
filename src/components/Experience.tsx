import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle2 } from "lucide-react";
import { EXPERIENCE, getExperienceDuration } from "@/data/resume";

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const expDuration = getExperienceDuration();

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
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-muted/20 relative overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" aria-hidden="true" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-16">
            <span className="text-primary font-semibold uppercase tracking-widest text-xs">
              Experience
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 tracking-tight">
              Professional{" "}
              <span className="text-primary">Journey</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              My current role and responsibilities as a Software Developer.
            </p>
          </motion.div>

          {/* Experience timeline */}
          <div className="max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="relative">
              <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent" aria-hidden="true" />

              {/* Company Card */}
              <motion.div variants={itemVariants} className="relative pl-8 md:pl-20">
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 top-0 -translate-x-1/2 z-10">
                  <div className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/30" />
                  <div className="w-4 h-4 rounded-full bg-primary/30 absolute inset-0 animate-ping" />
                </div>

                {/* Card */}
                <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all duration-300 group">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Briefcase className="text-primary" size={22} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          {EXPERIENCE.role}
                        </h3>
                        <p className="text-primary font-semibold mt-0.5">
                          {EXPERIENCE.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        {EXPERIENCE.startDate} — {EXPERIENCE.endDate}
                      </span>
                      <span className="inline-flex items-center px-3 py-1.5 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                        {expDuration.label}
                      </span>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="space-y-3">
                    {EXPERIENCE.responsibilities.map((resp, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-start gap-3 group/item"
                      >
                        <CheckCircle2
                          className="text-primary shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform"
                          size={16}
                        />
                        <p className="text-sm text-muted-foreground leading-relaxed group-hover/item:text-foreground transition-colors">
                          {resp}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Key tech used */}
                  <div className="mt-6 pt-6 border-t border-border/30">
                    <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-medium">
                      Key Technologies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "React Native",
                        "Expo",
                        "REST/SOAP APIs",
                        "JWT",
                        "Firebase",
                        "FCM",
                        "EAS Build",
                        "Postman",
                        "Git",
                        "Android Studio",
                      ].map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs bg-muted/60 text-foreground rounded-lg border border-border/30 hover:border-primary/30 hover:text-primary transition-all duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
