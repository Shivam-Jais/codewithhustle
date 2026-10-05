import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import { PERSONAL, NAV_LINKS } from "@/data/resume";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-card border-t border-border/40 py-12 relative">
      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </button>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div>
            <a href="#home" className="text-xl font-bold text-foreground inline-flex items-center gap-1">
              SJ
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            </a>
            <p className="text-muted-foreground mt-2 text-sm max-w-xs">
              Software Developer specializing in mobile application development and automation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex justify-center md:justify-end gap-3">
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 border border-border/30"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 border border-border/30"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 border border-border/30"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        <div className="border-t border-border/30 mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-xs flex items-center justify-center gap-1 flex-wrap">
            © {currentYear} {PERSONAL.name}. Built with
            <Heart className="text-primary mx-0.5" size={12} />
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
