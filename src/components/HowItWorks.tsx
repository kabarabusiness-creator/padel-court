'use client';

import { motion } from 'framer-motion';
import { MousePointerClick, CalendarCheck, Trophy } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MousePointerClick,
    title: 'Court wählen',
    description: 'Datum, Uhrzeit und Spieleranzahl eingeben. Verfügbare Courts in Echtzeit sehen.',
  },
  {
    number: '02',
    icon: CalendarCheck,
    title: 'Zeit buchen',
    description: 'Court auswählen, Kontaktdaten eingeben, sicher per Kreditkarte oder PayPal bezahlen.',
  },
  {
    number: '03',
    icon: Trophy,
    title: 'Spielen',
    description: 'Bestätigung per E-Mail, zum Court — fertig. Keine Wartezeit, kein Telefonat.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">So funktioniert&apos;s</p>
          <h2 className="section-title text-5xl sm:text-7xl">
            IN 3 SCHRITTEN<br />
            <span className="text-gradient-orange">ZUM COURT</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-gradient-to-r from-green-500/20 via-cyan-500/40 to-green-500/20" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative text-center"
            >
              {/* Number bg */}
              <div className="relative inline-flex mb-6">
                <span className="font-bebas text-[6rem] leading-none text-[#111111] select-none absolute -top-8 left-1/2 -translate-x-1/2">
                  {step.number}
                </span>
                <div className="relative z-10 w-20 h-20 rounded-full bg-[#111111] border border-[#262626] flex items-center justify-center group-hover:border-green-500/40 mx-auto">
                  <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <step.icon size={24} className="text-green-500" />
                  </div>
                </div>
              </div>

              <h3 className="font-bebas text-white text-2xl tracking-wide mb-3">{step.title}</h3>
              <p className="text-[#A1A1AA] text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Highlight box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-14 p-6 rounded-[8px] bg-green-500/5 border border-green-500/20 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="text-white font-semibold text-lg">Buchung in unter 60 Sekunden.</p>
            <p className="text-[#A1A1AA] text-sm">Kein Account nötig. Sofortbestätigung per E-Mail & SMS.</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-[#A1A1AA]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Stripe-gesichert
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              PayPal
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              Sofortüberweisung
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
