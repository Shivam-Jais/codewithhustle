import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-foreground text-background py-12 relative">
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 gradient-primary rounded-full flex items-center justify-center shadow-glow hover:scale-110 transition-transform duration-300"
        aria-label="Back to top"
      >
        <ArrowUp size={20} className="text-primary-foreground" />
      </button>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div>
            <a href="#home" className="text-2xl font-bold inline-block hover:scale-105 transition-transform">
              Shivam<span className="text-primary">.</span>
            </a>
            <p className="text-background/60 mt-2 text-sm">
              Software Developer specializing in mobile app development and automation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {["Home", "About", "Services", "Portfolio", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-background/60 hover:text-primary transition-colors text-sm relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end gap-4">
            <a
              href="https://github.com/Shivam-Jais"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/shivam_6371"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:sivamjaiswal322@gmail.com"
              className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-8 text-center">
          <p className="text-background/60 text-sm flex items-center justify-center gap-1 flex-wrap">
            © {currentYear} Shivam Jaiswal. Made with 
            <Heart className="text-primary animate-pulse mx-1" size={16} /> 
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
