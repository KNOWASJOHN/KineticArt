'use client';

import { useState } from 'react';
import Link from 'next/link';
import RegistrationForm from '@/components/registration-form';
import SuccessOverlay from '@/components/success-overlay';
import CertificateSection from '@/components/certificate-section';
import SponsorsSection from '@/components/sponsors-section';
import FeedbackSection from '@/components/feedback-section';

export default function Home() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const handleRegistrationSuccess = () => {
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  // Handle touch events only (not mouse clicks)
  const handleCardTouch = (cardId: string) => {
    setActiveCard(activeCard === cardId ? null : cardId);
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Gradient overlay background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-secondary/10 to-black opacity-50" />

      {/* Decorative gradient elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-gradient-to-r from-primary/20 via-secondary/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-l from-secondary/15 to-transparent blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* 1. Title & Description (Mobile: Top, Desktop: Top-Left) */}
          <div className="animate-slide-up space-y-8 order-1 lg:col-start-1 lg:row-start-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Event Title and Tagline */}
            <div>
              <p className="text-primary font-semibold text-lg mb-2 uppercase tracking-wider font-mono">Kinetic Art Event</p>
              <h1 className="text-5xl lg:text-6xl font-black text-white mb-4 leading-tight tracking-tight">
                <span className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">From Circuits</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(194,100,200,0.3)]">
                  to Compute
                </span>
              </h1>
              <div className="h-px w-24 md:w-48 bg-gradient-to-r from-transparent via-primary to-transparent my-6 mx-auto lg:mx-0"></div>
              <p className="text-2xl font-poppins font-semibold text-muted-foreground mb-6 tracking-normal">Supercomputer in Motion</p>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Discover Kinetic Art, an interactive tech showcase where innovation comes alive.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Experience a working miniature supercomputer and understand how real-world high-performance systems process massive data using parallel computing.
              </p>
            </div>
          </div>

          {/* 2. Registration Form (Mobile: After Description, Desktop: Right - Spanning 2 Rows) */}
          <div className="animate-slide-up order-3 lg:order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2" style={{ animationDelay: '0.1s' }}>
            <RegistrationForm onSuccess={handleRegistrationSuccess} />
          </div>

          {/* 3. Event Details Grid (Mobile: After Title, Desktop: Left Below Description) */}
          <div className="animate-slide-up order-2 lg:order-3 lg:col-start-1 lg:row-start-2 flex flex-col items-center lg:items-start text-center lg:text-left" style={{ animationDelay: '0.2s' }}>
            {/* Event Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 w-full">
              {/* Date Card */}
              <div
                className={`group relative bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 transition-all duration-300 overflow-hidden ${activeCard === 'date' ? 'border-primary/30 bg-card/40' : 'hover:border-primary/30 hover:bg-card/40'
                  }`}
                onTouchEnd={() => handleCardTouch('date')}
              >
                <p className="text-xs uppercase font-bold text-primary tracking-widest mb-2">Date</p>
                <p className="text-xl font-semibold text-white">4th & 5th</p>
                <p className="text-sm text-muted-foreground">February 2026</p>

                {/* Hover/Active glow effect */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/0 transition-opacity duration-300 pointer-events-none ${activeCard === 'date' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`} />

                {/* Light sweep effect */}
                <div className={`absolute inset-0 transition-transform duration-1000 ease-in-out pointer-events-none ${activeCard === 'date' ? 'translate-x-full' : '-translate-x-full group-hover:translate-x-full'
                  }`}>
                  <div className="h-full w-3/4 sm:w-2/3 md:w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </div>
              </div>

              {/* Time Card */}
              <div
                className={`group relative bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 transition-all duration-300 overflow-hidden ${activeCard === 'time' ? 'border-primary/30 bg-card/40' : 'hover:border-primary/30 hover:bg-card/40'
                  }`}
                onTouchEnd={() => handleCardTouch('time')}
              >
                <p className="text-xs uppercase font-bold text-primary tracking-widest mb-2">Time</p>
                <p className="text-xl font-semibold text-white">9:30 AM - 4:30 PM</p>

                {/* Hover/Active glow effect */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/0 transition-opacity duration-300 pointer-events-none ${activeCard === 'time' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`} />

                {/* Light sweep effect */}
                <div className={`absolute inset-0 transition-transform duration-1000 ease-in-out pointer-events-none ${activeCard === 'time' ? 'translate-x-full' : '-translate-x-full group-hover:translate-x-full'
                  }`}>
                  <div className="h-full w-3/4 sm:w-2/3 md:w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </div>
              </div>

              {/* Venue Card */}
              <div
                className={`group relative bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 transition-all duration-300 overflow-hidden ${activeCard === 'venue' ? 'border-primary/30 bg-card/40' : 'hover:border-primary/30 hover:bg-card/40'
                  }`}
                onTouchEnd={() => handleCardTouch('venue')}
              >
                <p className="text-xs uppercase font-bold text-primary tracking-widest mb-2">Venue</p>
                <p className="text-xl font-semibold text-white">Software Lab</p>
                <p className="text-sm text-muted-foreground">St. Mary's Block</p>

                {/* Hover/Active glow effect */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/0 transition-opacity duration-300 pointer-events-none ${activeCard === 'venue' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`} />

                {/* Light sweep effect */}
                <div className={`absolute inset-0 transition-transform duration-1000 ease-in-out pointer-events-none ${activeCard === 'venue' ? 'translate-x-full' : '-translate-x-full group-hover:translate-x-full'
                  }`}>
                  <div className="h-full w-3/4 sm:w-2/3 md:w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </div>
              </div>

              {/* Tagline Card */}
              <div
                className={`group relative bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 transition-all duration-300 overflow-hidden ${activeCard === 'tagline' ? 'border-primary/30 bg-card/40' : 'hover:border-primary/30 hover:bg-card/40'
                  }`}
                onTouchEnd={() => handleCardTouch('tagline')}
              >
                <p className="text-xs uppercase font-bold text-primary tracking-widest mb-2">Tagline</p>
                <p className="text-xl font-semibold text-white">See the system. Understand the speed.</p>

                {/* Hover/Active glow effect */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/0 transition-opacity duration-300 pointer-events-none ${activeCard === 'tagline' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`} />

                {/* Light sweep effect */}
                <div className={`absolute inset-0 transition-transform duration-1000 ease-in-out pointer-events-none ${activeCard === 'tagline' ? 'translate-x-full' : '-translate-x-full group-hover:translate-x-full'
                  }`}>
                  <div className="h-full w-3/4 sm:w-2/3 md:w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </div>
              </div>
            </div>

            {/* View Participants Button - Centered below event cards */}
            <div className="w-full flex justify-center mt-8">
              <Link
                href="/participants"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white btn-gradient hover:scale-105 transition-transform"
              >
                View Registered Participants
              </Link>
            </div>
          </div>

          {/* 4. Certificate Section (Mobile: After Info Cards, Desktop: Full Width Row 3) */}
          <div className="animate-slide-up space-y-6 order-4 lg:col-span-2 lg:row-start-3" style={{ animationDelay: '0.3s' }}>
            <CertificateSection />
          </div>

          {/* 5. Sponsors Section (Mobile: After Certificate, Desktop: Full Width Row 4) */}
          <div className="animate-slide-up space-y-6 order-5 lg:col-span-2 lg:row-start-4" style={{ animationDelay: '0.4s' }}>
            <SponsorsSection />
          </div>

          {/* 6. Feedback Section (Mobile: After Sponsors, Desktop: Full Width Row 5) */}
          <div className="animate-slide-up space-y-6 order-6 lg:col-span-2 lg:row-start-5" style={{ animationDelay: '0.5s' }}>
            <FeedbackSection />
          </div>
        </div>
      </div>

      {/* Success Overlay */}
      <SuccessOverlay isVisible={showSuccess} onClose={handleCloseSuccess} />
    </main>
  );
}
