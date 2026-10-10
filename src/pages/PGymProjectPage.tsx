import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Dumbbell,
  CreditCard,
  Bell,
  KeyRound,
  LayoutDashboard,
  Clock,
  Image as ImageIcon,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  X,
  Smartphone,
  Server,
  Database,
  Layers,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

// ─── Feature Data ──────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Dumbbell,
    title: "Membership & Subscription Management",
    description:
      "Create, renew, and track gym membership plans with real-time expiry alerts and plan history.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: CreditCard,
    title: "Razorpay Payment Integration",
    description:
      "Secure in-app subscription checkout with payment receipt verification and transaction logs.",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: Bell,
    title: "Firebase Push Notifications",
    description:
      "Automated push reminders for upcoming subscription expiry, keeping members informed.",
    color: "from-orange-500 to-amber-600",
  },
  {
    icon: KeyRound,
    title: "Password Reset via Email",
    description:
      "Secure token-based password reset flow powered by Node.js and Nodemailer.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: LayoutDashboard,
    title: "Admin Dashboard",
    description:
      "View all members, subscription statuses, revenue metrics, and manage gym plans from one panel.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: Clock,
    title: "Subscription Expiry Reminders",
    description:
      "Cron-driven backend sends automated alerts 3 days before membership expires.",
    color: "from-indigo-500 to-blue-600",
  },
  {
    icon: ImageIcon,
    title: "Exercise & Gallery Content",
    description:
      "Categorised exercise library with detailed images, muscle group tags, and descriptions.",
    color: "from-teal-500 to-cyan-600",
  },
  {
    icon: RefreshCw,
    title: "Force-Update Support",
    description:
      "Server-side version gating ensures users always run the latest build of the app.",
    color: "from-violet-500 to-purple-600",
  },
];

// ─── Tech Stack Data ──────────────────────────────────────────────────────────
const TECH_STACK = [
  { name: "React Native", icon: Smartphone, category: "Frontend", color: "text-cyan-400" },
  { name: "Expo", icon: Zap, category: "Frontend", color: "text-white" },
  { name: "JavaScript", icon: Layers, category: "Language", color: "text-yellow-400" },
  { name: "Node.js", icon: Server, category: "Backend", color: "text-green-400" },
  { name: "Firebase", icon: Bell, category: "Services", color: "text-orange-400" },
  { name: "MongoDB", icon: Database, category: "Database", color: "text-emerald-400" },
  { name: "Razorpay", icon: CreditCard, category: "Payments", color: "text-blue-400" },
  { name: "REST APIs", icon: RefreshCw, category: "Integration", color: "text-purple-400" },
];

// ─── Screenshots Data ──────────────────────────────────────────────────────────
const SCREENSHOTS = [
  {
    src: "/pgym-dashboard.png",
    title: "Home Dashboard",
    description: "Main dashboard with membership status, stats overview, and quick actions.",
  },
  {
    src: "/pgym-membership.png",
    title: "Subscription Plans",
    description: "Browse and subscribe to gym membership plans with integrated Razorpay checkout.",
  },
  {
    src: "/pgym-exercise.png",
    title: "Exercise Gallery",
    description: "Categorised exercise library with muscle group filters and difficulty levels.",
  },
  {
    src: "/pgym-admin.png",
    title: "Admin Dashboard",
    description: "Admin panel showing member management, revenue, and subscription analytics.",
  },
];

// ─── APK Download URL (replace with real URL when ready) ──────────────────────
const APK_URL: string | null = null; // e.g. "https://cdn.example.com/pgym-v1.0.apk"

// ─── Component ────────────────────────────────────────────────────────────────
const PGymProjectPage = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextLightbox = () =>
    setLightboxIndex((i) => (i + 1) % SCREENSHOTS.length);
  const prevLightbox = () =>
    setLightboxIndex((i) => (i - 1 + SCREENSHOTS.length) % SCREENSHOTS.length);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ── Sticky Nav ── */}
      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-2xl border-b border-border/40">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
          <button
            onClick={() => {
              if (window.history.state && window.history.state.idx > 0) {
                navigate(-1);
              } else {
                navigate("/");
              }
            }}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Portfolio
          </button>

          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center transition-all border border-border/30"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            )}

            {/* APK Download CTA */}
            <Button
              variant="hero"
              size="sm"
              className="rounded-full gap-2"
              disabled={!APK_URL}
              onClick={() => {
                if (APK_URL) window.open(APK_URL, "_blank");
              }}
              title={APK_URL ? "Download APK" : "APK coming soon"}
            >
              <Download size={14} />
              Download APK
            </Button>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden py-20 lg:py-32"
        aria-label="P-GYM project overview"
      >
        {/* Background gradient blobs */}
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(250 80% 65%), transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-8 blur-[100px] pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(190 80% 50%), transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Mobile · Android · Featured Project
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight mb-6"
            >
              P
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-primary to-violet-500">
                -GYM
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8"
            >
              A full-stack <strong className="text-foreground">Gym Management Android application</strong> featuring
              membership subscriptions, Razorpay payments, Firebase push notifications,
              an admin dashboard, and automated expiry reminders — built with React Native (Expo) and Node.js.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <Button
                variant="hero"
                size="lg"
                className="rounded-full gap-2 group"
                disabled={!APK_URL}
                onClick={() => {
                  if (APK_URL) window.open(APK_URL, "_blank");
                }}
                id="pgym-download-apk-hero"
                aria-label={APK_URL ? "Download P-GYM APK" : "P-GYM APK coming soon"}
                title={APK_URL ? "Download P-GYM APK" : "APK will be available soon"}
              >
                <Download
                  size={18}
                  className="group-hover:animate-bounce"
                />
                {APK_URL ? "Download APK" : "APK Coming Soon"}
              </Button>

              <Button
                variant="heroOutline"
                size="lg"
                className="rounded-full"
                onClick={() => {
                  document
                    .getElementById("pgym-features")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Features
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Screenshots Gallery ── */}
      <section
        id="pgym-screenshots"
        className="py-20 bg-muted/20 relative"
        aria-label="App screenshots (demo images)"
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={itemVariants} className="mb-10">
              <span className="text-primary font-semibold uppercase tracking-widest text-xs">
                Screenshots
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
                App{" "}
                <span className="text-primary">Preview</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl text-sm">
                ⚠️ The images below are <strong>illustrative demo mockups</strong> and do not represent
                actual production screenshots of P-GYM. They will be replaced with real screenshots
                before launch.
              </p>
            </motion.div>

            {/* Main carousel */}
            <motion.div
              variants={itemVariants}
              className="grid lg:grid-cols-[1fr_280px] gap-6 mb-8"
            >
              {/* Active screenshot */}
              <div
                className="relative rounded-2xl overflow-hidden border border-border/40 bg-card cursor-pointer group aspect-video lg:aspect-auto lg:min-h-[380px]"
                onClick={() => openLightbox(activeScreenshot)}
                role="button"
                tabIndex={0}
                aria-label={`View ${SCREENSHOTS[activeScreenshot].title} fullscreen`}
                onKeyDown={(e) => e.key === "Enter" && openLightbox(activeScreenshot)}
              >
                <img
                  src={SCREENSHOTS[activeScreenshot].src}
                  alt={`${SCREENSHOTS[activeScreenshot].title} — demo mockup`}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="text-white font-bold text-lg leading-tight">
                    {SCREENSHOTS[activeScreenshot].title}
                  </p>
                  <p className="text-white/70 text-sm mt-1">
                    {SCREENSHOTS[activeScreenshot].description}
                  </p>
                </div>
                {/* Expand icon */}
                <div className="absolute top-4 right-4 w-9 h-9 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={16} className="text-white" />
                </div>

                {/* Prev/Next arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveScreenshot((i) => (i - 1 + SCREENSHOTS.length) % SCREENSHOTS.length);
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft size={16} className="text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveScreenshot((i) => (i + 1) % SCREENSHOTS.length);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
                  aria-label="Next screenshot"
                >
                  <ChevronRight size={16} className="text-white" />
                </button>
              </div>

              {/* Thumbnail strip */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                {SCREENSHOTS.map((shot, i) => (
                  <button
                    key={shot.src}
                    onClick={() => setActiveScreenshot(i)}
                    className={`relative rounded-xl overflow-hidden border transition-all duration-300 aspect-video lg:aspect-auto lg:h-[85px] ${
                      activeScreenshot === i
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-border/40 hover:border-primary/30 opacity-60 hover:opacity-100"
                    }`}
                    aria-label={`View ${shot.title}`}
                  >
                    <img
                      src={shot.src}
                      alt={`${shot.title} thumbnail — demo`}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute bottom-1.5 left-2 text-white text-[10px] font-medium leading-tight">
                      {shot.title}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Dot indicators */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2"
            >
              {SCREENSHOTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveScreenshot(i)}
                  className={`rounded-full transition-all duration-300 ${
                    activeScreenshot === i
                      ? "w-6 h-2 bg-primary"
                      : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                  aria-label={`Go to screenshot ${i + 1}`}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section
        id="pgym-features"
        className="py-20 relative"
        aria-label="P-GYM key features"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={itemVariants} className="mb-12">
              <span className="text-primary font-semibold uppercase tracking-widest text-xs">
                Features
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
                What P-GYM{" "}
                <span className="text-primary">Does</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                A comprehensive set of features designed to streamline gym operations for both admins and members.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FEATURES.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    variants={itemVariants}
                    custom={i}
                    className="group bg-card border border-border/40 hover:border-primary/30 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon size={18} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-2 leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Tech Stack Section ── */}
      <section
        id="pgym-tech-stack"
        className="py-20 bg-muted/20 relative"
        aria-label="P-GYM technology stack"
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={itemVariants} className="mb-12">
              <span className="text-primary font-semibold uppercase tracking-widest text-xs">
                Stack
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
                Technology{" "}
                <span className="text-primary">Stack</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                Built with a modern, production-grade technology stack for reliability, performance, and scalability.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {TECH_STACK.map((tech, i) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={tech.name}
                    variants={itemVariants}
                    custom={i}
                    className="group bg-card border border-border/40 hover:border-primary/30 rounded-2xl p-5 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-full bg-muted/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon size={20} className={tech.color} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {tech.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {tech.category}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Download CTA Section ── */}
      <section
        id="pgym-download"
        className="py-24 relative overflow-hidden"
        aria-label="Download P-GYM APK"
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(250 80% 65% / 0.06), transparent)",
          }}
        />

        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-primary mb-6 mx-auto shadow-glow"
            >
              <Dumbbell size={36} className="text-white" />
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4"
            >
              Try{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-primary">
                P-GYM
              </span>{" "}
              on Android
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-lg max-w-lg mx-auto mb-8"
            >
              {APK_URL
                ? "Download the latest APK and install it directly on your Android device."
                : "The APK will be available for download soon. Check back later!"}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                id="pgym-download-apk-main"
                variant="hero"
                size="lg"
                className="rounded-full px-10 gap-3 text-base group"
                disabled={!APK_URL}
                onClick={() => {
                  if (APK_URL) window.open(APK_URL, "_blank");
                }}
                aria-label={
                  APK_URL
                    ? "Download P-GYM APK for Android"
                    : "P-GYM APK is coming soon"
                }
                title={
                  APK_URL
                    ? "Download P-GYM APK"
                    : "APK URL will be set when available"
                }
              >
                <Download
                  size={20}
                  className={APK_URL ? "group-hover:animate-bounce" : "opacity-50"}
                />
                {APK_URL ? "Download APK" : "APK Coming Soon"}
              </Button>

              <Button
                variant="heroOutline"
                size="lg"
                className="rounded-full"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Portfolio
              </Button>
            </motion.div>

            {!APK_URL && (
              <motion.p
                variants={itemVariants}
                className="text-xs text-muted-foreground/60 mt-5"
              >
                * APK URL will be configured once the build is published. The button
                will become active automatically.
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-label="Screenshot lightbox"
            aria-modal="true"
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              aria-label="Close lightbox"
            >
              <X size={18} className="text-white" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={SCREENSHOTS[lightboxIndex].src}
                alt={`${SCREENSHOTS[lightboxIndex].title} — demo mockup`}
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
              <div className="text-center mt-4">
                <p className="text-white font-semibold">
                  {SCREENSHOTS[lightboxIndex].title}
                </p>
                <p className="text-white/60 text-sm mt-1">
                  {SCREENSHOTS[lightboxIndex].description}
                </p>
                <p className="text-white/30 text-xs mt-2">
                  Demo mockup — not a real production screenshot
                </p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={20} className="text-white" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-sm">
              {lightboxIndex + 1} / {SCREENSHOTS.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PGymProjectPage;
