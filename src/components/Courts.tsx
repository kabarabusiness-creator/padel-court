'use client';

import { motion } from 'framer-motion';
import { Zap, Wind, Sun, Thermometer, ArrowRight } from 'lucide-react';

interface CourtsProps {
  onBook: () => void;
}

const courts = [
  {
    id: 'c1',
    name: 'Court 1 — Indoor Pro',
    type: 'Indoor',
    badge: 'Beliebteste Wahl',
    gradient: 'linear-gradient(135deg, #1c0a00 0%, #2d1500 40%, #1a0800 100%)',
    accentGradient: 'from-green-500/20 to-transparent',
    features: ['LED-Beleuchtung', 'Klimaanlage', 'Panoramaverglasung', 'Profiglas'],
    icons: [Thermometer, Zap, Wind],
    price: 28,
    peakNote: 'Peak',
  },
  {
    id: 'c2',
    name: 'Court 2 — Indoor Classic',
    type: 'Indoor',
    badge: null,
    gradient: 'linear-gradient(135deg, #0a0d1c 0%, #121830 40%, #0a0c1a 100%)',
    accentGradient: 'from-cyan-500/10 to-transparent',
    features: ['LED-Beleuchtung', 'Klimaanlage', 'Standard-Verglasung'],
    icons: [Thermometer, Zap],
    price: 24,
    peakNote: 'Peak',
  },
  {
    id: 'c3',
    name: 'Court 3 — Outdoor Arena',
    type: 'Outdoor',
    badge: 'Neu',
    gradient: 'linear-gradient(135deg, #001a0a 0%, #002d12 40%, #001808 100%)',
    accentGradient: 'from-green-500/10 to-transparent',
    features: ['Flutlichtanlage', 'Wetterschutz', 'Tribüne'],
    icons: [Sun, Zap],
    price: 20,
    peakNote: 'Peak',
  },
  {
    id: 'c4',
    name: 'Court 4 — Outdoor Open',
    type: 'Outdoor',
    badge: null,
    gradient: 'linear-gradient(135deg, #1a1800 0%, #2d2a00 40%, #181600 100%)',
    accentGradient: 'from-yellow-500/10 to-transparent',
    features: ['Flutlichtanlage', 'Naturbelüftung', 'Freiplatz'],
    icons: [Sun, Zap],
    price: 18,
    peakNote: 'Peak',
  },
];

export default function Courts({ onBook }: CourtsProps) {
  return (
    <section id="courts" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label mb-3">Die Anlage</p>
          <h2 className="section-title text-5xl sm:text-7xl mb-4">
            4 COURTS.<br />
            <span className="text-gradient-orange">DEINE WAHL.</span>
          </h2>
          <p className="text-[#A1A1AA] max-w-lg">
            2 Indoor-Courts für Ganzjahresbetrieb, 2 Outdoor-Courts für die Open-Air-Experience.
            Alle mit professionellem Spielbelag und LED-Beleuchtung.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {courts.map((court, i) => (
            <motion.div
              key={court.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card-base group"
            >
              {/* Court Visual */}
              <div className="relative h-52 overflow-hidden" style={{ background: court.gradient }}>
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${court.accentGradient}`} />

                {/* Court lines decoration */}
                <div className="absolute inset-0 flex items-center justify-center opacity-15">
                  <div className="w-4/5 h-3/4 border border-white/40 rounded-sm relative">
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/40" />
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-white/40" />
                    <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 border border-white/30 rounded-full" />
                  </div>
                </div>

                {/* Badge + Type */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    court.type === 'Indoor'
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25'
                      : 'bg-green-500/20 text-green-400 border border-green-500/30'
                  }`}>
                    {court.type}
                  </span>
                  {court.badge && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500 text-white">
                      {court.badge}
                    </span>
                  )}
                </div>

                {/* Price overlay */}
                <div className="absolute bottom-4 right-4 text-right">
                  <div className="font-bebas text-white text-3xl leading-none">
                    ab {court.price}€<span className="text-sm font-sans font-normal text-[#A1A1AA]">/h</span>
                  </div>
                  <div className="text-[10px] text-[#52525B] uppercase tracking-wider">{court.peakNote}</div>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-bebas text-white text-2xl mb-3 tracking-wide">{court.name}</h3>

                <div className="flex flex-wrap gap-2 mb-5">
                  {court.features.map((f) => (
                    <span key={f} className="text-xs text-[#A1A1AA] border border-[#262626] rounded-full px-3 py-1">
                      {f}
                    </span>
                  ))}
                </div>

                <button
                  onClick={onBook}
                  className="btn-primary w-full py-3 text-sm gap-2"
                >
                  Jetzt buchen
                  <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
