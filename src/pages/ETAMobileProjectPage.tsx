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
  ArrowUpRight,
  CheckCircle2,
  Code2,
  GitBranch,
  TestTube2,
  Wrench,
  Cpu,
  LogIn,
  ClipboardList,
  FileSignature,
  Search,
  PenLine,
  MapPin,
  ShieldAlert,
  RefreshCw,
  ScrollText,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=eta.ETAMobile&hl=en_IN";

// ─── Screenshot Data ───────────────────────────────────────────────────────────
// Based on individual inspection of public/eta-mobile/1.png … 8.png
const SCREENSHOTS = [
  {
    src: "/eta-mobile/1.png",
    title: "Launch Screen",
    description:
      "App launch screen showing 'ETA Mobile 2.6' with a LOGIN and EXIT button on a deep-blue background. A warning message at the bottom instructs drivers to close the app to avoid data issues.",
  },
  {
    src: "/eta-mobile/2.png",
    title: "Driver Login",
    description:
      "Driver authentication screen with Driver ID and Password fields, plus Login and Cancel actions — used to authenticate against the ETA server before accessing shipment data.",
  },
  {
    src: "/eta-mobile/3.png",
    title: "Shipment Dashboard",
    description:
      "Main operational dashboard for Pro# 555246. Displays status (Waiting / On-Duty), destination address, pieces/weight/cube, PU and delivery counts, and a 'Network poor' connectivity indicator. Action buttons: Status, Ack, PCOB, POD, Prev, Next, PU, Find, Driver, Reset, New, Info, Exit.",
  },
  {
    src: "/eta-mobile/4.png",
    title: "POD — Proof of Delivery",
    description:
      "Proof of Delivery form for Pro# 555246. Fields: condition dropdown (NoProblems – intact), Signed For By, Number of Pieces, date/time, Damage Report. Actions: Reset, SCAN barcode, Photo, Sign, Commit, Cancel. Also exposes a Codes section.",
  },
  {
    src: "/eta-mobile/5.png",
    title: "New PRO Entry",
    description:
      "Form to create a new PRO record. Fields include Pro Number (required), Name and Address of Pickup, Name and Address of Destination, and optional Special Instructions. Actions: Cancel, Clear, Commit.",
  },
  {
    src: "/eta-mobile/6.png",
    title: "Find / Search List",
    description:
      "Searchable, sortable shipment list showing Pro#, Action type (DEL/PU), Zip, and Company columns. Touch headings to sort; tap a row to select. Actions: Cancel, Selection, Commit.",
  },
  {
    src: "/eta-mobile/7.png",
    title: "Info / Help Screen",
    description:
      "On-device reference screen listing all available actions with brief descriptions: Find, STS, Ack, New, POD, PCOB, PU/Del, Reset, Nxt, Prv, Info. Also shows device ID and copyright (ETA 2007–2020). Buttons: Done, Dbg, Operational mode.",
  },
  {
    src: "/eta-mobile/8.png",
    title: "Signature Capture",
    description:
      "Digital signature canvas for POD sign-off. Shows the 'Received in good condition' message, a Signed By text field, a touch-input drawing area for the recipient's signature, and Save/Clear/Cancel actions.",
  },
];

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: LogIn,
    title: "Driver Authentication",
    description:
      "Secure login screen with Driver ID and Password fields. Authenticates the driver against the ETA server before granting access to shipment data.",
    color: "from-blue-600 to-indigo-700",
  },
  {
    icon: ClipboardList,
    title: "Shipment Dashboard",
    description:
      "Central operational screen per PRO number. Displays status, driver duty state, destination address, pieces, weight, cube, PU/delivery counts, and live network connectivity state.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: FileSignature,
    title: "Proof of Delivery (POD)",
    description:
      "Structured POD form capturing condition code, signatory name, piece count, date/time, and damage reports. Supports barcode scanning, photos, and digital signature collection.",
    color: "from-emerald-500 to-green-700",
  },
  {
    icon: PenLine,
    title: "Digital Signature Capture",
    description:
      "Touch-input signature canvas for recipient sign-off at point of delivery. Includes Save, Clear, and Cancel actions integrated with the POD workflow.",
    color: "from-violet-500 to-purple-700",
  },
  {
    icon: Package,
    title: "New PRO Creation",
    description:
      "Form for creating new PRO records with pickup and destination addresses, contact names, and special instructions — committed directly from the device.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Search,
    title: "Find & Search",
    description:
      "Sortable shipment list with Pro#, action type, ZIP, and company columns. Touch-to-sort column headers and tap-to-select row interaction for quick PRO navigation.",
    color: "from-teal-500 to-cyan-600",
  },
  {
    icon: ShieldAlert,
    title: "Status & Acknowledgement",
    description:
      "In-dashboard Status button for changing shipment state and Ack for acknowledging new PUs. Includes PCOB (Pickup Confirmed on Board) confirmation workflow.",
    color: "from-rose-500 to-red-600",
  },
  {
    icon: ScrollText,
    title: "On-Device Help",
    description:
      "Built-in Info/Help screen with a complete quick-reference list of all available actions, gestures (swipe left/right), and tap interactions — accessible directly from the dashboard.",
    color: "from-slate-500 to-gray-600",
  },
];

// ─── Tech Stack ───────────────────────────────────────────────────────────────
const TECH_STACK = [
  { name: "React Native", icon: Smartphone, category: "Framework", color: "text-cyan-400" },
  { name: "Expo", icon: Cpu, category: "Toolchain", color: "text-white" },
  { name: "JavaScript (ES6+)", icon: Code2, category: "Language", color: "text-yellow-400" },
  { name: "REST APIs", icon: Layers, category: "Integration", color: "text-blue-400" },
  { name: "Context API", icon: RefreshCw, category: "State", color: "text-purple-400" },
  { name: "JWT Auth", icon: ShieldAlert, category: "Security", color: "text-orange-400" },
  { name: "Android Build", icon: Wrench, category: "Platform", color: "text-green-400" },
  { name: "Git", icon: GitBranch, category: "Version Control", color: "text-red-400" },
];

// ─── Contributions ────────────────────────────────────────────────────────────
const CONTRIBUTIONS = [
  {
    icon: Smartphone,
    title: "React Native Screen Development",
    description:
      "Implemented and refined frontend screens including the launch screen, driver login, main shipment dashboard, POD form, new PRO entry, find/search list, signature canvas, and info screen.",
  },
  {
    icon: Layers,
    title: "API Integration & Data Display",
    description:
      "Connected UI components to the existing REST API for driver authentication, PRO retrieval, status updates, and POD submission. Ensured server responses were rendered correctly across all screens.",
  },
  {
    icon: ClipboardList,
    title: "Status & Workflow Actions",
    description:
      "Wired up dashboard action buttons — Status, Ack, PCOB, POD, PU/Del, Next/Prev — to their respective API calls and ensured the UI reflected updated state after each action without requiring full reloads.",
  },
  {
    icon: FileSignature,
    title: "POD & Signature Capture Flow",
    description:
      "Built the Proof of Delivery form with condition dropdown, field validation, date/time display, and integrated the digital signature capture canvas with Save/Clear workflow before POD commit.",
  },
  {
    icon: RefreshCw,
    title: "State Management & Navigation",
    description:
      "Managed frontend state using Context API for authenticated session, current PRO data, and driver status. Implemented screen navigation flows between dashboard, POD, Find, and New PRO screens.",
  },
  {
    icon: TestTube2,
    title: "APK Builds & End-to-End Testing",
    description:
      "Generated and verified multiple Android APK releases. Performed functional testing of login, PRO navigation, status updates, POD submission, signature capture, and search across Android devices. Resolved production bugs identified during testing rounds.",
  },
];

// ─── Project Metadata ─────────────────────────────────────────────────────────
const META = [
  { label: "My Role", value: "Frontend / React Native Developer" },
  { label: "Platform", value: "Android" },
  { label: "App Version", value: "2.6.5" },
  { label: "Min Android", value: "7.0+" },
  { label: "Publisher", value: "ETAmobile" },
  { label: "Release Date", value: "23 September 2026" },
  { label: "Latest Update", value: "13 October 2026" },
  { label: "Download Size", value: "≈ 42 MB (varies by device)" },
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
const ETAMobileProjectPage = () => {
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
                aria-label="View ETA Mobile on Google Play"
                id="eta-mobile-play-store-nav"
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
        aria-label="ETA Mobile project overview"
      >
        {/* Background — deep navy/blue identity inspired by app screenshots */}
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[130px] pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(220 80% 55%), transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-1/4 w-[450px] h-[450px] rounded-full opacity-[0.05] blur-[110px] pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(200 70% 50%), transparent 70%)" }}
          aria-hidden="true"
        />
        {/* Subtle dot grid */}
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
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    Android · Production · Logistics
                  </span>
                </motion.div>

                {/* Logo + Title */}
                <motion.div variants={itemVariants} className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-border/40 shadow-lg shrink-0 bg-white">
                    <img
                      src="/eta-mobile/eta-logo.png"
                      alt="ETA Mobile app logo — Run Your World"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-none">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300">
                        ETA
                      </span>{" "}
                      Mobile
                    </h1>
                    <p className="text-muted-foreground text-base mt-1 font-medium">
                      ETA's production Android application for field operations
                    </p>
                  </div>
                </motion.div>

                {/* Summary */}
                <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
                  ETA Mobile is a{" "}
                  <strong className="text-foreground">production Android application</strong>{" "}
                  published by ETAmobile for driver-side logistics operations. It enables drivers
                  to authenticate, navigate shipment PROs, acknowledge pickups, capture
                  proof-of-delivery with digital signatures, create new PROs, and search their
                  load list — all from a purpose-built mobile interface connected to the ETA server.
                </motion.p>

                {/* Tech badges */}
                <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-6">
                  {["React Native", "Expo", "JavaScript", "REST APIs", "Context API", "JWT", "Android"].map((tech) => (
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
                  <span className="px-3 py-1.5 text-xs font-semibold bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
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
                      id="eta-mobile-play-store-hero"
                      aria-label="View ETA Mobile on Google Play Store"
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
                    id="eta-mobile-explore-screenshots"
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
                    className="absolute inset-0 blur-3xl opacity-20 scale-110 pointer-events-none"
                    style={{ background: "radial-gradient(circle, hsl(220 80% 55%), hsl(200 60% 50%), transparent 70%)" }}
                    aria-hidden="true"
                  />
                  <div className="relative rounded-3xl overflow-hidden border border-border/30 shadow-2xl">
                    <img
                      src={SCREENSHOTS[activeScreenshot].src}
                      alt={`ETA Mobile — ${SCREENSHOTS[activeScreenshot].title}`}
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
                            ? "w-5 h-2 bg-blue-400"
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
        id="eta-mobile-screenshots"
        ref={galleryRef}
        className="py-20 bg-muted/20 relative"
        aria-label="ETA Mobile app screenshots"
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
              <span className="text-blue-400 font-semibold uppercase tracking-widest text-xs">
                Screenshots
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
                App <span className="text-blue-400">Preview</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl text-sm">
                Real screenshots from ETA Mobile v2.6.5 on Android. Click any image to view fullscreen.
              </p>
            </motion.div>

            {/* Gallery: large active + thumbnail strip */}
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
                  alt={`ETA Mobile — ${SCREENSHOTS[activeScreenshot].title}`}
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
                        ? "border-blue-400 ring-2 ring-blue-400/30"
                        : "border-border/40 hover:border-blue-400/30 opacity-60 hover:opacity-100"
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
                      ? "w-6 h-2 bg-blue-400"
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
        id="eta-mobile-overview"
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
                <span className="text-blue-400 font-semibold uppercase tracking-widest text-xs">
                  Overview
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight mb-6">
                  What is <span className="text-blue-400">ETA Mobile?</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    ETA Mobile is a production Android application published by ETAmobile and
                    used by drivers for field logistics operations. Built under the tagline "Run
                    Your World," it connects drivers directly to the ETA server to manage
                    shipment PRO records throughout their work cycle.
                  </p>
                  <p>
                    The app centers on a shipment dashboard that displays PRO status, destination
                    address, piece/weight/cube data, and real-time connectivity state. From this
                    dashboard, drivers can acknowledge pickups (Ack), confirm pickup on board
                    (PCOB), submit proof of delivery (POD) with digital signature capture, create
                    new PROs, navigate their list, and search/filter across their active load.
                  </p>
                  <p>
                    The interface is deliberately minimal and task-focused, optimised for driver
                    use in the field — with large touch targets, clear status labels, and an
                    on-device Help screen that documents every available action.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="bg-card border border-border/40 rounded-2xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-border/40 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg overflow-hidden border border-border/30 bg-white shrink-0">
                      <img
                        src="/eta-mobile/eta-logo.png"
                        alt="ETA Mobile logo"
                        className="w-full h-full object-cover"
                      />
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
                    <a
                      href={PLAY_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 text-sm font-semibold hover:gap-3 transition-all duration-200 group"
                      aria-label="View ETA Mobile on Google Play Store"
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

      {/* ── Key Features ── */}
      <section
        id="eta-mobile-features"
        className="py-20 bg-muted/20 relative"
        aria-label="ETA Mobile key features"
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
              <span className="text-blue-400 font-semibold uppercase tracking-widest text-xs">Features</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
                What ETA Mobile <span className="text-blue-400">Does</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                Features verified directly from the published app screenshots (v2.6.5).
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
                    className="group bg-card border border-border/40 hover:border-blue-400/30 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
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
        id="eta-mobile-role"
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
              <span className="text-blue-400 font-semibold uppercase tracking-widest text-xs">Case Study</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
                My Role & <span className="text-blue-400">Contributions</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                I worked as a Frontend / React Native Developer on the mobile client. The ETA
                server, backend API, and business logic infrastructure were maintained separately.
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
                    className="group bg-card border border-border/40 hover:border-blue-400/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                        <Icon size={16} className="text-blue-400" />
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
        id="eta-mobile-tech-stack"
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
              <span className="text-blue-400 font-semibold uppercase tracking-widest text-xs">Stack</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
                Technology <span className="text-blue-400">Stack</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                Technologies I worked with directly as the frontend developer on ETA Mobile.
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
                    className="group bg-card border border-border/40 hover:border-blue-400/30 rounded-2xl p-5 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
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

            {/* Production context note */}
            <motion.div
              variants={itemVariants}
              className="mt-8 rounded-2xl border border-blue-400/20 bg-blue-500/5 px-6 py-5 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin size={18} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm mb-1">Production Field Application</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ETA Mobile is a production application used by drivers in the field for real
                  logistics operations. My work focused on ensuring the React Native frontend was
                  reliable, performant, and accurately reflected server data — including handling
                  network state warnings, refactoring the app architecture, and generating stable
                  APK releases tested across Android devices.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        id="eta-mobile-cta"
        className="py-24 relative overflow-hidden"
        aria-label="ETA Mobile on Google Play"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(220 80% 55% / 0.05), transparent)",
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
                src="/eta-mobile/eta-logo.png"
                alt="ETA Mobile logo"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300">
                ETA Mobile
              </span>{" "}
              — Run Your World
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-lg max-w-lg mx-auto mb-8"
            >
              A production field-operations app for drivers — available now on Google Play.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                id="eta-mobile-play-store-cta"
                variant="hero"
                size="lg"
                className="rounded-full px-10 gap-3 text-base group"
                asChild
              >
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View ETA Mobile on Google Play Store"
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
              ETA Mobile is published by ETAmobile. I contributed as a Frontend / React Native
              Developer — I did not develop the backend server, ETA API, or publish the
              application independently.
            </motion.p>

            {/* Verified badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium"
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
                alt={`ETA Mobile — ${SCREENSHOTS[lightboxIndex].title}`}
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
                      ? "w-5 h-2 bg-blue-400"
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

export default ETAMobileProjectPage;
