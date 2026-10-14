import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Smartphone,
  Layers,
  Bell,
  RefreshCw,
  Filter,
  LogIn,
  ListTodo,
  PlusCircle,
  UserCircle,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  GitBranch,
  TestTube2,
  Wrench,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.eta.taskcafe&hl=en_IN";

// ─── Screenshot Data ──────────────────────────────────────────────────────────
const SCREENSHOTS = [
  {
    src: "/taskcafe/1.png",
    title: "Login Screen",
    description:
      "Secure sign-in with username/password fields, Keep Sign In option, forgot-password link, and privacy-policy acknowledgement. Shows app version 1.4.1.",
  },
  {
    src: "/taskcafe/2.png",
    title: "My Tasks — Task List",
    description:
      "Dashboard listing tasks assigned to the current user. Each card shows task ID, priority badge (Emergency), status tag (NEW), entered-by field, and task summary. Includes search bar with voice input and filter icon.",
  },
  {
    src: "/taskcafe/6.png",
    title: "New Task Form",
    description:
      "Structured task creation form with dropdown selectors for Workspace, Category, List, Task Type, and Priority. Includes Contact, Reference, Required-By date picker, and Task Summary text field.",
  },
  {
    src: "/taskcafe/5.png",
    title: "Update Task",
    description:
      "Task detail and update sheet with Set Status, Fix, and Sign-Off tabs. Status options: None, NEW, OPEN, ACTIV, ASST, CHECK, OK, FAIL, RFQ. Supports optional notes and file attachment.",
  },
  {
    src: "/taskcafe/4.png",
    title: "Filter Tasks",
    description:
      "Multi-select filter panel across Workspace, Priority, Status, and Task Type dimensions. Includes Reset and Apply Filters actions.",
  },
  {
    src: "/taskcafe/3.png",
    title: "My Profile",
    description:
      "User profile showing name, email, workspace, and member key. Includes force-update status, Log Out, and Delete Account options.",
  },
];

// ─── Features ────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: LogIn,
    title: "Secure Login",
    description:
      "Username/password authentication with Keep Sign In persistence, forgot-password flow, and privacy-policy agreement.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: ListTodo,
    title: "Task Dashboard",
    description:
      "Scrollable task list with task ID, priority label, status badge, entered-by field, and task summary for quick scanning.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: PlusCircle,
    title: "Task Creation",
    description:
      "Structured new-task form with Workspace, Category, List, Task Type, Priority dropdowns, date picker, and voice-enabled summary field.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: RefreshCw,
    title: "Task Status Updates",
    description:
      "Update sheet with Set Status, Fix, and Sign-Off modes supporting NEW, OPEN, ACTIV, ASST, CHECK, OK, FAIL, and RFQ statuses — plus optional notes and attachments.",
    color: "from-orange-500 to-amber-600",
  },
  {
    icon: Filter,
    title: "Advanced Filtering",
    description:
      "Multi-select filter panel for Workspace, Priority, Status, and Task Type with Reset and Apply Filters actions.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: Layers,
    title: "Search & Navigation",
    description:
      "In-app search with voice input, bottom-tab navigation (Tasks, Add, Notifications), and structured screen hierarchy.",
    color: "from-indigo-500 to-blue-600",
  },
  {
    icon: Bell,
    title: "Firebase Notifications",
    description:
      "FCM-based push notifications configured and tested for task-related alerts, with token generation resolved across Android builds.",
    color: "from-teal-500 to-cyan-600",
  },
  {
    icon: UserCircle,
    title: "User Profile",
    description:
      "Profile screen showing user name, email, workspace, and member key — plus force-update awareness and account management.",
    color: "from-rose-500 to-pink-600",
  },
];

// ─── Tech Stack ───────────────────────────────────────────────────────────────
const TECH_STACK = [
  { name: "React Native", icon: Smartphone, category: "Framework", color: "text-cyan-400" },
  { name: "Expo", icon: Cpu, category: "Toolchain", color: "text-white" },
  { name: "JavaScript (ES6+)", icon: Code2, category: "Language", color: "text-yellow-400" },
  { name: "SOAP APIs", icon: Layers, category: "Integration", color: "text-purple-400" },
  { name: "Firebase / FCM", icon: Bell, category: "Services", color: "text-orange-400" },
  { name: "Android Build", icon: Wrench, category: "Platform", color: "text-green-400" },
  { name: "Git", icon: GitBranch, category: "Version Control", color: "text-red-400" },
  { name: "Postman", icon: TestTube2, category: "Testing", color: "text-teal-400" },
];

// ─── Contributions ────────────────────────────────────────────────────────────
const CONTRIBUTIONS = [
  {
    icon: Smartphone,
    title: "React Native UI Implementation",
    description:
      "Implemented and refined screens including Login, My Tasks list, New Task form, Task Update sheet, Filter panel, and User Profile — ensuring consistent layout, spacing, and component behaviour.",
  },
  {
    icon: Layers,
    title: "SOAP API Integration",
    description:
      "Connected UI components to the existing SOAP API backend for task creation, retrieval, filtering, and status updates. Verified request/response payloads and ensured data was displayed correctly.",
  },
  {
    icon: RefreshCw,
    title: "State, Validation & Feedback",
    description:
      "Handled frontend state for form inputs and dropdown selections. Implemented loading indicators, error feedback, and empty states to provide clear user feedback throughout the app.",
  },
  {
    icon: Bell,
    title: "Firebase FCM Configuration",
    description:
      "Configured Firebase Cloud Messaging, resolved FCM token generation issues, and validated push-notification delivery on Android builds.",
  },
  {
    icon: Wrench,
    title: "Android Build & SDK Upgrades",
    description:
      "Upgraded the project for the latest Android SDK requirements. Resolved Gradle dependency conflicts and TypeScript compilation issues. Generated and verified APK releases at version 1.4.1.",
  },
  {
    icon: TestTube2,
    title: "End-to-End Testing",
    description:
      "Performed functional testing across the full task workflow — login, task creation, list display, filtering, status updates, and profile. Identified and fixed frontend defects found during testing.",
  },
];

// ─── Project Metadata ─────────────────────────────────────────────────────────
const META = [
  { label: "My Role", value: "Frontend / React Native Developer" },
  { label: "Platform", value: "Android" },
  { label: "App Version", value: "1.4.1" },
  { label: "Min Android", value: "7.0+" },
  { label: "Publisher", value: "ETAmobile" },
  { label: "Original Release", value: "9 October 2025" },
  { label: "Latest Update", value: "5 October 2026" },
  { label: "Download Size", value: "≈ 33 MB (varies by device)" },
];

// ─── Animation Variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// ─── Component ────────────────────────────────────────────────────────────────
const TaskCafeProjectPage = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const galleryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const nextLightbox = () => setLightboxIndex((i) => (i + 1) % SCREENSHOTS.length);
  const prevLightbox = () => setLightboxIndex((i) => (i - 1 + SCREENSHOTS.length) % SCREENSHOTS.length);

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

  const scrollToGallery = () => galleryRef.current?.scrollIntoView({ behavior: "smooth" });

  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Nav */}
      <nav
        className="sticky top-0 z-40 bg-background/80 backdrop-blur-2xl border-b border-border/40"
        aria-label="Page navigation"
      >
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
            aria-label="Back to portfolio"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </button>

          <div className="flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center transition-all border border-border/30"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            )}
            <Button variant="hero" size="sm" className="rounded-full gap-2" asChild>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View TaskCafe on Google Play"
                id="taskcafe-play-store-nav"
              >
                <ExternalLink size={14} />
                Google Play
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-20 lg:py-32"
        aria-label="TaskCafe project overview"
      >
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(210 80% 55%), transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-8 blur-[100px] pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(40 90% 55%), transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-start">
              {/* Left — content */}
              <div className="max-w-3xl">
                <motion.div variants={itemVariants} className="mb-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Android · Published · Featured Project
                  </span>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-border/40 shadow-lg shrink-0 bg-[#0a0a14]">
                    <img
                      src="/taskcafe/taskcafe-logo.png"
                      alt="TaskCafe app logo — ETA"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-none">
                      Task
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-primary">
                        Cafe
                      </span>
                    </h1>
                    <p className="text-muted-foreground text-base mt-1 font-medium">
                      A streamlined task-entry experience for ETA
                    </p>
                  </div>
                </motion.div>

                <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
                  TaskCafe is an{" "}
                  <strong className="text-foreground">Android task-entry application</strong>{" "}
                  published by ETAmobile. It gives teams a fast, structured way to record tasks,
                  assign priorities, and browse existing entries through a focused, category-driven
                  interface — all backed by SOAP API integration.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-6">
                  {["React Native", "Expo", "JavaScript", "SOAP APIs", "Firebase", "FCM", "Android"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-muted/60 text-foreground/80 rounded-full border border-border/40"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center gap-2 mb-8">
                  <span className="px-3 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full border border-primary/20">
                    My Role: Frontend / React Native Developer
                  </span>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" className="rounded-full gap-2 group" asChild>
                    <a
                      href={PLAY_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      id="taskcafe-play-store-hero"
                      aria-label="View TaskCafe on Google Play Store"
                    >
                      <ExternalLink size={18} className="group-hover:scale-110 transition-transform" />
                      View on Google Play
                    </a>
                  </Button>
                  <Button
                    variant="heroOutline"
                    size="lg"
                    className="rounded-full"
                    onClick={scrollToGallery}
                    id="taskcafe-explore-screenshots"
                    aria-label="Scroll to app screenshots"
                  >
                    Explore Screenshots
                  </Button>
                </motion.div>
              </div>

              {/* Right — hero preview */}
              <motion.div variants={itemVariants} className="hidden lg:block">
                <div className="relative w-[200px]">
                  <div
                    className="absolute inset-0 blur-3xl opacity-25 scale-110 pointer-events-none"
                    style={{ background: "radial-gradient(circle, hsl(210 80% 60%), hsl(40 80% 55%), transparent 70%)" }}
                    aria-hidden="true"
                  />
                  <div className="relative rounded-3xl overflow-hidden border border-border/30 shadow-2xl">
                    <img
                      src={SCREENSHOTS[activeScreenshot].src}
                      alt={`TaskCafe — ${SCREENSHOTS[activeScreenshot].title}`}
                      className="w-full object-cover object-top"
                      style={{ aspectRatio: "9/19.5" }}
                    />
                  </div>
                  <div className="flex justify-center gap-1.5 mt-4">
                    {SCREENSHOTS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveScreenshot(i)}
                        className={`rounded-full transition-all duration-300 ${
                          activeScreenshot === i
                            ? "w-5 h-2 bg-primary"
                            : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                        }`}
                        aria-label={`Preview ${SCREENSHOTS[i].title}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Screenshots Gallery */}
      <section
        id="taskcafe-screenshots"
        ref={galleryRef}
        className="py-20 bg-muted/20 relative"
        aria-label="TaskCafe app screenshots"
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
                App <span className="text-primary">Preview</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl text-sm">
                Real screenshots from the published TaskCafe v1.4.1 on Android. Click any image to view fullscreen.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid lg:grid-cols-[1fr_200px] gap-6 mb-8"
            >
              {/* Active screenshot */}
              <div
                className="relative rounded-2xl overflow-hidden border border-border/40 bg-card cursor-pointer group"
                style={{ minHeight: "420px" }}
                onClick={() => openLightbox(activeScreenshot)}
                role="button"
                tabIndex={0}
                aria-label={`View ${SCREENSHOTS[activeScreenshot].title} fullscreen`}
                onKeyDown={(e) => e.key === "Enter" && openLightbox(activeScreenshot)}
              >
                <img
                  src={SCREENSHOTS[activeScreenshot].src}
                  alt={`TaskCafe — ${SCREENSHOTS[activeScreenshot].title}`}
                  className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"
                  style={{ maxHeight: "560px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="text-white font-bold text-lg leading-tight">
                    {SCREENSHOTS[activeScreenshot].title}
                  </p>
                  <p className="text-white/70 text-sm mt-1 max-w-md leading-relaxed">
                    {SCREENSHOTS[activeScreenshot].description}
                  </p>
                </div>
                <div className="absolute top-4 right-4 w-9 h-9 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={15} className="text-white" />
                </div>
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
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
                {SCREENSHOTS.map((shot, i) => (
                  <button
                    key={shot.src}
                    onClick={() => setActiveScreenshot(i)}
                    className={`relative rounded-xl overflow-hidden border transition-all duration-300 ${
                      activeScreenshot === i
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-border/40 hover:border-primary/30 opacity-60 hover:opacity-100"
                    }`}
                    style={{ aspectRatio: "9/16" }}
                    aria-label={`View ${shot.title}`}
                  >
                    <img
                      src={shot.src}
                      alt={`${shot.title} thumbnail`}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-1.5 left-2 text-white text-[9px] font-semibold leading-tight line-clamp-2">
                      {shot.title}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-center gap-2">
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

      {/* Project Overview */}
      <section
        id="taskcafe-overview"
        className="py-20 relative"
        aria-label="Project overview"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div variants={itemVariants}>
                <span className="text-primary font-semibold uppercase tracking-widest text-xs">
                  Overview
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight mb-6">
                  What is <span className="text-primary">TaskCafe?</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    TaskCafe is an Android application published by ETAmobile that provides a focused
                    task-entry and tracking interface for ETA workflows. Rather than a general-purpose
                    task manager, it is purpose-built for teams that need to record, categorise, and
                    update operational tasks through a clear, structured interface.
                  </p>
                  <p>
                    The app connects to an existing SOAP API backend, allowing users to create new tasks
                    with workspace, category, list, and priority selections, view their assigned task
                    list, apply multi-attribute filters, and update task statuses — all from a
                    mobile-first Android experience.
                  </p>
                  <p>
                    The UI follows a dark-first aesthetic with high-contrast priority and status badges,
                    making it easy to scan and act on tasks quickly in operational settings.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="bg-card border border-border/40 rounded-2xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-border/40">
                    <h3 className="font-semibold text-foreground text-sm">Project Information</h3>
                  </div>
                  <div className="divide-y divide-border/30">
                    {META.map(({ label, value }) => (
                      <div key={label} className="flex items-start justify-between px-5 py-3.5 gap-4">
                        <span className="text-xs text-muted-foreground font-medium shrink-0">{label}</span>
                        <span className="text-xs text-foreground font-semibold text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 py-4 border-t border-border/40">
                    <a
                      href={PLAY_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all duration-200 group"
                      aria-label="View TaskCafe on Google Play Store"
                    >
                      View on Google Play
                      <ArrowUpRight
                        size={14}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section
        id="taskcafe-features"
        className="py-20 bg-muted/20 relative"
        aria-label="TaskCafe key features"
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
              <span className="text-primary font-semibold uppercase tracking-widest text-xs">Features</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
                What TaskCafe <span className="text-primary">Does</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                Features verified from the published app screenshots and implementation.
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

      {/* My Role & Contributions */}
      <section
        id="taskcafe-role"
        className="py-20 relative"
        aria-label="My role and contributions"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={itemVariants} className="mb-12">
              <span className="text-primary font-semibold uppercase tracking-widest text-xs">Case Study</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
                My Role & <span className="text-primary">Contributions</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                I worked as a Frontend / React Native Developer on the mobile client. The backend and its API
                were developed and maintained separately.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CONTRIBUTIONS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={itemVariants}
                    custom={i}
                    className="group bg-card border border-border/40 hover:border-primary/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon size={16} className="text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground text-sm leading-snug">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section
        id="taskcafe-tech-stack"
        className="py-20 bg-muted/20 relative"
        aria-label="Technology stack"
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
              <span className="text-primary font-semibold uppercase tracking-widest text-xs">Stack</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
                Technology <span className="text-primary">Stack</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                Technologies I worked with directly as the frontend developer on this project.
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
                      <p className="font-semibold text-foreground text-sm">{tech.name}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{tech.category}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        id="taskcafe-cta"
        className="py-24 relative overflow-hidden"
        aria-label="Explore TaskCafe on Google Play"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(210 80% 60% / 0.06), transparent)",
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
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#0a0a14] border border-border/30 mb-6 mx-auto shadow-lg overflow-hidden"
            >
              <img
                src="/taskcafe/taskcafe-logo.png"
                alt="TaskCafe logo"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4"
            >
              Explore{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-primary">
                TaskCafe
              </span>{" "}
              on Android
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-lg max-w-lg mx-auto mb-8"
            >
              The app is available on Google Play. Download it to experience the task-entry
              and management flow first-hand.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                id="taskcafe-play-store-cta"
                variant="hero"
                size="lg"
                className="rounded-full px-10 gap-3 text-base group"
                asChild
              >
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View TaskCafe on Google Play Store"
                >
                  <ExternalLink size={20} className="group-hover:scale-110 transition-transform" />
                  View on Google Play
                </a>
              </Button>

              <Button variant="heroOutline" size="lg" className="rounded-full" onClick={goBack}>
                <ArrowLeft size={16} className="mr-2" />
                Back to Projects
              </Button>

              <Button
                variant="heroOutline"
                size="lg"
                className="rounded-full gap-2 group"
                onClick={() => navigate("/projects/p-gym")}
              >
                Next: P-GYM
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xs text-muted-foreground/50 mt-8 max-w-lg mx-auto"
            >
              TaskCafe is published by ETAmobile. I contributed as a Frontend / React Native
              Developer — I did not develop the backend or publish the application independently.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium"
            >
              <CheckCircle2 size={13} />
              All features and metadata verified from published app screenshots and Play Store listing
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-label="Screenshot lightbox"
            aria-modal="true"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              aria-label="Close lightbox (Escape)"
            >
              <X size={18} className="text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              aria-label="Previous image (Arrow Left)"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.25 }}
              className="max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={SCREENSHOTS[lightboxIndex].src}
                alt={`TaskCafe — ${SCREENSHOTS[lightboxIndex].title}`}
                className="max-h-[72vh] w-auto max-w-[90vw] object-contain rounded-xl shadow-2xl"
              />
              <div className="text-center mt-5">
                <p className="text-white font-semibold text-lg">
                  {SCREENSHOTS[lightboxIndex].title}
                </p>
                <p className="text-white/60 text-sm mt-1 max-w-md mx-auto leading-relaxed">
                  {SCREENSHOTS[lightboxIndex].description}
                </p>
              </div>
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              aria-label="Next image (Arrow Right)"
            >
              <ChevronRight size={20} className="text-white" />
            </button>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3">
              {SCREENSHOTS.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`rounded-full transition-all duration-300 ${
                    lightboxIndex === i
                      ? "w-5 h-2 bg-white"
                      : "w-2 h-2 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskCafeProjectPage;
