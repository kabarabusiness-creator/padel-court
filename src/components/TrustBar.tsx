'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, LayoutGrid, Star, Calendar } from 'lucide-react';

const stats = [
  { icon: Users, value: 350, suffix: '+', label: 'Aktive Spieler', cyan: false },
  { icon: LayoutGrid, value: 4, suffix: '', label: 'Courts', cyan: true },
  { icon: Star, value: 4.9, suffix: '/5', label: 'Google Bewertung', cyan: false },
  { icon: Calendar, value: 2024, suffix: '', label: 'Gegründet', cyan: true },
];

function Counter({ target, suffix, decimal }: { target: number; suffix: string; decimal?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1500;
        const steps = 50;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(decimal ? Math.round(current * 10) / 10 : Math.floor(current));
          }
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, decimal]);

  return (
    <span ref={ref}>
      {decimal ? count.toFixed(1) : count}
      {suffix}
    </span>
  );
}

export default function TrustBar() {
  return (
    <section className="py-10 mt-16 border-y border-[#1A1A1A] bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className={`w-10 h-10 rounded-[6px] flex items-center justify-center flex-shrink-0 ${
                stat.cyan
                  ? 'bg-cyan-500/10 border border-cyan-500/20'
                  : 'bg-green-500/10 border border-green-500/20'
              }`}>
                <stat.icon size={18} className={stat.cyan ? 'text-cyan-400' : 'text-green-500'} />
              </div>
              <div>
                <div className="font-bebas text-white text-3xl leading-none">
                  <Counter
                    target={stat.value}
                    suffix={stat.suffix}
                    decimal={Number.isInteger(stat.value) ? false : true}
                  />
                </div>
                <div className="text-[#52525B] text-xs mt-0.5">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
