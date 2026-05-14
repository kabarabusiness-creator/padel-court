'use client';

import { motion } from 'framer-motion';
import { Building2, Users, Wine, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';

const features = [
  { icon: Building2, label: 'Exklusive Court-Buchung' },
  { icon: Users, label: 'Bis zu 20 Teilnehmer' },
  { icon: Wine, label: 'Catering & Getränke' },
  { icon: FileText, label: 'Rechnung auf Firma' },
];

const bullets = [
  'Mehrere Courts gleichzeitig buchbar',
  'Corporate Rate ab 200€/Event',
  'Persönlicher Event-Ansprechpartner',
  'Equipment inklusive (Schläger & Bälle)',
  'Professionelle Fotos auf Anfrage',
  'Flexible Terminplanung & Stornier-Option',
];

export default function Corporate() {
  const handleContact = () => {
    document.querySelector('#location')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="corporate" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[12px] overflow-hidden bg-[#111111] border border-[#262626]"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/8 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-green-500/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative p-8 sm:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div>
                <span className="inline-block section-label mb-4">Für Unternehmen</span>
                <h2 className="font-bebas text-white leading-none mb-6" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}>
                  TEAMBUILDING<br />
                  <span className="text-gradient-orange">DAS HÄNGEN BLEIBT</span>
                </h2>
                <p className="text-[#A1A1AA] text-lg mb-8 leading-relaxed">
                  Padel ist das perfekte Team-Event. Jeder kann mitspielen, niemand braucht Vorkenntnisse —
                  und nach einer Stunde redet das ganze Team noch Tage davon.
                </p>

                {/* Feature icons */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {features.map((f) => (
                    <div key={f.label} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[6px] bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                        <f.icon size={16} className="text-green-500" />
                      </div>
                      <span className="text-[#A1A1AA] text-sm">{f.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleContact}
                    className="btn-primary px-7 py-3.5 text-sm gap-2"
                  >
                    Event anfragen
                    <ArrowRight size={16} />
                  </button>
                  <a
                    href="mailto:corporate@padelpark-kleinostheim.de"
                    className="btn-ghost px-7 py-3.5 text-sm"
                  >
                    corporate@padelpark-kleinostheim.de
                  </a>
                </div>
              </div>

              {/* Right */}
              <div className="space-y-3">
                <div className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Was im Paket enthalten ist:</div>
                {bullets.map((b, i) => (
                  <motion.div
                    key={b}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                    <span className="text-[#A1A1AA] text-sm">{b}</span>
                  </motion.div>
                ))}

                {/* Pricing note */}
                <div className="mt-6 pt-5 border-t border-[#1A1A1A]">
                  <div className="font-bebas text-white text-3xl">ab 200€ / Event</div>
                  <div className="text-[#52525B] text-xs mt-1">Auf Firmenrechnung · inkl. MwSt.</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
