import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronRight, Layers, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROJECTS, PERSONAL, type Project } from "@/data/resume";
import { useNavigate } from "react-router-dom";

const categoryLabels: Record<string, string> = {
  all: "All Projects",
  mobile: "Mobile",
  desktop: "Desktop",
  automation: "Automation",
  web: "Web",
};

const categoryColors: Record<string, string> = {
  mobile: "from-cyan-500 to-blue-600",
  desktop: "from-violet-500 to-purple-600",
  automation: "from-emerald-500 to-green-600",
  web: "from-pink-500 to-rose-500",
};

const categoryIcons: Record<string, string> = {
  mobile: "📱",
  desktop: "🖥️",
  automation: "🤖",
  web: "🌐",
};

const Projects = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleProjectClick = (project: Project) => {
    if (project.detailPagePath) {
      navigate(project.detailPagePath);
    } else {
      setSelectedProject(project);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const categories = ["all", ...new Set(PROJECTS.map((p) => p.category))];
  const filteredProjects =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  // Sort featured first
  const sortedProjects = [...filteredProjects].sort(
    (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
  );

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
      id="projects"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-muted/20 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" aria-hidden="true" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-12">
            <span className="text-primary font-semibold uppercase tracking-widest text-xs">
              Projects
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 tracking-tight">
              Featured{" "}
              <span className="text-primary">Work</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              Production applications and tools I've built or contributed to — from mobile apps to automation systems.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-2 mb-10"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card text-muted-foreground border border-border/40 hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {sortedProjects.map((project) => {
                // Determine project image / logo for the card header
                const projectImages: Record<string, { logo?: string; bg?: string }> = {
                  TaskCafe: { logo: "/taskcafe/taskcafe-logo.png", bg: "/taskcafe/1.png" },
                  "P-GYM": { bg: "/p-gym/pgym-dashboard.png" },
                  COGNISEXT: { logo: "/cognitext/cogitext-logo.png", bg: "/cognitext/6.png" },
                  "ETA Mobile Application": { logo: "/eta-mobile/eta-logo.png", bg: "/eta-mobile/3.png" },
                };
                const cardMedia = projectImages[project.title];

                return (
                  <motion.div
                    key={project.title}
                    layout
                    variants={itemVariants}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`group bg-card border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg ${
                      project.featured
                        ? "border-primary/30 hover:border-primary/50"
                        : "border-border/40 hover:border-primary/20"
                    }`}
                    onClick={() => handleProjectClick(project)}
                  >
                    {/* Project header */}
                    <div className={`h-32 relative flex items-end p-5 overflow-hidden ${
                      cardMedia?.bg
                        ? ""
                        : `bg-gradient-to-br ${categoryColors[project.category] || "from-gray-500 to-gray-600"}`
                    }`}>
                      {/* Background image for projects with screenshots */}
                      {cardMedia?.bg && (
                        <>
                          <img
                            src={cardMedia.bg}
                            alt={`${project.title} preview`}
                            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                        </>
                      )}

                      {/* Category icon (only for non-image cards) */}
                      {!cardMedia?.bg && (
                        <span className="absolute top-4 right-4 text-2xl opacity-40">
                          {categoryIcons[project.category]}
                        </span>
                      )}

                      {/* App logo badge */}
                      {cardMedia?.logo && (
                        <div className="absolute top-3 right-3 w-9 h-9 rounded-xl overflow-hidden border border-white/20 shadow-lg bg-[#0a0a14]">
                          <img
                            src={cardMedia.logo}
                            alt={`${project.title} logo`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {project.featured && (
                        <span className="absolute top-4 left-4 px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider rounded-full">
                          Featured
                        </span>
                      )}

                      <h3 className="relative text-white font-bold text-lg leading-tight drop-shadow-sm">
                        {project.title}
                      </h3>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[11px] bg-muted/60 text-foreground/70 rounded-md border border-border/30"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className="px-2 py-0.5 text-[11px] text-muted-foreground">
                            +{project.technologies.length - 5}
                          </span>
                        )}
                      </div>

                      {/* View details CTA */}
                      <div className="flex items-center text-sm text-primary font-medium group-hover:gap-2 gap-1 transition-all duration-300">
                        {project.detailPagePath ? (
                          <>
                            View Case Study
                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </>
                        ) : (
                          <>
                            View Details
                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* GitHub CTA */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <Button variant="heroOutline" className="rounded-full group" asChild>
              <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 group-hover:rotate-12 transition-transform" size={18} />
                View All on GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border/50 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className={`h-40 bg-gradient-to-br ${categoryColors[selectedProject.category] || "from-gray-500 to-gray-600"} relative flex items-end p-6 rounded-t-2xl`}>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>

                {selectedProject.featured && (
                  <span className="absolute top-4 left-4 px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider rounded-full">
                    Featured
                  </span>
                )}

                <div>
                  <span className="text-white/70 text-xs uppercase tracking-wider font-medium">
                    {categoryLabels[selectedProject.category] || selectedProject.category}
                  </span>
                  <h3 className="text-white font-bold text-2xl mt-1">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Highlights */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Layers size={14} className="text-primary" />
                    Key Contributions
                  </h4>
                  <div className="space-y-2.5">
                    {selectedProject.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs bg-muted/60 text-foreground rounded-lg border border-border/30 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {selectedProject.githubUrl && (
                  <div className="pt-2">
                    <Button variant="heroOutline" size="sm" className="rounded-full" asChild>
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={14} className="mr-2" />
                        View on GitHub
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
