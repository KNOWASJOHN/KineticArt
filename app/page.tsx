'use client';

import { useState } from 'react';
import Link from 'next/link';
import RegistrationForm from '@/components/registration-form';
import SuccessOverlay from '@/components/success-overlay';

export default function Home() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRegistrationSuccess = () => {
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
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
              <p className="text-2xl font-light text-muted-foreground mb-6 tracking-wide">Supercomputer in Motion</p>
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

          {/* 2. Registration Form (Mobile: Middle, Desktop: Right - Spanning 2 Rows) */}
          <div className="animate-slide-up order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2" style={{ animationDelay: '0.1s' }}>
            <RegistrationForm onSuccess={handleRegistrationSuccess} />
          </div>

          {/* 3. Button & Info Cards (Mobile: Bottom, Desktop: Bottom-Left) */}
          <div className="animate-slide-up space-y-8 order-3 lg:col-start-1 lg:row-start-2 flex flex-col items-center lg:items-start text-center lg:text-left" style={{ animationDelay: '0.2s' }}>
            {/* View Participants Button */}
            <div className="pt-2">
              <Link
                href="/participants"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white btn-gradient"
              >
                View Registered Participants
              </Link>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <p className="text-xs uppercase font-bold text-primary tracking-widest mb-2">Date</p>
                <p className="text-xl font-semibold text-white">4th & 5th</p>
                <p className="text-sm text-muted-foreground">February 2026</p>
              </div>
              <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <p className="text-xs uppercase font-bold text-primary tracking-widest mb-2">Time</p>
                <p className="text-xl font-semibold text-white">9:30 AM - 4:30 PM</p>
              </div>
              <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <p className="text-xs uppercase font-bold text-primary tracking-widest mb-2">Venue</p>
                <p className="text-xl font-semibold text-white">Software Lab</p>
                <p className="text-sm text-muted-foreground">St. Mary's Block</p>
              </div>
              <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <p className="text-xs uppercase font-bold text-primary tracking-widest mb-2">Tagline</p>
                <p className="text-sm text-white font-medium">See the system. Understand the speed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Overlay */}
      <SuccessOverlay isVisible={showSuccess} onClose={handleCloseSuccess} />
    </main>
  );
}
