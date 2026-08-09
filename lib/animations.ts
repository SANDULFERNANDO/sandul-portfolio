import { Variants, Transition } from 'framer-motion';

// Cubic bezier curve typed as a tuple for Framer Motion compatibility
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const TRANSITION_BASE: Transition = {
  duration: 0.7,
  ease: EASE,
};

export const fadeUpVariants = (staggerIndex = 0): Variants => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: staggerIndex * 0.1,
      duration: 0.7,
      ease: EASE,
    },
  },
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};
