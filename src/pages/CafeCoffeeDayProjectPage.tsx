import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const LIVE_URL = "https://cafe-coffe-day.netlify.app/";
const TECH = ["React", "Vite", "Tailwind CSS", "Netlify"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const CafeCoffeeDayProjectPage = () => {
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const goBack = () => {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate("/");
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/web-projects/cafe-coffee-day-preview.png"
          alt=""
          aria-hidden="true"
          className={`w-full h-full object-cover object-top transition-opacity duration-1000 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImgLoaded(true)}
        />
        {/* Warm coffee-toned overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30" />
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, hsl(25 40% 8%) 100%)" }}
        />
      </div>

      {/* ── Top bar ── */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-5">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors group"
          aria-label="Back to portfolio"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </button>
        <Button
          variant="hero"
          size="sm"
          className="rounded-full gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
          asChild
        >
          <a href={LIVE_URL} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={14} />
            Live Site
          </a>
        </Button>
      </nav>

      {/* ── Hero Content ── */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 lg:px-12">
        <div className="max-w-3xl text-center">
          {/* Badge */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/25 text-orange-200 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              Community Café
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.9]"
          >
            Cafe
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-300 via-amber-200 to-orange-400">
              Coffee Day
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed max-w-xl mx-auto"
          >
            A warm, inviting website for a neighbourhood artisanal café — featuring a full menu with real pricing, community workspace positioning, customer testimonials, and reservation support. The site drives footfall by turning online visitors into in-person guests.
          </motion.p>

          {/* Tech stack */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 flex flex-wrap justify-center gap-2"
          >
            {TECH.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-[11px] font-medium text-white/60 bg-white/8 border border-white/10 rounded-full backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="hero"
              size="lg"
              className="rounded-full px-10 gap-3 text-base group bg-orange-500 hover:bg-orange-400 text-white border-0 font-semibold shadow-lg shadow-orange-500/20"
              asChild
            >
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="cafe-coffee-day-live-cta"
                aria-label="Visit Cafe Coffee Day live website"
              >
                <ExternalLink
                  size={18}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
                Visit Live Website ↗
              </a>
            </Button>
            <Button
              variant="heroOutline"
              size="lg"
              className="rounded-full border-white/20 text-white/80 hover:bg-white/10 hover:text-white"
              onClick={goBack}
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Projects
            </Button>
          </motion.div>
        </div>
      </main>

      {/* ── Bottom tagline ── */}
      <div className="relative z-10 pb-10 text-center">
        <motion.p
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-white/30 text-xs font-medium tracking-wider uppercase"
        >
          A place to sip, work & connect
        </motion.p>
      </div>
    </div>
  );
};

export default CafeCoffeeDayProjectPage;
