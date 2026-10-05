import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { PERSONAL, getExperienceDuration, EXPERIENCE } from "@/data/resume";
import profileImage from "@/assets/profile-shivam.jpg";

const roles = ["Software Developer", "React Native Developer", "Mobile App Engineer"];

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const expDuration = getExperienceDuration();

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const techBadges = ["React Native", "Expo", "REST APIs", "Firebase", "Node.js", "Git"];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-background to-secondary/[0.03]"
        aria-hidden="true"
      />

      {/* Minimal grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Soft ambient glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] will-change-transform" aria-hidden="true" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] will-change-transform" aria-hidden="true" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              {/* Status badge */}
              <div className="inline-flex items-center gap-2 bg-muted/60 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-border/40">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-sm text-muted-foreground">
                  {EXPERIENCE.role} at {EXPERIENCE.company}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground leading-[1.15] mb-4 tracking-tight">
                Hi, I'm{" "}
                <span className="text-primary">{PERSONAL.name.split(" ")[0]}</span>
                <br />
                <span className="text-foreground/90">{PERSONAL.name.split(" ")[1]}</span>
              </h1>

              {/* Typewriter role - fixed height */}
              <div className="text-xl md:text-2xl font-medium text-muted-foreground mb-6 min-h-[2rem] flex items-center">
                <span className="text-primary font-semibold">{displayText}</span>
                <span className="animate-blink text-primary ml-0.5 font-light">|</span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-base lg:text-lg text-muted-foreground mb-6 max-w-lg leading-relaxed"
            >
              Building production mobile applications with React Native & Expo.
              Specializing in API integrations, testing, and delivering reliable software
              at {EXPERIENCE.company}.
            </motion.p>

            {/* Experience badge — dynamically calculated */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="flex items-center gap-3 bg-muted/40 border border-border/40 rounded-2xl px-5 py-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">{expDuration.shortLabel}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Professional Experience</p>
                  <p className="text-xs text-muted-foreground">
                    {expDuration.startLabel} — Present · {expDuration.label}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tech badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {techBadges.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-medium bg-muted/50 text-muted-foreground rounded-full border border-border/30 hover:border-primary/30 hover:text-primary transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <Button variant="hero" size="lg" className="group rounded-full" asChild>
                <a href="#projects">
                  View Projects
                  <ArrowRight
                    className="ml-1 group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" className="group rounded-full" asChild>
                <a href={PERSONAL.resumePath} download="shivam-jaiswal-resume.pdf">
                  <Download
                    className="mr-1 group-hover:scale-110 transition-transform"
                    size={18}
                  />
                  Resume
                </a>
              </Button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-10 h-10 rounded-full bg-muted/50 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-110 border border-border/30"
              >
                <Github size={18} />
              </a>
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-10 h-10 rounded-full bg-muted/50 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-110 border border-border/30"
              >
                <Linkedin size={18} />
              </a>
            </motion.div>
          </div>

          {/* Right: Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              {/* Ambient glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl scale-110 will-change-transform" aria-hidden="true" />

              {/* Main image container */}
              <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-3xl overflow-hidden border-2 border-border/30 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent z-10 pointer-events-none" aria-hidden="true" />
                <img
                  src={profileImage}
                  alt={`${PERSONAL.name} - ${PERSONAL.title}`}
                  width={400}
                  height={400}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating experience badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-background/90 backdrop-blur-md rounded-2xl py-3 px-4 shadow-lg border border-border/40 flex items-center gap-3"
              >
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">
                    {expDuration.shortLabel}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Experience</p>
                  <p className="font-semibold text-foreground text-sm">
                    {EXPERIENCE.role.split(" (")[0]}
                  </p>
                </div>
              </motion.div>

              {/* Floating tech badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute -top-2 -right-4 bg-background/90 backdrop-blur-md rounded-xl px-4 py-2.5 shadow-lg border border-border/40 hidden md:flex items-center gap-2"
              >
                <span className="text-lg">⚛️</span>
                <span className="text-sm font-semibold text-foreground">React Native</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        aria-label="Scroll to About section"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>
    </section>
  );
};

export default Hero;
