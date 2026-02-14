export const fadeUpVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const scaleOnHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
};

export const cardHover = {
  whileHover: { y: -4, transition: { duration: 0.3 } },
};

export const pageTransition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1] as const,
};
