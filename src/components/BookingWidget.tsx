'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, ChevronRight } from 'lucide-react';

interface BookingWidgetProps {
  onBook: () => void;
}

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
];

export default function BookingWidget({ onBook }: BookingWidgetProps) {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [time, setTime] = useState('18:00');
  const [players, setPlayers] = useState<2 | 4>(4);

  return (
    <section id="booking-widget" className="relative z-10 -mt-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-[#111111] border border-[#262626] rounded-[10px] p-5 sm:p-6 shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
            {/* Date */}
            <div className="flex-1">
              <label className="flex items-center gap-1.5 text-[#A1A1AA] text-xs font-medium uppercase tracking-wider mb-2">
                <Calendar size={13} />
                Datum
              </label>
              <input
                type="date"
                value={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#262626] rounded-[6px] px-4 py-3 text-white text-sm focus:border-green-500/60 transition-colors [color-scheme:dark]"
              />
            </div>

            {/* Time */}
            <div className="flex-1">
              <label className="flex items-center gap-1.5 text-[#A1A1AA] text-xs font-medium uppercase tracking-wider mb-2">
                <Clock size={13} />
                Uhrzeit
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#262626] rounded-[6px] px-4 py-3 text-white text-sm focus:border-green-500/60 transition-colors appearance-none cursor-pointer"
              >
                {timeSlots.map((t) => (
                  <option key={t} value={t}>{t} Uhr</option>
                ))}
              </select>
            </div>

            {/* Players */}
            <div className="flex-1">
              <label className="flex items-center gap-1.5 text-[#A1A1AA] text-xs font-medium uppercase tracking-wider mb-2">
                <Users size={13} />
                Spieler
              </label>
              <div className="flex gap-2">
                {([2, 4] as const).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPlayers(n)}
                    className={`flex-1 py-3 rounded-[6px] text-sm font-semibold border transition-all duration-200 ${
                      players === n
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'bg-[#0A0A0A] border-[#262626] text-[#A1A1AA] hover:border-green-500/40 hover:text-white'
                    }`}
                  >
                    {n} Spieler
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="sm:pb-0">
              <button
                onClick={onBook}
                className="btn-primary w-full sm:w-auto px-6 py-3 text-sm whitespace-nowrap gap-1.5"
              >
                Verfügbare Courts
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          {/* Peak hint */}
          <div className="mt-3 pt-3 border-t border-[#1A1A1A] flex flex-wrap gap-4 text-xs text-[#52525B]">
            <span>
              <span className="text-green-500 font-medium">Peak-Preis</span> Mo–Fr 17–22h & Wochenende: ab 28€/h
            </span>
            <span>·</span>
            <span>
              <span className="text-white/60 font-medium">Off-Peak</span> Mo–Fr 9–17h: ab 18€/h
            </span>
            <span>·</span>
            <span className="text-green-400 font-medium">✓ Sofortbestätigung per E-Mail</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
