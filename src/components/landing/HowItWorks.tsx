import { motion } from "framer-motion";
import { fadeUpVariants } from "@/lib/animations";

const steps = [
  {
    num: "1",
    title: "Choose your view",
    description: "Start with a top-down arrangement or build a stunning bouquet in a decorative pot. Switch anytime.",
    emoji: "👁️",
  },
  {
    num: "2",
    title: "Arrange & personalize",
    description: "Drag flowers onto your canvas. Rotate, resize, layer them. Add hidden messages to make it truly special.",
    emoji: "✋",
  },
  {
    num: "3",
    title: "Publish & share",
    description: "Get a beautiful link and QR code. Set an unlock time if you want. Your bouquet is saved forever—no account needed.",
    emoji: "🔗",
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 md:py-32 px-6 md:px-12 bg-card">
    <div className="max-w-3xl mx-auto">
      <motion.div
        className="text-center mb-16 md:mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
          Create in three simple steps
        </h2>
      </motion.div>

      <div className="space-y-16 md:space-y-20">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            className="flex gap-6 md:gap-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full gradient-button flex items-center justify-center shadow-pink">
                <span className="font-display text-3xl md:text-4xl text-primary-foreground font-semibold">
                  {step.num}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="w-px h-full mt-4 border-l-2 border-dashed border-border" />
              )}
            </div>
            <div className="pt-2 pb-4 flex-1">
              <h3 className="font-display text-2xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed text-lg">
                {step.description}
              </p>
              <div className="mt-6 glass rounded-xl p-8 flex items-center justify-center shadow-soft">
                <span className="text-5xl">{step.emoji}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
