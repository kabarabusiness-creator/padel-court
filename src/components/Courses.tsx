'use client';

import { motion } from 'framer-motion';
import { GraduationCap, TrendingUp, Users, ArrowRight, Clock, Euro } from 'lucide-react';

interface CoursesProps {
  onBook: () => void;
}

const courses = [
  {
    id: 'beginners',
    icon: GraduationCap,
    level: 'Anfänger',
    title: 'Von 0 auf Court',
    description: 'Noch nie gespielt? Perfekt. In 4 Einheiten lernst du die Grundlagen und spielst dein erstes Match.',
    duration: '4 × 90 Min.',
    price: '89',
    spots: 6,
    gradient: 'from-green-500/20 via-transparent to-transparent',
    borderColor: 'border-green-500/30',
    accentColor: 'text-green-500',
    badgeBg: 'bg-green-500/10 text-green-400 border-green-500/20',
  },
  {
    id: 'advanced',
    icon: TrendingUp,
    level: 'Fortgeschrittene',
    title: 'Level Up',
    description: 'Du spielst schon, willst aber besser werden? Taktik, Technik, Matchplay — alles auf dem nächsten Level.',
    duration: '4 × 90 Min.',
    price: '119',
    spots: 4,
    gradient: 'from-blue-500/15 via-transparent to-transparent',
    borderColor: 'border-blue-500/20',
    accentColor: 'text-blue-400',
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  {
    id: 'openplay',
    icon: Users,
    level: 'Open Play',
    title: 'Einfach spielen',
    description: 'Du hast keinen Partner? Kein Problem. Offene Spielzeiten — wir matchen dich mit anderen Spielern gleichen Levels.',
    duration: '90 Min. pro Session',
    price: '12',
    spots: 8,
    gradient: 'from-green-500/15 via-transparent to-transparent',
    borderColor: 'border-green-500/20',
    accentColor: 'text-green-400',
    badgeBg: 'bg-green-500/10 text-green-400 border-green-500/20',
  },
];

export default function Courses({ onBook }: CoursesProps) {
  return (
    <section id="kurse" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label mb-3">Training & Events</p>
          <h2 className="section-title text-5xl sm:text-7xl mb-4">
            KURSE &<br />
            <span className="text-gradient-orange">OPEN PLAY</span>
          </h2>
          <p className="text-[#A1A1AA] max-w-lg">
            Egal ob Neueinsteiger oder ambitionierter Spieler — wir haben das richtige Programm für dich.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative card-base group hover:${course.borderColor} p-0 overflow-hidden`}
            >
              {/* Top gradient */}
              <div className={`h-2 bg-gradient-to-r ${course.gradient.replace('via-transparent to-transparent', '')}`}
                style={{ background: course.borderColor.includes('orange') ? 'linear-gradient(90deg, #22C55E, transparent)' : course.borderColor.includes('blue') ? 'linear-gradient(90deg, #3B82F6, transparent)' : 'linear-gradient(90deg, #22C55E, transparent)' }}
              />

              <div className="p-6">
                {/* Level badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${course.badgeBg}`}>
                    {course.level}
                  </span>
                  <div className={`w-10 h-10 rounded-[6px] bg-[#1A1A1A] border border-[#262626] flex items-center justify-center ${course.accentColor}`}>
                    <course.icon size={18} />
                  </div>
                </div>

                <h3 className="font-bebas text-white text-2xl tracking-wide mb-2">{course.title}</h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed mb-6">{course.description}</p>

                {/* Meta */}
                <div className="flex gap-4 mb-6">
                  <div className="flex items-center gap-1.5 text-xs text-[#52525B]">
                    <Clock size={12} />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#52525B]">
                    <Users size={12} />
                    {course.spots} Plätze
                  </div>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-bebas text-3xl leading-none ${course.accentColor}`}>
                      {course.price}€
                    </div>
                    <div className="text-[#52525B] text-xs">
                      {course.id === 'openplay' ? 'pro Session' : 'pro Kurs'}
                    </div>
                  </div>
                  <button
                    onClick={onBook}
                    className="btn-ghost px-4 py-2.5 text-sm gap-1.5"
                  >
                    Anmelden
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Schnupperkurs banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-5 rounded-[8px] border border-green-500/30 bg-green-500/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <span className="text-green-500 text-sm font-bold uppercase tracking-wider">🎾 Erster Schnupperkurs kostenlos</span>
            <p className="text-[#A1A1AA] text-sm mt-1">Probier Padel ohne Risiko. Erster Kurs auf unsere Kosten — überzeugt dich, oder du zahlst nichts.</p>
          </div>
          <button onClick={onBook} className="btn-primary px-6 py-3 text-sm whitespace-nowrap">
            Gratis Schnuppern
          </button>
        </motion.div>
      </div>
    </section>
  );
}
