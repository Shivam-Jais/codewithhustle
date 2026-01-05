import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import cafeProject from "@/assets/project-cafe.jpg";
import cameramanProject from "@/assets/project-cameraman.jpg";

const projects = [
  {
    title: "Cafe Website",
    category: "Full-Stack Web Development",
    description: "A modern, responsive cafe website with online ordering capabilities, menu showcase, and booking system.",
    image: cafeProject,
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "https://github.com/Shivam-Jais",
  },
  {
    title: "Portfolio for Cameraman",
    category: "Client Project",
    description: "An elegant portfolio website for a professional photographer with gallery, booking, and contact features.",
    image: cameramanProject,
    technologies: ["React", "Framer Motion", "Responsive Design"],
    liveUrl: "#",
    githubUrl: "https://github.com/Shivam-Jais",
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 lg:py-32 bg-muted/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-20 w-20 h-20 border-4 border-secondary/20 rounded-full" />
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-primary/10 rounded-2xl rotate-45" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Recent Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore some of my recent work showcasing my skills in web and mobile development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-background rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="flex gap-3">
                    <a
                      href={project.liveUrl}
                      className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors"
                    >
                      <ExternalLink className="text-primary-foreground" size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-background rounded-xl flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Github className="text-foreground" size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <span className="text-sm text-primary font-medium">{project.category}</span>
                <h3 className="text-xl font-bold text-foreground mt-1 mb-3">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/Shivam-Jais" target="_blank" rel="noopener noreferrer">
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
