import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import FloatingFlower from "@/components/shared/FloatingFlower";
import { fadeUpVariants, staggerContainer } from "@/lib/animations";

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
    {/* Floating flowers */}
    <FloatingFlower emoji="🌹" className="top-[15%] left-[10%] animate-float text-5xl" />
    <FloatingFlower emoji="🌷" className="top-[25%] right-[15%] animate-float-delayed text-4xl" />
    <FloatingFlower emoji="🌸" className="bottom-[20%] left-[20%] animate-float-slow text-6xl" />
    <FloatingFlower emoji="🌼" className="top-[60%] right-[10%] animate-float text-3xl" />
    <FloatingFlower emoji="🌺" className="top-[10%] right-[40%] animate-float-delayed text-4xl opacity-30" />

    <motion.div
      className="relative z-10 text-center px-6 max-w-3xl mx-auto"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.h1
        variants={fadeUpVariants}
        transition={{ duration: 0.6 }}
        className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight text-foreground"
      >
        Create digital bouquets{" "}
        <span className="gradient-text">that bloom forever</span>
      </motion.h1>

      <motion.p
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed"
      >
        Craft beautiful, personalized flower arrangements.
        Add hidden messages. Share with a link. No login required.
      </motion.p>

      <motion.div
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-10"
      >
        <Link to="/builder">
          <Button
            size="lg"
            className="gradient-button border-0 text-primary-foreground shadow-pink text-lg px-10 py-6 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            Create Your Bouquet
          </Button>
        </Link>
      </motion.div>

      <motion.p
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6 text-sm text-muted-foreground/70"
      >
        ✨ Free forever • 🔒 Anonymous • ⚡ Instant sharing
      </motion.p>
    </motion.div>
  </section>
);

export default Hero;
