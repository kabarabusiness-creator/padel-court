'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Car, Train } from 'lucide-react';

const hours = [
  { day: 'Montag – Freitag', time: '07:00 – 23:00 Uhr' },
  { day: 'Samstag', time: '08:00 – 22:00 Uhr' },
  { day: 'Sonntag & Feiertage', time: '09:00 – 21:00 Uhr' },
];

const contact = [
  { icon: MapPin, label: 'Adresse', value: 'Musterstraße 12, 63801 Kleinostheim' },
  { icon: Phone, label: 'Telefon', value: '+49 6027 123 456' },
  { icon: Mail, label: 'E-Mail', value: 'info@padelpark-kleinostheim.de' },
];

export default function Location() {
  return (
    <section id="location" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label mb-3">Standort</p>
          <h2 className="section-title text-5xl sm:text-7xl">
            FIND UNS.<br />
            <span className="text-gradient-orange">SPIEL MIT UNS.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[10px] overflow-hidden bg-[#111111] border border-[#262626] min-h-[360px] flex items-center justify-center"
          >
            {/* Map placeholder — in production replace with actual Google Maps embed */}
            <div className="absolute inset-0 court-grid-bg opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent" />
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(249,115,22,0.5)]">
                <MapPin size={28} className="text-white" />
              </div>
              <p className="text-white font-semibold">PadelPark Kleinostheim</p>
              <p className="text-[#A1A1AA] text-sm mt-1">Musterstraße 12, 63801 Kleinostheim</p>
              <a
                href="https://maps.google.com/?q=Kleinostheim"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-green-500 text-sm font-medium hover:text-green-400 transition-colors"
              >
                In Google Maps öffnen →
              </a>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Contact */}
            <div className="card-base p-6">
              <h3 className="font-bebas text-white text-xl tracking-wide mb-4">Kontakt</h3>
              <div className="space-y-4">
                {contact.map((c) => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-[6px] bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                      <c.icon size={15} className="text-green-500" />
                    </div>
                    <div>
                      <div className="text-[#52525B] text-xs">{c.label}</div>
                      <div className="text-white text-sm font-medium">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div className="card-base p-6">
              <h3 className="font-bebas text-white text-xl tracking-wide mb-4 flex items-center gap-2">
                <Clock size={16} className="text-green-500" />
                Öffnungszeiten
              </h3>
              <div className="space-y-2">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between items-center py-2 border-b border-[#1A1A1A] last:border-0">
                    <span className="text-[#A1A1AA] text-sm">{h.day}</span>
                    <span className="text-white text-sm font-medium">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Directions */}
            <div className="card-base p-6">
              <h3 className="font-bebas text-white text-xl tracking-wide mb-4">Anfahrt</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Car size={15} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-[#A1A1AA] text-sm">Kostenlose Parkplätze direkt vor der Anlage. Von der A3 Ausfahrt Aschaffenburg-Ost (ca. 8 Min.).</p>
                </div>
                <div className="flex items-start gap-3">
                  <Train size={15} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-[#A1A1AA] text-sm">Bahnhof Kleinostheim (S-Bahn Linie S2), dann 5 Min. zu Fuß.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
