import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
  Smartphone,
  Layers,
  Bell,
  MessageCircle,
  UserCircle,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  GitBranch,
  TestTube2,
  Wrench,
  Cpu,
  Wifi,
  Shield,
  UserCheck,
  Heart,
  Search,
  Settings,
  Lock,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

// ─── Constants ───────────────────────────────────────────────────────────────
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.cognisext.text&hl=en_IN";

// ─── Screenshot Data ───────────────────────────────────────────────────────────
// Based on individual inspection of public/cognitext/1.png … 7.png
const SCREENSHOTS = [
  {
    src: "/cognitext/1.png",
    title: "Splash Screen",
    description:
      "App launch screen with the COGNITEXT logo centred on a purple gradient — tagline: 'YOUR THOUGHTS?' Animated loading indicator visible at the bottom.",
  },
  {
    src: "/cognitext/2.png",
    title: "Welcome & Onboarding",
    description:
      "Welcome screen introducing the app's privacy promise: 'Secure & Encrypted — End-to-end encryption ensures your chats stay private.' Onboarding carousel with T&C agreement checkbox and a prominent GET STARTED button.",
  },
  {
    src: "/cognitext/3.png",
    title: "Create Account / Register",
    description:
      "Registration form with Login and Register tabs. Fields: First Name, Last Name, Email, and optional Referral Code. Includes a link for existing users to log in.",
  },
  {
    src: "/cognitext/4.png",
    title: "My Profile — Personal Details",
    description:
      "User profile screen with editable Personal Details (display name, phone, email, gender), an 'About Me' bio section, and an 'Interests' field for shared-interest-based discovery.",
  },
  {
    src: "/cognitext/5.png",
    title: "Choose Your Avatar",
    description:
      "Avatar picker presented as a scrollable grid of illustrated character icons. Users select an avatar to represent themselves, preserving privacy while still having a visual identity.",
  },
  {
    src: "/cognitext/6.png",
    title: "Real-Time Chat",
    description:
      "Live messaging screen with the contact 'Ash74475'. Shows two-sided message bubbles, emoji reactions, UTC timestamps, and the message input bar with a SEND button — powered by WebSocket for real-time delivery.",
  },
  {
    src: "/cognitext/7.png",
    title: "Account Settings",
    description:
      "Account management screen with links to My Profile, Change Password, Delete Account, App Lock, and About the App — plus a Log Out option. Bottom navigation provides access to Explore, Chats, and Account tabs.",
  },
];

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Shield,
    title: "Secure & Encrypted Chat",
    description:
      "End-to-end encryption is presented as a core privacy promise during onboarding, ensuring chat messages stay private between participants.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: UserCheck,
    title: "User Registration & Login",
    description:
      "Tabbed auth screen supporting registration (First Name, Last Name, Email, Referral Code) and login for returning users.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: MessageCircle,
    title: "Real-Time Messaging",
    description:
      "Live chat interface with bi-directional message bubbles, emoji support, UTC timestamps, and a type-and-send input — driven by WebSocket connections for instant delivery.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: UserCircle,
    title: "User Profiles & Interests",
    description:
      "Editable profile with Personal Details (name, phone, email, gender), an About Me bio, and an Interests field to support shared-interest-based connection discovery.",
    color: "from-orange-500 to-amber-600",
  },
  {
    icon: Heart,
    title: "Avatar & Privacy Identity",
    description:
      "Users choose from a grid of illustrated avatars instead of uploading personal photos, supporting an anonymous or privacy-conscious social identity.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: Search,
    title: "Explore Tab",
    description:
      "Bottom-nav Explore section for discovering other users or connections — visible in the Account screen navigation bar.",
    color: "from-indigo-500 to-blue-600",
  },
  {
    icon: Lock,
    title: "App Lock & Account Safety",
    description:
      "Account screen includes App Lock, Change Password, and Delete Account options, giving users direct control over their security and data.",
    color: "from-teal-500 to-cyan-600",
  },
  {
    icon: RefreshCw,
    title: "Onboarding & T&C Flow",
    description:
      "Multi-step welcome flow with feature highlights and a terms-and-conditions checkbox before allowing users to proceed with account creation.",
    color: "from-rose-500 to-pink-600",
  },
];

// ─── Tech Stack ───────────────────────────────────────────────────────────────
const TECH_STACK = [
  { name: "React Native", icon: Smartphone, category: "Framework", color: "text-cyan-400" },
  { name: "Expo", icon: Cpu, category: "Toolchain", color: "text-white" },
  { name: "JavaScript (ES6+)", icon: Code2, category: "Language", color: "text-yellow-400" },
  { name: "REST APIs", icon: Layers, category: "Integration", color: "text-purple-400" },
  { name: "WebSockets", icon: Wifi, category: "Real-Time", color: "text-emerald-400" },
  { name: "Android Build", icon: Wrench, category: "Platform", color: "text-green-400" },
  { name: "Git", icon: GitBranch, category: "Version Control", color: "text-red-400" },
  { name: "Postman", icon: TestTube2, category: "Testing", color: "text-teal-400" },
];

// ─── Contributions ────────────────────────────────────────────────────────────
const CONTRIBUTIONS = [
  {
    icon: Smartphone,
    title: "React Native UI Development",
    description:
      "Implemented and integrated frontend screens including the splash screen, onboarding carousel, registration/login forms, profile editor, avatar picker, chat interface, and account settings.",
  },
  {
    icon: Layers,
    title: "REST API Integration",
    description:
      "Connected UI screens to the existing backend REST API for user registration, login, profile retrieval and updates. Verified request/response payloads and displayed API data correctly across screens.",
  },
  {
    icon: Wifi,
    title: "WebSocket Integration",
    description:
      "Integrated WebSocket client for real-time chat delivery. Handled incoming messages, outgoing sends, and connection state on the frontend — keeping the chat interface updated live without polling.",
  },
  {
    icon: UserCircle,
    title: "Profile & Interests Flow",
    description:
      "Built the profile editing UI including Personal Details fields, About Me bio, Interests input, and the avatar picker grid. Wired these to the relevant API endpoints for persisting user data.",
  },
  {
    icon: Shield,
    title: "Auth Screens & Navigation",
    description:
      "Implemented the tabbed Login/Register screens with form validation, error feedback, and navigation flows. Integrated the onboarding carousel with the T&C checkbox before account creation.",
  },
  {
    icon: TestTube2,
    title: "APK Builds & End-to-End Testing",
    description:
      "Generated and verified Android APK releases. Performed end-to-end functional testing of registration, login, profile editing, avatar selection, real-time chat, and account management flows. Identified and fixed frontend defects found during testing.",
  },
];

// ─── Project Metadata ─────────────────────────────────────────────────────────
const META = [
  { label: "My Role", value: "Frontend / React Native Developer" },
  { label: "Platform", value: "Android" },
  { label: "App Version", value: "2.3.8" },
  { label: "Min Android", value: "7.0+" },
  { label: "Publisher", value: "ETAmobile" },
  { label: "Original Release", value: "30 June 2025" },
  { label: "Latest Update", value: "25 August 2026" },
  { label: "Download Size", value: "≈ 43 MB (varies by device)" },
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
const CognisextProjectPage = () => {
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
      {/* ── Sticky Nav ── */}
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
                aria-label="View COGNITEXT on Google Play"
                id="cognisext-play-store-nav"
              >
                <ExternalLink size={14} />
                Google Play
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section
        className="relative overflow-hidden py-20 lg:py-32"
        aria-label="COGNISEXT project overview"
      >
        {/* Background ambient blobs — violet/purple identity for COGNISEXT */}
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.08] blur-[130px] pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(270 80% 65%), transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-1/4 w-[450px] h-[450px] rounded-full opacity-[0.06] blur-[110px] pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(300 70% 60%), transparent 70%)" }}
          aria-hidden="true"
        />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-start">

              {/* Left — content */}
              <div className="max-w-3xl">
                {/* Badge */}
                <motion.div variants={itemVariants} className="mb-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400 text-xs font-semibold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                    Android · Social · Real-Time Chat
                  </span>
                </motion.div>

                {/* Logo + Title */}
                <motion.div variants={itemVariants} className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-border/40 shadow-lg shrink-0 bg-white">
                    <img
                      src="/cognitext/cogitext-logo.png"
                      alt="COGNITEXT app logo"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-none">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400">
                        COGNI
                      </span>
                      <span className="text-foreground">SEXT</span>
                    </h1>
                    <p className="text-muted-foreground text-base mt-1 font-medium">
                      Anonymous connections and real-time chat
                    </p>
                  </div>
                </motion.div>

                {/* Summary */}
                <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
                  COGNISEXT is an{" "}
                  <strong className="text-foreground">Android social communication application</strong>{" "}
                  published by ETAmobile. It enables users to create privacy-conscious profiles,
                  discover connections with shared interests, and communicate through{" "}
                  <strong className="text-foreground">real-time WebSocket-powered chat</strong> — all within a secure,
                  avatar-based identity system.
                </motion.p>

                {/* Tech badges */}
                <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-6">
                  {["React Native", "Expo", "JavaScript", "REST APIs", "WebSockets", "Android"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-muted/60 text-foreground/80 rounded-full border border-border/40"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>

                {/* Role label */}
                <motion.div variants={itemVariants} className="flex items-center gap-2 mb-8">
                  <span className="px-3 py-1.5 text-xs font-semibold bg-violet-500/10 text-violet-400 rounded-full border border-violet-500/20">
                    My Role: Frontend / React Native Developer
                  </span>
                </motion.div>

                {/* CTAs */}
                <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" className="rounded-full gap-2 group" asChild>
                    <a
                      href={PLAY_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      id="cognisext-play-store-hero"
                      aria-label="View COGNITEXT on Google Play Store"
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
                    id="cognisext-explore-screenshots"
                    aria-label="Scroll to app screenshots"
                  >
                    Explore Screenshots
                  </Button>
                </motion.div>
              </div>

              {/* Right — rotating phone preview */}
              <motion.div variants={itemVariants} className="hidden lg:block">
                <div className="relative w-[200px]">
                  <div
                    className="absolute inset-0 blur-3xl opacity-30 scale-110 pointer-events-none"
                    style={{ background: "radial-gradient(circle, hsl(270 80% 60%), hsl(300 60% 55%), transparent 70%)" }}
                    aria-hidden="true"
                  />
                  <div className="relative rounded-3xl overflow-hidden border border-border/30 shadow-2xl">
                    <img
                      src={SCREENSHOTS[activeScreenshot].src}
                      alt={`COGNITEXT — ${SCREENSHOTS[activeScreenshot].title}`}
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
                            ? "w-5 h-2 bg-violet-400"
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

      {/* ── Screenshots Gallery ── */}
      <section
        id="cognisext-screenshots"
        ref={galleryRef}
        className="py-20 bg-muted/20 relative"
        aria-label="COGNITEXT app screenshots"
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
              <span className="text-violet-400 font-semibold uppercase tracking-widest text-xs">
                Screenshots
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
                App <span className="text-violet-400">Preview</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl text-sm">
                Real screenshots from COGNITEXT v2.3.8 on Android. Click any image to view fullscreen.
              </p>
            </motion.div>

            {/* Gallery layout: large active + thumbnail strip */}
            <motion.div
              variants={itemVariants}
              className="grid lg:grid-cols-[1fr_220px] gap-6 mb-8"
            >
              {/* Active screenshot */}
              <div
                className="relative rounded-2xl overflow-hidden border border-border/40 bg-card cursor-pointer group"
                style={{ minHeight: "440px" }}
                onClick={() => openLightbox(activeScreenshot)}
                role="button"
                tabIndex={0}
                aria-label={`View ${SCREENSHOTS[activeScreenshot].title} fullscreen`}
                onKeyDown={(e) => e.key === "Enter" && openLightbox(activeScreenshot)}
              >
                <img
                  src={SCREENSHOTS[activeScreenshot].src}
                  alt={`COGNITEXT — ${SCREENSHOTS[activeScreenshot].title}`}
                  className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"
                  style={{ maxHeight: "580px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 p-5 pointer-events-none">
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
              <div className="grid grid-cols-4 lg:grid-cols-1 gap-3">
                {SCREENSHOTS.map((shot, i) => (
                  <button
                    key={shot.src}
                    onClick={() => setActiveScreenshot(i)}
                    className={`relative rounded-xl overflow-hidden border transition-all duration-300 ${
                      activeScreenshot === i
                        ? "border-violet-400 ring-2 ring-violet-400/30"
                        : "border-border/40 hover:border-violet-400/30 opacity-60 hover:opacity-100"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                    <span className="absolute bottom-1.5 left-2 text-white text-[9px] font-semibold leading-tight line-clamp-2">
                      {shot.title}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Dot indicators */}
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-2">
              {SCREENSHOTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveScreenshot(i)}
                  className={`rounded-full transition-all duration-300 ${
                    activeScreenshot === i
                      ? "w-6 h-2 bg-violet-400"
                      : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                  aria-label={`Go to screenshot ${i + 1}`}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Project Overview ── */}
      <section
        id="cognisext-overview"
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
                <span className="text-violet-400 font-semibold uppercase tracking-widest text-xs">
                  Overview
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight mb-6">
                  What is <span className="text-violet-400">COGNITEXT?</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    COGNITEXT (presented as COGNISEXT) is an Android social communication application
                    published by ETAmobile. It is designed to help users discover connections based on
                    shared interests and communicate through a real-time, chat-first interface — while
                    preserving a degree of privacy through avatar-based identities rather than photo uploads.
                  </p>
                  <p>
                    The app introduces users through an onboarding flow that emphasises its end-to-end
                    encryption promise. Users create an account, build a profile with personal details and
                    interests, choose an avatar, and can then explore other users and initiate conversations.
                    Chat is powered by a WebSocket connection for live message delivery without polling.
                  </p>
                  <p>
                    The Account screen provides security settings including App Lock, password management,
                    and account deletion, giving users direct control over their data and access.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="bg-card border border-border/40 rounded-2xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-border/40 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg overflow-hidden border border-border/30 bg-white shrink-0">
                      <img src="/cognitext/cogitext-logo.png" alt="COGNITEXT logo" className="w-full h-full object-cover" />
                    </div>
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
                    <p className="text-xs text-muted-foreground">
                      Published by ETAmobile. I contributed as Frontend / React Native Developer — not as publisher or backend developer.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Key Features ── */}
      <section
        id="cognisext-features"
        className="py-20 bg-muted/20 relative"
        aria-label="COGNITEXT key features"
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
              <span className="text-violet-400 font-semibold uppercase tracking-widest text-xs">Features</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
                What COGNITEXT <span className="text-violet-400">Does</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                Features verified directly from the published app screenshots and app description.
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
                    className="group bg-card border border-border/40 hover:border-violet-400/30 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
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

      {/* ── My Role & Contributions ── */}
      <section
        id="cognisext-role"
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
              <span className="text-violet-400 font-semibold uppercase tracking-widest text-xs">
                Case Study
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
                My Role & <span className="text-violet-400">Contributions</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                I contributed as a Frontend / React Native Developer. The backend, WebSocket server, and API
                infrastructure were developed and maintained by the backend team.
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
                    className="group bg-card border border-border/40 hover:border-violet-400/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                        <Icon size={16} className="text-violet-400" />
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

      {/* ── Tech Stack ── */}
      <section
        id="cognisext-tech-stack"
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
              <span className="text-violet-400 font-semibold uppercase tracking-widest text-xs">Stack</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
                Technology <span className="text-violet-400">Stack</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                Technologies I worked with directly as the frontend developer on COGNITEXT.
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
                    className="group bg-card border border-border/40 hover:border-violet-400/30 rounded-2xl p-5 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
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

            {/* WebSocket highlight note */}
            <motion.div
              variants={itemVariants}
              className="mt-8 rounded-2xl border border-violet-400/20 bg-violet-500/5 px-6 py-5 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                <Wifi size={18} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm mb-1">WebSocket Integration</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  One of my key technical contributions on this project was integrating WebSocket-based
                  real-time communication on the frontend. I handled establishing the connection,
                  processing incoming messages, updating the chat UI state live, and managing outgoing
                  sends — without relying on polling. The WebSocket server itself was maintained by the
                  backend team.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        id="cognisext-cta"
        className="py-24 relative overflow-hidden"
        aria-label="COGNITEXT project wrap-up"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(270 80% 60% / 0.05), transparent)",
          }}
        />

        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Logo */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white border border-border/30 mb-6 mx-auto shadow-lg overflow-hidden"
            >
              <img
                src="/cognitext/cogitext-logo.png"
                alt="COGNITEXT logo"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400">
                COGNITEXT
              </span>{" "}
              — Real-Time, Real Connections
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-lg max-w-lg mx-auto mb-8"
            >
              A social communication app where privacy meets real-time connection — built with
              React Native and powered by WebSockets.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                id="cognisext-play-store-cta"
                variant="hero"
                size="lg"
                className="rounded-full px-10 gap-3 text-base group"
                asChild
              >
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View COGNITEXT on Google Play Store"
                >
                  <ExternalLink size={20} className="group-hover:scale-110 transition-transform" />
                  View on Google Play
                </a>
              </Button>

              <Button
                variant="heroOutline"
                size="lg"
                className="rounded-full"
                onClick={goBack}
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Projects
              </Button>

              <Button
                variant="heroOutline"
                size="lg"
                className="rounded-full gap-2 group"
                onClick={() => navigate("/projects/taskcafe")}
              >
                View TaskCafe
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </motion.div>

            {/* Disclaimer */}
            <motion.p
              variants={itemVariants}
              className="text-xs text-muted-foreground/50 mt-8 max-w-lg mx-auto"
            >
              COGNITEXT is published by ETAmobile. I contributed as a Frontend / React Native
              Developer — I did not develop the backend, WebSocket server, or publish the
              application independently.
            </motion.p>

            {/* Verified badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium"
            >
              <CheckCircle2 size={13} />
              All features and metadata verified from published app screenshots and Play Store listing
            </motion.div>
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
                alt={`COGNITEXT — ${SCREENSHOTS[lightboxIndex].title}`}
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
                      ? "w-5 h-2 bg-violet-400"
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

export default CognisextProjectPage;
