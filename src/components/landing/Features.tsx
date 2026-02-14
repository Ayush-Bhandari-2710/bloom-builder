import { motion } from "framer-motion";
import { Eye, Clock, MessageCircle } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import { fadeUpVariants, staggerContainer } from "@/lib/animations";

const features = [
  {
    icon: Eye,
    title: "Dual Perspectives",
    description: "Create bouquets from top-down or side view. Every flower looks stunning from any angle.",
    gradient: "from-petal-pink to-bloom-rose",
  },
  {
    icon: Clock,
    title: "Timed Unlocks",
    description: "Set a future date for your bouquet to reveal. Perfect for surprises, anniversaries, or countdowns.",
    gradient: "from-petal-lavender to-accent",
  },
  {
    icon: MessageCircle,
    title: "Hidden Messages",
    description: "Attach secret notes to individual flowers. Recipients discover them by clicking.",
    gradient: "from-leaf-sage to-stem-green",
  },
];

const Features = () => (
  <section id="features" className="py-24 md:py-32 px-6 md:px-12 bg-background">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-16 md:mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
          Everything you need to create magic
        </h2>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {features.map((feature) => (
          <motion.div key={feature.title} variants={fadeUpVariants} transition={{ duration: 0.5 }}>
            <GlassCard className="p-10 h-full">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                <feature.icon size={28} className="text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-semibold mt-6 text-foreground">
                {feature.title}
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Features;
