'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface MobileBarProps {
  onBook: () => void;
}

export default function MobileBar({ onBook }: MobileBarProps) {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, duration: 0.4, ease: 'easeOut' }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0A0A0A]/95 backdrop-blur-md border-t border-[#1A1A1A] px-4 py-3 safe-area-bottom"
    >
      <button
        onClick={onBook}
        className="btn-primary w-full py-4 text-base gap-2"
      >
        Court buchen
        <ArrowRight size={18} />
      </button>
    </motion.div>
  );
}
