import { useState, useEffect } from "react";
import { motion, animate, useInView } from "framer-motion";
import {
  Sparkles,
  Users,
  Palette,
  Clock,
  Download,
  Lock,
  Link2,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUpVariants, staggerContainer } from "@/lib/animations";

const features = [
  {
    icon: Users,
    title: "Real-time Collaboration",
    description:
      "Build bouquets together with friends in real-time. See changes as they happen.",
  },
  {
    icon: Palette,
    title: "Custom Color Themes",
    description:
      "Recolor flowers to match your vision. Create unlimited custom palettes.",
  },
  {
    icon: Clock,
    title: "Unlimited History",
    description:
      "Access every version of your bouquets. Never lose a beautiful creation.",
  },
  {
    icon: Download,
    title: "Export & Print",
    description:
      "Download high-resolution PNGs and printable PDFs of your digital bouquets.",
  },
  {
    icon: Lock,
    title: "Private Gallery",
    description:
      "Keep your creations private with password-protected access control.",
  },
  {
    icon: Link2,
    title: "Custom Share Links",
    description: "Get your own branded URL: yourname.everbloom.app",
  },
];

const TARGET_COUNT = 1248;

const AtelierSection = () => {
  const [displayCount, setDisplayCount] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [counterRef, setCounterRef] = useState<HTMLDivElement | null>(null);
  const isInView = useInView(counterRef ? { current: counterRef } : { current: null! }, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, TARGET_COUNT + (hasVoted ? 1 : 0), {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplayCount(Math.floor(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  const handleVote = () => {
    setHasVoted((prev) => {
      setDisplayCount((c) => (prev ? c - 1 : c + 1));
      return !prev;
    });
  };

  return (
    <section
      aria-labelledby="atelier-heading"
      className="relative overflow-hidden py-24 md:py-32 px-6 md:px-12"
      style={{
        background:
          "linear-gradient(135deg, hsl(264 100% 95%) 0%, hsl(112 55% 93%) 100%)",
      }}
    >
      {/* Shimmer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -inset-full animate-[shimmer_8s_ease-in-out_infinite]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-xs uppercase tracking-[1.5px] font-semibold text-forest-green shadow-sage mb-6">
            <Sparkles size={14} />
            Coming Soon
          </span>

          <h2
            id="atelier-heading"
            className="font-display text-4xl md:text-5xl font-semibold text-foreground"
          >
            Something more is blooming…
          </h2>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-[700px] mx-auto leading-relaxed">
            Introducing{" "}
            <span className="gradient-text font-semibold">
              Everbloom Atelier
            </span>
            <br />
            A more powerful studio experience for creators who want to go
            deeper.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20 max-w-[1100px] mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fadeUpVariants}
                transition={{ duration: 0.5 }}
                className="relative glass rounded-2xl p-8 md:p-10 shadow-soft-lg transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 hover:shadow-soft-2xl overflow-hidden group"
              >
                {/* Top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{
                    background:
                      "linear-gradient(90deg, hsl(338 70% 51%), hsl(150 38% 71%))",
                  }}
                />

                <div
                  className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(240,230,255,0.6) 0%, rgba(255,181,194,0.6) 100%)",
                    border: "1px solid rgba(255,255,255,0.3)",
                  }}
                >
                  <Icon size={28} className="text-primary" />
                </div>

                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Interest Counter */}
        <div
          ref={setCounterRef}
          className="text-center mb-12 py-12 relative"
          aria-live="polite"
        >
          {/* Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-64 h-32 rounded-full blur-3xl opacity-30"
              style={{
                background:
                  "linear-gradient(135deg, hsl(338 70% 51%), hsl(150 38% 71%))",
              }}
            />
          </div>

          <div className="relative">
            <span
              className="font-display text-6xl md:text-[72px] font-light tracking-[-2px] gradient-text"
            >
              {displayCount.toLocaleString()}
            </span>
            <p className="mt-3 text-lg text-muted-foreground">
              creators want Atelier
            </p>
            <p className="mt-2 text-sm text-muted-foreground/60">Join them.</p>
          </div>
        </div>

        {/* Vote Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={handleVote}
            aria-label={
              hasVoted
                ? "Remove interest in Everbloom Atelier"
                : "Express interest in Everbloom Atelier"
            }
            className={`rounded-full text-lg px-12 py-7 font-semibold border-0 text-primary-foreground shadow-pink transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] animate-[subtle-pulse_10s_ease-in-out_infinite] ${
              hasVoted
                ? "bg-gradient-to-r from-stem-green to-forest-green"
                : "gradient-button"
            }`}
          >
            {hasVoted ? (
              <>
                <CheckCircle size={20} />
                You're on the list 💐
              </>
            ) : (
              <>
                <Sparkles size={20} />
                I want Everbloom Atelier
              </>
            )}
          </Button>
          <p className="mt-4 text-sm text-muted-foreground/70">
            Help shape the future of Everbloom
          </p>
        </div>
      </div>
    </section>
  );
};

export default AtelierSection;
