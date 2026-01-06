import { useState, useEffect, useRef } from "react";
import { ExternalLink, Github, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import cafeProject from "@/assets/project-cafe.jpg";
import cameramanProject from "@/assets/project-cameraman.jpg";

const projects = [
  {
    title: "Cafe Website",
    category: "web",
    categoryLabel: "Full-Stack Web Development",
    description: "A modern, responsive cafe website with online ordering capabilities, menu showcase, and booking system.",
    image: cafeProject,
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "https://github.com/Shivam-Jais",
  },
  {
    title: "Portfolio for Cameraman",
    category: "web",
    categoryLabel: "Client Project",
    description: "An elegant portfolio website for a professional photographer with gallery, booking, and contact features.",
    image: cameramanProject,
    technologies: ["React", "Framer Motion", "Responsive Design"],
    liveUrl: "#",
    githubUrl: "https://github.com/Shivam-Jais",
  },
];

const filters = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");
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

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 lg:py-32 bg-muted/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-20 w-20 h-20 border-4 border-secondary/20 rounded-full animate-float" />
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-primary/10 rounded-2xl rotate-45 animate-float-delayed" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Recent Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore some of my recent work showcasing my skills in web and mobile development.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={`flex justify-center gap-2 mb-12 flex-wrap transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                activeFilter === filter.id
                  ? "gradient-primary text-primary-foreground shadow-glow"
                  : "bg-background text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {filter.id === "all" && <Filter className="inline mr-2" size={16} />}
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`group bg-background rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Action buttons */}
                <div className="absolute inset-0 flex items-end p-6 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex gap-3">
                    <a
                      href={project.liveUrl}
                      className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center hover:bg-primary/90 transition-all duration-300 hover:scale-110 shadow-glow"
                    >
                      <ExternalLink className="text-primary-foreground" size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-background rounded-xl flex items-center justify-center hover:bg-muted transition-all duration-300 hover:scale-110"
                    >
                      <Github className="text-foreground" size={20} />
                    </a>
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full">
                  <span className="text-xs font-medium text-primary">{project.categoryLabel}</span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects in this category yet. Check back soon!</p>
          </div>
        )}

        <div className={`text-center mt-12 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <Button variant="outline" size="lg" className="group" asChild>
            <a href="https://github.com/Shivam-Jais" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 group-hover:rotate-12 transition-transform" size={20} />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
