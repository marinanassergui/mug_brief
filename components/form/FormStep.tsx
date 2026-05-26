"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormStepProps {
  children: React.ReactNode;
  step: number;
}

export function FormStep({ children, step }: FormStepProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -24 }}
        transition={{ duration: 0.4, ease: [0.215, 0.610, 0.355, 1.000] }} // cubic-bezier easeOut
        className="w-full flex flex-col gap-8 text-left"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
