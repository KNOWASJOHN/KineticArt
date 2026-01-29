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
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column - Event Details */}
          <div className="animate-slide-up space-y-8">
            {/* Event Title and Tagline */}
            <div>
              <p className="text-primary font-semibold text-lg mb-2 uppercase tracking-wider">Kinetic Art Event</p>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                From Circuits
                <br />
                <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                  to Compute
                </span>
              </h1>
              <p className="text-2xl font-semibold text-muted-foreground mb-6">Supercomputer in Motion</p>
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
                <p className="text-sm text-muted-foreground">February 2025</p>
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

          {/* Right Column - Registration Form */}
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <RegistrationForm onSuccess={handleRegistrationSuccess} />
          </div>
        </div>
      </div>

      {/* Success Overlay */}
      <SuccessOverlay isVisible={showSuccess} onClose={handleCloseSuccess} />
    </main>
  );
}
