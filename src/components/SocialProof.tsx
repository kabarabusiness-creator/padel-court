'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Michael R.',
    initials: 'MR',
    color: 'bg-green-500',
    rating: 5,
    date: 'März 2025',
    text: 'Absolut top Anlage! Die Indoor-Courts sind super gepflegt, Beleuchtung perfekt. Buchung online in 2 Minuten erledigt, kein Telefonat nötig. Genau so muss das sein.',
  },
  {
    name: 'Julia K.',
    initials: 'JK',
    color: 'bg-blue-500',
    rating: 5,
    date: 'April 2025',
    text: 'Wir kommen hier regelmäßig mit vier Freunden. Immer freie Zeiten, auch abends. Das 10er-Block-System lohnt sich total. Nächste Buchung läuft schon.',
  },
  {
    name: 'Thomas W.',
    initials: 'TW',
    color: 'bg-green-600',
    rating: 5,
    date: 'Mai 2025',
    text: 'Für unser Firmen-Event das Corporate-Paket gebucht — 3 Courts, Getränke, alles perfekt organisiert. Team war begeistert. Kommt definitiv nochmal für den nächsten Team-Event.',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="text-green-500 fill-green-500" />
      ))}
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <p className="section-label mb-3">Was Spieler sagen</p>
            <h2 className="section-title text-5xl sm:text-7xl">
              4.9 STERNE.<br />
              <span className="text-gradient-orange">267 BEWERTUNGEN.</span>
            </h2>
          </div>
          {/* Google badge */}
          <div className="flex items-center gap-3 bg-[#111111] border border-[#262626] rounded-[8px] px-5 py-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-green-500 fill-green-500" />
              ))}
            </div>
            <div className="text-left">
              <div className="text-white font-semibold text-sm">4.9 / 5</div>
              <div className="text-[#52525B] text-xs">Google Reviews</div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card-base p-6"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 ${review.color} rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                  {review.initials}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{review.name}</div>
                  <div className="text-[#52525B] text-xs">{review.date}</div>
                </div>
                <div className="ml-auto">
                  <Stars count={review.rating} />
                </div>
              </div>

              <p className="text-[#A1A1AA] text-sm leading-relaxed">&ldquo;{review.text}&rdquo;</p>

              {/* Google logo */}
              <div className="mt-4 pt-4 border-t border-[#1A1A1A] flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <span className="text-[#52525B] text-xs">Verifizierte Google-Bewertung</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
