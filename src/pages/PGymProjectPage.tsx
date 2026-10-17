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
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Globe,
  Shield,
  Mail,
  Cloud,
  Settings,
  Users,
  LogIn,
  UserCircle,
  Megaphone,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const APK_URL =
  "https://github.com/Shivam-Jais/codewithhustle/releases/download/v1.1.2/app-release.apk";

// ─── Screenshot Data ──────────────────────────────────────────────────────────
// Each entry maps to a real screenshot from the deployed P-GYM v1.1.2 app
const SCREENSHOTS = [
  {
    src: "/p-gym/1.jpeg",
    title: "Welcome & Landing",
    description:
      "App landing screen with P-GYM branding, gym hero image, 'TRAIN HARDER. BECOME STRONGER.' tagline, and dual login buttons for User Login and Admin Portal Login.",
  },
  {
    src: "/p-gym/2.jpeg",
    title: "User Login",
    description:
      "Member Access login screen with email/phone and password fields, Forgot Password link, neon-lime LOG IN button, and a Create Account link for new members.",
  },
  {
    src: "/p-gym/3.jpeg",
    title: "Home Dashboard",
    description:
      "Main home feed with gym carousel banner, motivational quote card, Gym Events section with admin-posted content, and bottom navigation (Home, Exercises, Gym, Subscription, Profile).",
  },
  {
    src: "/p-gym/4.jpeg",
    title: "Workout Categories",
    description:
      "Exercise category browser with muscle-group cards — Chest, Back, Legs, Shoulders, Arms — each with workout images and exercise count badges.",
  },
  {
    src: "/p-gym/5.jpeg",
    title: "Gym Gallery",
    description:
      "Photo gallery with category filter tabs (All, Gym Overview, Gym Exterior, Cardio Area) and a 3-column masonry grid of gym and fitness images.",
  },
  {
    src: "/p-gym/6.jpeg",
    title: "Membership Plans",
    description:
      "Subscription plans screen showing 1 Month (₹999) and 3 Months (₹2,499) tiers with detailed benefit breakdowns and Choose Plan buttons.",
  },
  {
    src: "/p-gym/7.jpeg",
    title: "My Profile",
    description:
      "User profile with personal info, active subscription status (1 Month Plan, Active, Expiry: 2 Nov 2026), and settings — Edit Profile, Change Password, Notifications, Help & Support. Shows Version 1.1.2.",
  },
  {
    src: "/p-gym/8.jpeg",
    title: "Admin Dashboard",
    description:
      "GYM CONTROL DASHBOARD with Overview Metrics (Users, Active Members, Pending Requests, Announcements, Events, Gallery) and Management Modules — Subscription Requests, User Management, Exercise Management, Announcements.",
  },
  {
    src: "/p-gym/9.jpeg",
    title: "Admin User Management",
    description:
      "Member management list with user profiles, subscription plans, status badges (Active, Expiring Soon, Pending, Expired), and admin actions — Approve, Details, Edit, Delete.",
  },
];

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: LogIn,
    title: "Dual Login System",
    description:
      "Separate User Login and Admin Portal Login with JWT authentication, password visibility toggle, Forgot Password flow, and new member registration.",
    color: "from-lime-400 to-green-600",
  },
  {
    icon: Home,
    title: "Home Feed & Events",
    description:
      "Dynamic home dashboard with gym carousel banners, motivational quote cards, and a Gym Events feed where admins post announcements with images.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Dumbbell,
    title: "Workout Categories & Exercises",
    description:
      "Muscle-group based exercise browser — Chest, Back, Legs, Shoulders, Arms — with workout images, exercise counts, and category navigation.",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: ImageIcon,
    title: "Gym Gallery",
    description:
      "Photo gallery with filterable categories (All, Gym Overview, Gym Exterior, Cardio Area) displayed in a masonry grid layout.",
    color: "from-orange-500 to-amber-600",
  },
  {
    icon: CreditCard,
    title: "Membership Plans & Subscriptions",
    description:
      "Tiered subscription plans (1 Month ₹999, 3 Months ₹2,499) with benefit breakdowns, Choose Plan checkout, subscription activation, and expiry tracking.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: UserCircle,
    title: "User Profile & Settings",
    description:
      "Profile screen with personal info, active subscription status and expiry date, Edit Profile, Change Password, Notifications, and Help & Support.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: LayoutDashboard,
    title: "Admin Control Dashboard",
    description:
      "Full admin panel with Overview Metrics (Users, Active Members, Pending Requests, Events, Gallery) and Management Modules for subscriptions, users, exercises, and announcements.",
    color: "from-indigo-500 to-blue-600",
  },
  {
    icon: Users,
    title: "Admin User Management",
    description:
      "Member management with subscription status badges (Active, Expiring Soon, Pending, Expired), admin approval workflow, and full CRUD operations (Details, Edit, Delete).",
    color: "from-teal-500 to-cyan-600",
  },
  {
    icon: Bell,
    title: "Firebase Push Notifications",
    description:
      "Firebase Cloud Messaging integration for subscription expiry reminders and gym announcements, keeping members informed and engaged.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: KeyRound,
    title: "Auth & Password Reset",
    description:
      "JWT-based authentication, secure password hashing, and token-based password reset flow with transactional email delivery via Resend.",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: RefreshCw,
    title: "Firebase Remote Config Force-Update",
    description:
      "Firebase Remote Config based version gating to force users to update to the latest build before using the app.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Megaphone,
    title: "Announcements & Event Management",
    description:
      "Admin can create announcements with images, manage gym events, and post carousel banners that appear on the member home feed.",
    color: "from-blue-500 to-indigo-600",
  },
];

// ─── Tech Stack ───────────────────────────────────────────────────────────────
const TECH_STACK = [
  { name: "React Native", icon: Smartphone, category: "Frontend", color: "text-cyan-400" },
  { name: "Expo", icon: Zap, category: "Toolchain", color: "text-white" },
  { name: "JavaScript", icon: Code2, category: "Language", color: "text-yellow-400" },
  { name: "Node.js", icon: Server, category: "Backend", color: "text-green-400" },
  { name: "Express.js", icon: Globe, category: "Backend", color: "text-gray-300" },
  { name: "MongoDB Atlas", icon: Database, category: "Database", color: "text-emerald-400" },
  { name: "Firebase", icon: Bell, category: "FCM + Remote Config", color: "text-orange-400" },
  { name: "REST APIs", icon: Layers, category: "Integration", color: "text-purple-400" },
  { name: "Render", icon: Cloud, category: "Deployment", color: "text-blue-400" },
  { name: "Resend", icon: Mail, category: "Email", color: "text-pink-400" },
];

// ─── Full-Stack Contributions ─────────────────────────────────────────────────
const CONTRIBUTIONS = [
  {
    icon: Smartphone,
    title: "React Native Mobile Frontend",
    description:
      "Built the entire mobile UI from scratch using React Native (Expo) — Landing screen, Login, Home Dashboard with event feed, Workout Categories, Gym Gallery, Membership Plans, User Profile, Admin Dashboard, and User Management. Implemented responsive layouts, bottom-tab navigation, form validation, state management, and REST API integration.",
  },
  {
    icon: Server,
    title: "Node.js / Express Backend",
    description:
      "Developed the backend server with Express.js — REST API endpoints for authentication (login, register, password reset), membership plan management, subscription requests and approvals, exercise data, gym gallery, announcements and events, user profile CRUD, and admin operations with validation middleware.",
  },
  {
    icon: Database,
    title: "MongoDB & Data Modeling",
    description:
      "Designed and implemented MongoDB data models for users, membership plans, subscriptions (with activation and expiry tracking), exercises, gym gallery images, events, and announcements. Configured MongoDB Atlas for cloud-hosted persistent storage.",
  },
  {
    icon: Shield,
    title: "Authentication & Security",
    description:
      "Implemented JWT-based authentication with separate user and admin login flows, secure password hashing, password visibility toggle, and a complete token-based password reset flow with email delivery using Resend.",
  },
  {
    icon: Bell,
    title: "Firebase Cloud Messaging & Remote Config",
    description:
      "Configured Firebase Cloud Messaging for push notifications on subscription expiry reminders and gym announcements. Implemented Firebase Remote Config for force-update version gating to ensure users always run the latest build.",
  },
  {
    icon: Cloud,
    title: "Deployment & Production",
    description:
      "Deployed the backend on Render with production environment variables and API connectivity. Generated Android APK builds (v1.1.2), managed release versions, and performed end-to-end testing of the full application flow across user and admin workflows.",
  },
];

// ─── Architecture Layers ──────────────────────────────────────────────────────
const ARCHITECTURE_LAYERS = [
  {
    label: "Mobile Frontend",
    tech: "React Native · Expo",
    description: "Landing, Login, Home Feed, Exercises, Gallery, Subscriptions, Profile, Admin Dashboard, User Management",
    color: "from-lime-400 to-green-600",
    icon: Smartphone,
  },
  {
    label: "REST API Layer",
    tech: "Express.js · Node.js",
    description: "Auth, membership plans, subscriptions, user CRUD, exercises, gallery, events, announcements, admin operations",
    color: "from-green-400 to-emerald-600",
    icon: Layers,
  },
  {
    label: "Database",
    tech: "MongoDB Atlas",
    description: "Users, plans, subscriptions (activation/expiry), exercises, gallery, events, announcements — cloud-hosted",
    color: "from-emerald-400 to-teal-600",
    icon: Database,
  },
  {
    label: "Services",
    tech: "Firebase · Resend",
    description: "FCM push notifications, Remote Config force-update, and Resend transactional email for password reset",
    color: "from-orange-400 to-amber-600",
    icon: Settings,
  },
  {
    label: "Deployment",
    tech: "Render · Android APK",
    description: "Backend hosted on Render, Android APK v1.1.2 distributed for installation",
    color: "from-blue-400 to-indigo-600",
    icon: Cloud,
  },
];

// ─── Project Metadata ─────────────────────────────────────────────────────────
const META = [
  { label: "My Role", value: "Full-Stack Developer (Solo Project)" },
  { label: "Platform", value: "Android" },
  { label: "App Version", value: "1.1.2" },
  { label: "Frontend", value: "React Native (Expo)" },
  { label: "Backend", value: "Node.js + Express.js" },
  { label: "Database", value: "MongoDB Atlas" },
  { label: "Deployment", value: "Render (Backend) · APK (Mobile)" },
  { label: "Notifications", value: "Firebase Cloud Messaging" },
  { label: "Email", value: "Resend (Transactional)" },
  { label: "Force-Update", value: "Firebase Remote Config" },
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
const PGymProjectPage = () => {
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
                href={APK_URL}
                download="app-release.apk"
                aria-label="Download P-GYM APK"
                id="pgym-download-nav"
              >
                <Download size={14} />
                Download APK
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section
        className="relative overflow-hidden py-20 lg:py-32"
        aria-label="P-GYM project overview"
      >
        {/* Background ambient blobs — lime/dark identity matching P-GYM's real UI */}
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[130px] pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(80 90% 55%), transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-1/4 w-[450px] h-[450px] rounded-full opacity-[0.05] blur-[110px] pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(50 90% 50%), transparent 70%)" }}
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
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-lime-500/10 border border-lime-500/25 text-lime-400 text-xs font-semibold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                    Full-Stack · Android · Solo Project
                  </span>
                </motion.div>

                {/* Logo + Title */}
                <motion.div variants={itemVariants} className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-lime-500/30 shadow-lg shrink-0 bg-black">
                    <img
                      src="/p-gym/p-gym-logo.png"
                      alt="Pattipataban Gym logo"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-none">
                      P
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-400 via-yellow-400 to-lime-500">
                        -GYM
                      </span>
                    </h1>
                    <p className="text-muted-foreground text-base mt-1 font-medium">
                      Pattipataban Gym Management Application
                    </p>
                  </div>
                </motion.div>

                {/* Summary */}
                <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
                  A{" "}
                  <strong className="text-foreground">full-stack Gym Management Android application</strong>{" "}
                  built from scratch — featuring dual user/admin login, a home feed with events and announcements,
                  workout category browser, gym photo gallery, tiered membership subscriptions,
                  admin control dashboard with user management, Firebase push notifications,
                  and automated expiry reminders. Powered by a{" "}
                  <strong className="text-foreground">Node.js backend deployed on Render</strong>{" "}
                  with MongoDB Atlas for persistent storage.
                </motion.p>

                {/* Tech badges */}
                <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-6">
                  {["React Native", "Expo", "Node.js", "Express", "MongoDB", "Firebase", "REST APIs", "Render"].map((tech) => (
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
                  <span className="px-3 py-1.5 text-xs font-semibold bg-lime-500/10 text-lime-400 rounded-full border border-lime-500/20">
                    My Role: Full-Stack Developer — Frontend, Backend, Database & Deployment
                  </span>
                </motion.div>

                {/* CTAs */}
                <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" className="rounded-full gap-2 group" asChild>
                    <a
                      href={APK_URL}
                      download="app-release.apk"
                      id="pgym-download-apk-hero"
                      aria-label="Download P-GYM APK"
                    >
                      <Download size={18} className="group-hover:animate-bounce" />
                      Download APK
                    </a>
                  </Button>
                  <Button
                    variant="heroOutline"
                    size="lg"
                    className="rounded-full"
                    onClick={scrollToGallery}
                    id="pgym-explore-screenshots"
                    aria-label="Scroll to app screenshots"
                  >
                    Explore Screenshots
                  </Button>
                </motion.div>
              </div>

              {/* Right — hero phone preview */}
              <motion.div variants={itemVariants} className="hidden lg:block">
                <div className="relative w-[200px]">
                  <div
                    className="absolute inset-0 blur-3xl opacity-20 scale-110 pointer-events-none"
                    style={{ background: "radial-gradient(circle, hsl(80 90% 55%), hsl(50 90% 50%), transparent 70%)" }}
                    aria-hidden="true"
                  />
                  <div className="relative rounded-3xl overflow-hidden border border-border/30 shadow-2xl">
                    <img
                      src={SCREENSHOTS[activeScreenshot].src}
                      alt={`P-GYM — ${SCREENSHOTS[activeScreenshot].title}`}
                      className="w-full object-cover object-top"
                      style={{ aspectRatio: "9/19.5" }}
                      loading="eager"
                    />
                  </div>
                  <div className="flex justify-center gap-1.5 mt-4">
                    {SCREENSHOTS.slice(0, 6).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveScreenshot(i)}
                        className={`rounded-full transition-all duration-300 ${
                          activeScreenshot === i
                            ? "w-5 h-2 bg-lime-400"
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
        id="pgym-screenshots"
        ref={galleryRef}
        className="py-20 bg-muted/20 relative"
        aria-label="P-GYM app screenshots"
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
              <span className="text-lime-400 font-semibold uppercase tracking-widest text-xs">
                Screenshots
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
                App{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-yellow-400">
                  Preview
                </span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl text-sm">
                Real screenshots from the deployed P-GYM v1.1.2 app on Android. Click any image to view fullscreen.
              </p>
            </motion.div>

            {/* Main carousel */}
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
                  alt={`P-GYM — ${SCREENSHOTS[activeScreenshot].title}`}
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

              {/* Thumbnail strip — show first 6 in sidebar, rest accessible via nav */}
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-3 lg:max-h-[560px] lg:overflow-y-auto lg:scrollbar-thin">
                {SCREENSHOTS.map((shot, i) => (
                  <button
                    key={shot.src}
                    onClick={() => setActiveScreenshot(i)}
                    className={`relative rounded-xl overflow-hidden border transition-all duration-300 ${
                      activeScreenshot === i
                        ? "border-lime-400 ring-2 ring-lime-400/30"
                        : "border-border/40 hover:border-lime-400/30 opacity-60 hover:opacity-100"
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

            {/* Dot indicators */}
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-2">
              {SCREENSHOTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveScreenshot(i)}
                  className={`rounded-full transition-all duration-300 ${
                    activeScreenshot === i
                      ? "w-6 h-2 bg-lime-400"
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
        id="pgym-overview"
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
                <span className="text-lime-400 font-semibold uppercase tracking-widest text-xs">
                  Overview
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight mb-6">
                  What is{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-yellow-400">
                    P-GYM?
                  </span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    P-GYM (Pattipataban Gym Management Application) is a <strong className="text-foreground">full-stack Android application</strong> I built from scratch to manage gym operations end-to-end. It serves both gym members and administrators through a polished, dark-themed mobile interface with neon-lime accents.
                  </p>
                  <p>
                    Members can log in, browse a home feed with gym events and motivational content, explore workout categories by muscle group, view the gym gallery, subscribe to tiered membership plans (1 Month / 3 Months), manage their profile and subscription status, and receive push notification reminders before their subscriptions expire.
                  </p>
                  <p>
                    Administrators get a dedicated <strong className="text-foreground">Gym Control Dashboard</strong> with overview metrics (Users, Active Members, Pending Requests, Announcements, Events, Gallery), and management modules for approving subscription requests, managing users with full CRUD operations, managing exercises, and posting announcements.
                  </p>
                  <p>
                    The backend is built with <strong className="text-foreground">Node.js and Express.js</strong>, connected to <strong className="text-foreground">MongoDB Atlas</strong> for persistent storage, and deployed on <strong className="text-foreground">Render</strong>. Firebase Cloud Messaging handles push notifications, Firebase Remote Config enables force-update flows, and Resend powers transactional emails for password reset.
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
                      href={APK_URL}
                      download="app-release.apk"
                      className="flex items-center gap-2 text-lime-400 text-sm font-semibold hover:gap-3 transition-all duration-200 group"
                      aria-label="Download P-GYM APK"
                    >
                      Download APK v1.1.2
                      <Download
                        size={14}
                        className="group-hover:translate-y-0.5 transition-transform"
                      />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Key Features ── */}
      <section
        id="pgym-features"
        className="py-20 bg-muted/20 relative"
        aria-label="P-GYM key features"
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
              <span className="text-lime-400 font-semibold uppercase tracking-widest text-xs">Features</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
                What P-GYM{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-yellow-400">
                  Does
                </span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                Verified features from the deployed P-GYM v1.1.2 — serving both gym members and administrators.
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
                    className="group bg-card border border-border/40 hover:border-lime-400/30 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
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

      {/* ── Architecture ── */}
      <section
        id="pgym-architecture"
        className="py-20 relative"
        aria-label="P-GYM system architecture"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={itemVariants} className="mb-12">
              <span className="text-lime-400 font-semibold uppercase tracking-widest text-xs">Architecture</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
                System{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-yellow-400">
                  Architecture
                </span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                End-to-end full-stack architecture I designed and implemented — from the mobile client to the cloud-deployed backend.
              </p>
            </motion.div>

            {/* Architecture flow */}
            <div className="space-y-4">
              {ARCHITECTURE_LAYERS.map((layer, i) => {
                const Icon = layer.icon;
                return (
                  <motion.div
                    key={layer.label}
                    variants={itemVariants}
                    custom={i}
                    className="group relative"
                  >
                    <div className="bg-card border border-border/40 hover:border-lime-400/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-md">
                      <div className="flex items-start gap-5">
                        <div className="flex flex-col items-center gap-2 shrink-0">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${layer.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                          >
                            <Icon size={20} className="text-white" />
                          </div>
                          {i < ARCHITECTURE_LAYERS.length - 1 && (
                            <div className="w-px h-6 bg-gradient-to-b from-border/60 to-transparent hidden sm:block" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <h3 className="font-bold text-foreground text-base">{layer.label}</h3>
                            <span className="text-xs text-muted-foreground font-medium bg-muted/60 px-2.5 py-0.5 rounded-full border border-border/40">
                              {layer.tech}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {layer.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Data flow summary */}
            <motion.div
              variants={itemVariants}
              className="mt-8 bg-card border border-border/40 rounded-2xl p-6"
            >
              <h3 className="font-semibold text-foreground text-sm mb-3">Data Flow</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Mobile App</strong> (React Native) →{" "}
                <strong className="text-foreground">REST API</strong> (Express.js on Render) →{" "}
                <strong className="text-foreground">MongoDB Atlas</strong> (Cloud Database)
                <br />
                <strong className="text-foreground">Firebase FCM</strong> delivers push notifications from the backend to mobile devices.{" "}
                <strong className="text-foreground">Firebase Remote Config</strong> controls force-update version gating.{" "}
                <strong className="text-foreground">Resend</strong> handles transactional emails for password reset flows.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── My Role & Contributions ── */}
      <section
        id="pgym-role"
        className="py-20 bg-muted/20 relative"
        aria-label="My role and contributions"
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
              <span className="text-lime-400 font-semibold uppercase tracking-widest text-xs">Case Study</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
                My Role &{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-yellow-400">
                  Contributions
                </span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                I built this project from scratch as a solo full-stack developer — handling the mobile frontend,
                backend API, database design, third-party integrations, and deployment.
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
                    className="group bg-card border border-border/40 hover:border-lime-400/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-lg bg-lime-500/10 flex items-center justify-center group-hover:bg-lime-500/20 transition-colors">
                        <Icon size={16} className="text-lime-400" />
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
        id="pgym-tech-stack"
        className="py-20 relative"
        aria-label="P-GYM technology stack"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={itemVariants} className="mb-12">
              <span className="text-lime-400 font-semibold uppercase tracking-widest text-xs">Stack</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
                Technology{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-yellow-400">
                  Stack
                </span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                The full-stack technology I used to build, deploy, and operate P-GYM from frontend to production.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {TECH_STACK.map((tech, i) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={tech.name}
                    variants={itemVariants}
                    custom={i}
                    className="group bg-card border border-border/40 hover:border-lime-400/30 rounded-2xl p-5 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
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

      {/* ── Final CTA ── */}
      <section
        id="pgym-cta"
        className="py-24 relative overflow-hidden"
        aria-label="Download P-GYM APK"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(80 90% 55% / 0.05), transparent)",
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
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl border border-border/30 mb-6 mx-auto shadow-lg overflow-hidden bg-black"
            >
              <img
                src="/p-gym/p-gym-logo.png"
                alt="P-GYM logo"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4"
            >
              Try{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-yellow-400">
                P-GYM
              </span>{" "}
              on Android
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-lg max-w-lg mx-auto mb-8"
            >
              Download the latest APK (v1.1.2) and install it directly on your Android device to experience the full application.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                id="pgym-download-apk-cta"
                variant="hero"
                size="lg"
                className="rounded-full px-10 gap-3 text-base group"
                asChild
              >
                <a
                  href={APK_URL}
                  download="app-release.apk"
                  aria-label="Download P-GYM APK for Android"
                >
                  <Download size={20} className="group-hover:animate-bounce" />
                  Download APK
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
                onClick={() => navigate("/projects/taskcafe")}
              >
                Next: TaskCafe
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xs text-muted-foreground/50 mt-8 max-w-lg mx-auto"
            >
              P-GYM is a personal full-stack project I built independently from scratch — handling
              frontend, backend, database, and deployment as the sole developer.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium"
            >
              <CheckCircle2 size={13} />
              All features verified from the deployed P-GYM v1.1.2 app screenshots
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
                alt={`P-GYM — ${SCREENSHOTS[lightboxIndex].title}`}
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

export default PGymProjectPage;
