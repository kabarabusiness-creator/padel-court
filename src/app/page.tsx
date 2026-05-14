'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import BookingWidget from '@/components/BookingWidget';
import TrustBar from '@/components/TrustBar';
import Courts from '@/components/Courts';
import HowItWorks from '@/components/HowItWorks';
import Pricing from '@/components/Pricing';
import SocialProof from '@/components/SocialProof';
import Courses from '@/components/Courses';
import Corporate from '@/components/Corporate';
import Location from '@/components/Location';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import MobileBar from '@/components/MobileBar';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <>
      <Nav onBook={openBooking} />
      <main>
        <Hero onBook={openBooking} />
        <BookingWidget onBook={openBooking} />
        <TrustBar />
        <Courts onBook={openBooking} />
        <HowItWorks />
        <Pricing onBook={openBooking} />
        <SocialProof />
        <Courses onBook={openBooking} />
        <Corporate />
        <Location />
      </main>
      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
      <MobileBar onBook={openBooking} />
    </>
  );
}
