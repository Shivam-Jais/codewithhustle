import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div>
            <a href="#home" className="text-2xl font-bold">
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
                className="text-background/60 hover:text-primary transition-colors text-sm"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-end gap-4">
            <a
              href="https://github.com/Shivam-Jais"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/shivam_6371"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:sivamjaiswal322@gmail.com"
              className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-8 text-center">
          <p className="text-background/60 text-sm flex items-center justify-center gap-1">
            © {currentYear} Shivam Jaiswal. Made with <Heart className="text-primary" size={16} /> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
