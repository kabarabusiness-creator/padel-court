'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Check, Calendar, Clock, Users, CreditCard, Smartphone, Zap } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 1 | 2 | 3 | 'success';

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

const availableCourts = [
  { id: 'c1', name: 'Court 1 — Indoor Pro', type: 'Indoor', price: 28, gradient: 'linear-gradient(135deg, #1c0a00, #2d1500)', features: ['Klimaanlage', 'LED', 'Profiglas'] },
  { id: 'c2', name: 'Court 2 — Indoor Classic', type: 'Indoor', price: 24, gradient: 'linear-gradient(135deg, #0a0d1c, #121830)', features: ['Klimaanlage', 'LED'] },
  { id: 'c3', name: 'Court 3 — Outdoor Arena', type: 'Outdoor', price: 20, gradient: 'linear-gradient(135deg, #001a0a, #002d12)', features: ['Flutlicht', 'Open-Air'] },
];

const paymentMethods = [
  { id: 'card', label: 'Kreditkarte', icon: CreditCard },
  { id: 'paypal', label: 'PayPal', icon: Smartphone },
  { id: 'sofort', label: 'Sofortüberweisung', icon: Zap },
];

function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const colors = ['#22C55E', '#4ADE80', '#86EFAC', '#FFFFFF', '#16A34A', '#BBF7D0'];
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 100,
      w: Math.random() * 10 + 5,
      h: Math.random() * 5 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 5,
      vy: Math.random() * 4 + 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
      gravity: 0.08,
      opacity: 1,
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        if (p.y > canvas.height + 20) return;
        alive = true;
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotationSpeed;
        if (p.y > canvas.height * 0.7) p.opacity -= 0.01;
      });
      if (alive) animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<Step>(1);
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [time, setTime] = useState('18:00');
  const [players, setPlayers] = useState<2 | 4>(4);
  const [selectedCourt, setSelectedCourt] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [payment, setPayment] = useState('card');

  const reset = useCallback(() => {
    setStep(1);
    setSelectedCourt(null);
    setName('');
    setEmail('');
    setPhone('');
    setPayment('card');
  }, []);

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const chosenCourt = availableCourts.find((c) => c.id === selectedCourt);
  const isPeak = ['17:00', '18:00', '19:00', '20:00', '21:00'].includes(time);

  const stepTitles: Record<Step, string> = {
    1: 'Datum & Zeit wählen',
    2: 'Court wählen',
    3: 'Bestätigung & Zahlung',
    success: 'Buchung bestätigt!',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full sm:max-w-lg bg-[#111111] border border-[#262626] rounded-t-[16px] sm:rounded-[12px] overflow-hidden max-h-[95vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A] flex-shrink-0">
              <div className="flex items-center gap-3">
                {(step === 2 || step === 3) && (
                  <button
                    onClick={() => setStep(step === 2 ? 1 : 2)}
                    className="text-[#A1A1AA] hover:text-white transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                )}
                <div>
                  <h2 className="font-bebas text-white text-xl tracking-wide">{stepTitles[step]}</h2>
                  {step !== 'success' && (
                    <p className="text-[#52525B] text-xs">Schritt {step} von 3</p>
                  )}
                </div>
              </div>
              <button onClick={handleClose} className="text-[#52525B] hover:text-white transition-colors w-8 h-8 flex items-center justify-center">
                <X size={18} />
              </button>
            </div>

            {/* Progress bar */}
            {step !== 'success' && (
              <div className="h-0.5 bg-[#1A1A1A] flex-shrink-0">
                <motion.div
                  className="h-full bg-green-500"
                  initial={false}
                  animate={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {/* STEP 1 */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="p-6 space-y-5"
                  >
                    {/* Date */}
                    <div>
                      <label className="flex items-center gap-2 text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                        <Calendar size={12} className="text-green-500" />
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
                    <div>
                      <label className="flex items-center gap-2 text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-3">
                        <Clock size={12} className="text-green-500" />
                        Uhrzeit
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map((t) => {
                          const peak = ['17:00', '18:00', '19:00', '20:00', '21:00'].includes(t);
                          return (
                            <button
                              key={t}
                              onClick={() => setTime(t)}
                              className={`py-2.5 rounded-[6px] text-xs font-semibold border transition-all duration-150 relative ${
                                time === t
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'bg-[#0A0A0A] border-[#262626] text-[#A1A1AA] hover:border-green-500/40'
                              }`}
                            >
                              {t}
                              {peak && time !== t && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-500/60 border border-[#111111]" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                      {isPeak && (
                        <p className="mt-2 text-xs text-green-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          Peak-Zeit — höherer Tarif gilt
                        </p>
                      )}
                    </div>

                    {/* Players */}
                    <div>
                      <label className="flex items-center gap-2 text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                        <Users size={12} className="text-green-500" />
                        Spieleranzahl
                      </label>
                      <div className="flex gap-3">
                        {([2, 4] as const).map((n) => (
                          <button
                            key={n}
                            onClick={() => setPlayers(n)}
                            className={`flex-1 py-3 rounded-[6px] text-sm font-semibold border transition-all duration-150 ${
                              players === n
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'bg-[#0A0A0A] border-[#262626] text-[#A1A1AA] hover:border-green-500/40'
                            }`}
                          >
                            {n} Spieler
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      className="btn-primary w-full py-4 text-sm gap-2 mt-2"
                    >
                      Verfügbare Courts anzeigen
                      <ChevronRight size={15} />
                    </button>
                  </motion.div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="p-6 space-y-4"
                  >
                    {/* Booking summary */}
                    <div className="flex gap-3 text-xs text-[#52525B] bg-[#0A0A0A] rounded-[6px] px-4 py-2.5 border border-[#1A1A1A]">
                      <span>{date}</span>
                      <span>·</span>
                      <span>{time} Uhr</span>
                      <span>·</span>
                      <span>{players} Spieler</span>
                    </div>

                    <p className="text-[#52525B] text-xs">3 Courts verfügbar — wähle deinen:</p>

                    {availableCourts.map((court) => (
                      <button
                        key={court.id}
                        onClick={() => setSelectedCourt(court.id)}
                        className={`w-full text-left rounded-[8px] border transition-all duration-200 overflow-hidden ${
                          selectedCourt === court.id
                            ? 'border-green-500 bg-green-500/5'
                            : 'border-[#262626] bg-[#0A0A0A] hover:border-green-500/30'
                        }`}
                      >
                        <div className="flex items-stretch">
                          {/* Color strip */}
                          <div className="w-16 flex-shrink-0" style={{ background: court.gradient }} />
                          <div className="p-4 flex-1 flex items-center justify-between gap-3">
                            <div>
                              <div className="text-white text-sm font-semibold">{court.name}</div>
                              <div className="flex gap-1.5 mt-1.5 flex-wrap">
                                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                                  court.type === 'Indoor'
                                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                    : 'bg-green-500/10 text-green-400 border-green-500/20'
                                }`}>
                                  {court.type}
                                </span>
                                {court.features.map((f) => (
                                  <span key={f} className="text-[10px] text-[#52525B]">{f}</span>
                                ))}
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="font-bebas text-white text-2xl leading-none">{court.price}€</div>
                              <div className="text-[#52525B] text-[10px]">/Stunde</div>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}

                    <button
                      onClick={() => selectedCourt && setStep(3)}
                      disabled={!selectedCourt}
                      className={`btn-primary w-full py-4 text-sm gap-2 mt-2 ${!selectedCourt ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      Weiter zur Buchung
                      <ChevronRight size={15} />
                    </button>
                  </motion.div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="p-6 space-y-5"
                  >
                    {/* Order summary */}
                    <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-[8px] p-4">
                      <div className="text-[#52525B] text-xs uppercase tracking-wider mb-3">Deine Buchung</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-[#A1A1AA]">Court</span>
                          <span className="text-white font-medium">{chosenCourt?.name.split(' — ')[1]}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#A1A1AA]">Datum & Zeit</span>
                          <span className="text-white font-medium">{date}, {time} Uhr</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#A1A1AA]">Spieler</span>
                          <span className="text-white font-medium">{players}</span>
                        </div>
                        <div className="h-px bg-[#1A1A1A] my-2" />
                        <div className="flex justify-between font-semibold">
                          <span className="text-white">Gesamt (1h)</span>
                          <span className="text-green-500 font-bebas text-xl leading-none">{chosenCourt?.price}€</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider block mb-1.5">Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Dein vollständiger Name"
                          className="w-full bg-[#0A0A0A] border border-[#262626] rounded-[6px] px-4 py-3 text-white text-sm placeholder:text-[#52525B] focus:border-green-500/60 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider block mb-1.5">E-Mail</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="deine@email.de"
                          className="w-full bg-[#0A0A0A] border border-[#262626] rounded-[6px] px-4 py-3 text-white text-sm placeholder:text-[#52525B] focus:border-green-500/60 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider block mb-1.5">Telefon <span className="text-[#52525B] normal-case font-normal">(optional)</span></label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+49 ..."
                          className="w-full bg-[#0A0A0A] border border-[#262626] rounded-[6px] px-4 py-3 text-white text-sm placeholder:text-[#52525B] focus:border-green-500/60 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Payment */}
                    <div>
                      <label className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider block mb-2">Zahlungsart</label>
                      <div className="grid grid-cols-3 gap-2">
                        {paymentMethods.map((m) => (
                          <button
                            key={m.id}
                            onClick={() => setPayment(m.id)}
                            className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-[6px] border text-xs font-medium transition-all duration-150 ${
                              payment === m.id
                                ? 'border-green-500 bg-green-500/10 text-white'
                                : 'border-[#262626] bg-[#0A0A0A] text-[#A1A1AA] hover:border-green-500/30'
                            }`}
                          >
                            <m.icon size={15} />
                            {m.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => name && email && setStep('success')}
                      disabled={!name || !email}
                      className={`btn-primary w-full py-4 text-sm gap-2 ${(!name || !email) ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      Buchung bestätigen · {chosenCourt?.price}€
                    </button>
                    <p className="text-[#52525B] text-xs text-center">
                      🔒 Sichere Zahlung via Stripe. Keine Speicherung von Zahlungsdaten.
                    </p>
                  </motion.div>
                )}

                {/* SUCCESS */}
                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className="relative p-8 flex flex-col items-center text-center overflow-hidden"
                  >
                    <ConfettiCanvas />

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(249,115,22,0.5)]"
                    >
                      <Check size={36} className="text-white" strokeWidth={3} />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <h3 className="font-bebas text-white text-4xl tracking-wide mb-2">COURT GEBUCHT!</h3>
                      <p className="text-[#A1A1AA] text-sm mb-6 leading-relaxed">
                        Deine Buchung ist bestätigt. Eine Bestätigung wurde an <strong className="text-white">{email}</strong> gesendet.
                      </p>

                      <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-[8px] p-4 mb-6 text-left w-full max-w-xs mx-auto">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[#52525B]">Court</span>
                            <span className="text-white font-medium">{chosenCourt?.name.split(' — ')[1]}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#52525B]">Datum</span>
                            <span className="text-white font-medium">{date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#52525B]">Zeit</span>
                            <span className="text-white font-medium">{time} – {parseInt(time) + 1}:00 Uhr</span>
                          </div>
                          <div className="flex justify-between font-semibold pt-1 border-t border-[#1A1A1A]">
                            <span className="text-white">Bezahlt</span>
                            <span className="text-green-500 font-bebas text-xl leading-none">{chosenCourt?.price}€</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleClose}
                        className="btn-primary px-8 py-3.5 text-sm"
                      >
                        Schließen
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
