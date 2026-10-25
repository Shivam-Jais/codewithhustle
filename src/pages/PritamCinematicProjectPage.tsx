import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const LIVE_URL = "https://pritamcinematic.netlify.app/";
const TECH = ["React", "Vite", "Tailwind CSS", "Netlify"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const PritamCinematicProjectPage = () => {
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
          src="/web-projects/pritam-cinematic-preview.png"
          alt=""
          aria-hidden="true"
          className={`w-full h-full object-cover object-top transition-opacity duration-1000 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImgLoaded(true)}
        />
        {/* Cinematic dark overlay with warm undertones */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30" />
        {/* Subtle warm vignette */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, hsl(30 40% 8%) 100%)" }}
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
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/15 border border-yellow-500/25 text-yellow-200 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse" />
              Cinematic Photography
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
            Pritam
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-300 italic">
              Cinematic
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
            A luxury cinematic wedding photography portfolio — showcasing wedding films, pre-wedding shoots, and couple sessions through a dramatic dark aesthetic. The site helps couples feel the studio's storytelling vision and book their date with confidence.
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
              className="rounded-full px-10 gap-3 text-base group bg-yellow-400 hover:bg-yellow-300 text-black border-0 font-semibold shadow-lg shadow-yellow-500/20"
              asChild
            >
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="pritam-cinematic-live-cta"
                aria-label="Visit Pritam Cinematic live website"
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
          className="text-white/30 text-xs font-medium tracking-wider uppercase italic"
        >
          Every frame, a love story
        </motion.p>
      </div>
    </div>
  );
};

export default PritamCinematicProjectPage;
