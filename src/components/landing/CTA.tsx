import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, UserX, Infinity } from "lucide-react";

const CTA = () => (
  <section className="py-32 md:py-40 px-6 md:px-12 gradient-hero text-center">
    <motion.div
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
        Ready to create something beautiful?
      </h2>
      <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
        Start building your digital bouquet in seconds.
        No signup, no credit card, no hassle.
      </p>
      <div className="mt-10">
        <Link to="/builder">
          <Button
            size="lg"
            className="gradient-button border-0 text-primary-foreground shadow-soft-2xl text-lg px-12 py-7 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            Create Your First Bouquet
          </Button>
        </Link>
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-8 md:gap-12 text-muted-foreground">
        <span className="flex items-center gap-2 text-sm">
          <Heart size={16} className="text-primary" /> Always free
        </span>
        <span className="flex items-center gap-2 text-sm">
          <UserX size={16} className="text-primary" /> No account needed
        </span>
        <span className="flex items-center gap-2 text-sm">
          <Infinity size={16} className="text-primary" /> Unlimited bouquets
        </span>
      </div>
    </motion.div>
  </section>
);

export default CTA;
