'use client';

import { Zap, Instagram, Facebook, Youtube } from 'lucide-react';

const links = {
  anlage: [
    { label: 'Courts', href: '#courts' },
    { label: 'Preise', href: '#preise' },
    { label: 'Kurse', href: '#kurse' },
    { label: 'Corporate', href: '#corporate' },
  ],
  info: [
    { label: 'Über uns', href: '#' },
    { label: 'Öffnungszeiten', href: '#location' },
    { label: 'Anfahrt', href: '#location' },
    { label: 'Kontakt', href: '#location' },
  ],
  legal: [
    { label: 'Impressum', href: '#' },
    { label: 'Datenschutz', href: '#' },
    { label: 'AGB', href: '#' },
    { label: 'Cookie-Einstellungen', href: '#' },
  ],
};

export default function Footer() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#') return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060606] border-t border-[#1A1A1A] pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-[4px] flex items-center justify-center">
                <Zap size={16} className="text-white fill-white" />
              </div>
              <div className="leading-none">
                <span className="font-bebas text-white text-xl tracking-wide">PadelPark</span>
                <span className="block text-[10px] text-[#52525B] tracking-[0.15em] uppercase">Kleinostheim</span>
              </div>
            </div>
            <p className="text-[#52525B] text-sm leading-relaxed max-w-xs mb-6">
              Dein Padel-Court im Herzen des Rhein-Main-Gebiets. 4 Courts. Indoor & Outdoor. Sofortbuchung.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: '#' },
                { Icon: Facebook, href: '#' },
                { Icon: Youtube, href: '#' },
              ].map(({ Icon, href }) => (
                <a
                  key={href + Icon.name}
                  href={href}
                  className="w-9 h-9 rounded-[6px] bg-[#111111] border border-[#262626] flex items-center justify-center text-[#52525B] hover:text-white hover:border-green-500/40 transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'Anlage', items: links.anlage },
            { title: 'Info', items: links.info },
            { title: 'Rechtliches', items: links.legal },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => scrollTo(e, item.href)}
                      className="text-[#52525B] text-sm hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#1A1A1A] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#52525B] text-xs">
            © 2026 PadelPark Kleinostheim. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-2 text-[#52525B] text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Alle 4 Courts verfügbar · Letzte Buchung vor 4 Min.
          </div>
        </div>
      </div>
    </footer>
  );
}
