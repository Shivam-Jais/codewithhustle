import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PERSONAL,
  PROFESSIONAL_SUMMARY,
  EXPERIENCE,
  EDUCATION,
  getExperienceDuration,
} from "@/data/resume";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const expDuration = getExperienceDuration();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="about" ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-muted/30 to-transparent" aria-hidden="true" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-16">
            <span className="text-primary font-semibold uppercase tracking-widest text-xs">
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6 tracking-tight">
              Building Production Software<br />
              <span className="text-muted-foreground">That Solves Real Problems</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left: About text and summary — 3 columns */}
            <motion.div variants={itemVariants} className="lg:col-span-3 space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a Software Developer at <strong className="text-foreground">{EXPERIENCE.company}</strong>, 
                where I build and maintain production mobile applications using React Native and Expo. My work spans 
                the full mobile development lifecycle — from API integration and authentication to testing, build 
                generation, and deployment.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                {PROFESSIONAL_SUMMARY}
              </p>

              {/* Key facts */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Briefcase className="text-primary" size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{EXPERIENCE.role}</p>
                    <p className="text-xs text-muted-foreground">
                      {EXPERIENCE.startDate} — {EXPERIENCE.endDate} · {expDuration.label}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                    <GraduationCap className="text-secondary" size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{EDUCATION.degree}</p>
                    <p className="text-xs text-muted-foreground">
                      {EDUCATION.university} · CGPA: {EDUCATION.cgpa}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="text-primary" size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{PERSONAL.location}</p>
                    <p className="text-xs text-muted-foreground">India</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="heroOutline" className="rounded-full group" asChild>
                  <a href={PERSONAL.resumePath} download="shivam-jaiswal-resume.pdf">
                    <Download className="mr-2 group-hover:scale-110 transition-transform" size={16} />
                    Download Resume
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Right: Education & Status cards — 2 columns */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
              {/* Education Card */}
              <div className="bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                    <GraduationCap className="text-primary-foreground" size={20} />
                  </div>
                  <h4 className="font-semibold text-foreground">Education</h4>
                </div>
                <p className="text-sm font-medium text-foreground">{EDUCATION.degree}</p>
                <p className="text-xs text-muted-foreground mt-1">{EDUCATION.university}</p>
                <p className="text-xs text-muted-foreground">{EDUCATION.location}</p>

                {/* CGPA bar */}
                <div className="mt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-muted-foreground">CGPA</span>
                    <span className="text-sm font-bold text-primary">{EDUCATION.cgpa}/10</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={isVisible ? { width: `${(EDUCATION.cgpa / 10) * 100}%` } : {}}
                      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>

              {/* Current role card */}
              <div className="bg-card border border-border/50 rounded-2xl p-6 hover:border-secondary/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Briefcase className="text-secondary-foreground" size={20} />
                  </div>
                  <h4 className="font-semibold text-foreground">Current Role</h4>
                </div>
                <p className="text-sm font-medium text-foreground">{EXPERIENCE.role}</p>
                <p className="text-xs text-primary font-medium mt-1">{EXPERIENCE.company}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    {expDuration.startLabel} — Present
                  </span>
                </div>
              </div>

              {/* Experience summary */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6">
                <div className="text-center">
                  <span className="text-3xl font-bold text-primary block">{expDuration.label}</span>
                  <span className="text-xs text-muted-foreground">
                    Professional Experience
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
