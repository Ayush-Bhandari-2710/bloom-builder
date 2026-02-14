import { motion } from "framer-motion";
import GlassCard from "@/components/shared/GlassCard";
import { showcaseBouquets } from "@/lib/constants";
import { fadeUpVariants, staggerContainer } from "@/lib/animations";
import { Flower2, MessageCircle } from "lucide-react";

const Showcase = () => (
  <section id="showcase" className="py-24 md:py-32 px-6 md:px-12 bg-background">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
          Get inspired
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          See what others have created
        </p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {showcaseBouquets.map((bouquet) => (
          <motion.div key={bouquet.title} variants={fadeUpVariants} transition={{ duration: 0.5 }}>
            <GlassCard className="overflow-hidden">
              <div className={`aspect-[4/3] bg-gradient-to-br ${bouquet.gradient} flex items-center justify-center`}>
                <span className="text-6xl opacity-60">💐</span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {bouquet.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Flower2 size={14} />
                    {bouquet.flowers} flowers
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={14} />
                    {bouquet.detail}
                  </span>
                </p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Showcase;
