"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const pageVariants = {
  initial: {
    y: '100%',
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1
  },
  exit: {
    y: '-100%',
    opacity: 0
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.8
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}