'use client';

import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';

interface PricingProps {
  onBook: () => void;
}

const plans = [
  {
    name: 'Einzelstunde',
    price: '22',
    period: '€/h',
    note: 'Off-Peak | Peak: 28€/h',
    description: 'Flexibel buchen ohne Bindung.',
    features: [
      'Kein Account nötig',
      'Gast-Checkout',
      'E-Mail-Bestätigung',
      'Alle Courts buchbar',
    ],
    cta: 'Jetzt buchen',
    highlighted: false,
    badge: null,
  },
  {
    name: '10er Block',
    price: '190',
    period: '€',
    note: '~14% Rabatt',
    description: 'Für Spieler die regelmäßig auf dem Court sind.',
    features: [
      'Alles aus Einzelstunde',
      '10 Stunden-Guthaben',
      'Keine Ablauf-Frist',
      'Priority Buchung',
      'Gültig für alle Courts',
    ],
    cta: 'Block kaufen',
    highlighted: true,
    badge: 'Beliebteste Wahl',
  },
  {
    name: 'Mitgliedschaft',
    price: '49',
    period: '€/Monat',
    note: 'Basic | Premium: 89€',
    description: 'Für leidenschaftliche Padel-Spieler.',
    features: [
      'Alles aus 10er Block',
      '4x/Monat priorisiert',
      'Mitgliederrabatte',
      'Event-Einladungen',
      'Gäste-Buchung',
    ],
    cta: 'Mitglied werden',
    highlighted: false,
    badge: null,
  },
];

export default function Pricing({ onBook }: PricingProps) {
  return (
    <section id="preise" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label mb-3">Transparente Preise</p>
          <h2 className="section-title text-5xl sm:text-7xl mb-4">
            FAIR.<br />
            <span className="text-gradient-orange">KLAR. DIREKT.</span>
          </h2>
          <p className="text-[#A1A1AA] max-w-lg">
            Keine versteckten Kosten. Kein Kleinstgedrucktes. Nur Court, Schläger, Bälle — und du.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative rounded-[10px] p-6 flex flex-col transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-[#111111] border-2 border-green-500 shadow-[0_0_40px_rgba(249,115,22,0.15)]'
                  : 'bg-[#111111] border border-[#262626]'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap">
                    <Zap size={11} className="fill-white" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-bebas text-white text-2xl tracking-wide mb-1">{plan.name}</h3>
                <p className="text-[#52525B] text-xs">{plan.description}</p>
              </div>

              <div className="mb-2">
                <div className="flex items-baseline gap-1">
                  <span className={`font-bebas text-6xl leading-none ${plan.highlighted ? 'text-green-500' : 'text-white'}`}>
                    {plan.price}
                  </span>
                  <span className="text-[#A1A1AA] text-base font-medium">{plan.period}</span>
                </div>
                <p className="text-[#52525B] text-xs mt-1">{plan.note}</p>
              </div>

              <div className="h-px bg-[#1A1A1A] my-5" />

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check size={14} className={plan.highlighted ? 'text-green-500 flex-shrink-0' : 'text-[#52525B] flex-shrink-0'} />
                    <span className="text-[#A1A1AA]">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onBook}
                className={`w-full py-3.5 rounded-[6px] text-sm font-semibold transition-all duration-200 ${
                  plan.highlighted
                    ? 'btn-primary'
                    : 'btn-ghost'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Peak/Off-peak info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid sm:grid-cols-2 gap-4"
        >
          <div className="p-4 rounded-[8px] bg-[#111111] border border-[#262626]">
            <div className="text-white font-semibold text-sm mb-1">Peak-Zeiten 🔥</div>
            <div className="text-[#A1A1AA] text-xs">Mo–Fr 17–22 Uhr · Samstag & Sonntag ganztags</div>
          </div>
          <div className="p-4 rounded-[8px] bg-[#111111] border border-[#262626]">
            <div className="text-white font-semibold text-sm mb-1">Off-Peak Zeiten 💡</div>
            <div className="text-[#A1A1AA] text-xs">Mo–Fr 9–17 Uhr — bis zu 35% günstiger</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
