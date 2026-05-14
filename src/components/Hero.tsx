'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HeroProps {
  onBook: () => void;
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Hero({ onBook }: HeroProps) {
  const scrollToWidget = () => {
    document.querySelector('#booking-widget')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/hero.webp)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay — heavy at bottom for text legibility, lighter at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/30" />
      {/* Extra left-side darkness for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-[#0A0A0A]/40 to-transparent" />

      {/* Green glow bottom-left */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[300px] bg-green-500/15 blur-[100px] pointer-events-none" />
      {/* Cyan glow top-right — echoes the court LED lighting in the photo */}
      <div className="absolute -top-20 right-0 w-[500px] h-[400px] bg-cyan-500/10 blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pt-24 pb-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-4xl lg:max-w-none"
        >
          {/* Badge */}
          <motion.div variants={item} className="mb-6">
            <span className="inline-flex items-center gap-2 text-green-500 text-sm font-semibold tracking-[0.15em] uppercase border border-green-500/30 rounded-full px-4 py-1.5 bg-green-500/5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Kleinostheim · 4 Courts verfügbar
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={item}
            className="font-bebas leading-none mb-6 text-[clamp(4rem,_11vw,_9.5rem)] lg:text-[clamp(5rem,_13vw,_13rem)]"
          >
            <span className="text-white block">PADEL.</span>
            <span className="text-white block">WANN DU WILLST.</span>
            <span className="text-gradient-orange block">MIT WEM DU WILLST.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p variants={item} className="text-[#A1A1AA] text-lg sm:text-xl max-w-xl mb-10 leading-relaxed">
            4 Courts. Indoor & Outdoor. Buchung in unter 60 Sekunden — kein Account nötig.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onBook}
              className="btn-primary px-8 py-4 text-base gap-2"
            >
              Jetzt Court buchen
              <ArrowRight size={18} />
            </button>
            <button
              onClick={scrollToWidget}
              className="btn-ghost px-8 py-4 text-base"
            >
              Verfügbarkeit prüfen
            </button>
          </motion.div>

          {/* Quick stats row */}
          <motion.div
            variants={item}
            className="mt-14 flex flex-wrap gap-8 border-t border-white/10 pt-8"
          >
            {[
              { value: '350+', label: 'Aktive Spieler' },
              { value: '4', label: 'Courts' },
              { value: '4.9★', label: 'Google Rating' },
              { value: 'Seit 2024', label: 'In Betrieb' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-bebas text-white text-3xl leading-none">{stat.value}</div>
                <div className="text-[#52525B] text-sm mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={scrollToWidget}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#52525B] hover:text-green-500 transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
