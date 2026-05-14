import type { Metadata } from 'next';
import { Bebas_Neue, DM_Sans } from 'next/font/google';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Padel Court buchen in Kleinostheim | PadelPark Kleinostheim',
  description: 'Court in Kleinostheim sofort online buchen. 4 Courts, Indoor & Outdoor. Echtzeit-Verfügbarkeit. Jetzt reservieren!',
  keywords: 'Padel Kleinostheim, Padel buchen Kleinostheim, Padel Court 63801, Padel Aschaffenburg',
  openGraph: {
    title: 'PadelPark Kleinostheim — Dein Court. In 60 Sekunden gebucht.',
    description: '4 Courts. Indoor & Outdoor. Jetzt Verfügbarkeit checken und sofort buchen.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
