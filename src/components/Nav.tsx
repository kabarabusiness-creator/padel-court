'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

interface NavProps {
  onBook: () => void;
}

const links = [
  { label: 'Courts', href: '#courts' },
  { label: 'Preise', href: '#preise' },
  { label: 'Kurse', href: '#kurse' },
  { label: 'Corporate', href: '#corporate' },
  { label: 'Kontakt', href: '#location' },
];

export default function Nav({ onBook }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#262626]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={(e) => handleLinkClick(e, 'body')} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-green-500 rounded-[4px] flex items-center justify-center group-hover:bg-green-600 transition-colors">
              <Zap size={16} className="text-white fill-white" />
            </div>
            <div className="leading-none">
              <span className="font-bebas text-white text-xl tracking-wide">PadelPark</span>
              <span className="block text-[10px] text-[#52525B] tracking-[0.15em] uppercase font-medium">Kleinostheim</span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[#A1A1AA] hover:text-white text-sm font-medium transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-green-500 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onBook}
              className="btn-primary px-5 py-2.5 text-sm"
            >
              Jetzt buchen
            </button>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white"
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-xl border-b border-[#262626] md:hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-white text-lg font-medium py-2 border-b border-[#1A1A1A]"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setMenuOpen(false); onBook(); }}
                className="btn-primary w-full py-4 text-base mt-2"
              >
                Jetzt Court buchen
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
