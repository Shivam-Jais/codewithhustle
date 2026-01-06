import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Github, Linkedin, Send, Loader2, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 6371272745",
    href: "tel:+916371272745",
  },
  {
    icon: Mail,
    label: "Email",
    value: "sivamjaiswal322@gmail.com",
    href: "mailto:sivamjaiswal322@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bhubaneswar, Odisha, India",
    href: "#",
  },
];

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await emailjs.sendForm(
        "service_38aeh9e",
        "template_nji4xof",
        formRef.current,
        "Hn2VL7n7EPArqaQb5"
      );

      setIsSuccess(true);
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border-4 border-primary/10 rounded-full animate-spin-slow" style={{ animationDuration: "25s" }} />
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-secondary/10 rounded-2xl rotate-45 animate-float" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">Contact</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Let's Work Together
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how I can help bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 text-secondary-foreground relative overflow-hidden">
              {/* Decorative pattern */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-secondary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary-foreground/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <h3 className="text-2xl font-bold mb-6 relative">Get in Touch</h3>
              <p className="opacity-90 mb-8 relative">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>

              <div className="space-y-6 relative">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-4 group hover:translate-x-2 transition-transform duration-300"
                  >
                    <div className="w-14 h-14 bg-secondary-foreground/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-secondary-foreground/30 transition-colors">
                      <info.icon size={24} />
                    </div>
                    <div>
                      <p className="text-sm opacity-70">{info.label}</p>
                      <p className="font-medium">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-secondary-foreground/20 relative">
                <p className="text-sm opacity-70 mb-4">Follow me on social media</p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/Shivam-Jais"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-secondary-foreground/20 rounded-xl flex items-center justify-center hover:bg-secondary-foreground/40 hover:scale-110 transition-all duration-300"
                  >
                    <Github size={24} />
                  </a>
                  <a
                    href="https://linkedin.com/in/shivam_6371"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-secondary-foreground/20 rounded-xl flex items-center justify-center hover:bg-secondary-foreground/40 hover:scale-110 transition-all duration-300"
                  >
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-background rounded-3xl p-8 shadow-elevated border border-border/50">
            <h3 className="text-2xl font-bold text-foreground mb-6">Send a Message</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="from_name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={isLoading}
                  className="h-12 rounded-xl border-border focus:border-primary focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors">
                  Your Email
                </label>
                <Input
                  id="email"
                  name="from_email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={isLoading}
                  className="h-12 rounded-xl border-border focus:border-primary focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="group">
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  disabled={isLoading}
                  rows={5}
                  className="rounded-xl border-border focus:border-primary focus:ring-primary/20 resize-none transition-all"
                />
              </div>
              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={20} />
                    Sending...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle className="mr-2" size={20} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="mr-2 group-hover:translate-x-1 transition-transform" size={20} />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
