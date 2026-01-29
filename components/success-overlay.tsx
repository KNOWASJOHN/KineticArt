'use client';

import { useEffect } from 'react';
import { Check } from 'lucide-react';

interface SuccessOverlayProps {
  isVisible: boolean;
  onClose?: () => void;
}

export default function SuccessOverlay({ isVisible, onClose }: SuccessOverlayProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6 rounded-2xl border-2 elegant-border bg-card p-12 text-center elegant-shadow-lg animate-slide-up">
        {/* Gradient donut decoration */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-primary to-secondary opacity-80 blur-lg" />
          <div className="relative w-24 h-24 rounded-full bg-card flex items-center justify-center">
            <Check className="h-10 w-10 text-primary" strokeWidth={3} />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Registration Complete
          </h2>
          <p className="text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold">
            Welcome to Kinetic Art Super Computer!
          </p>
        </div>

        <p className="max-w-sm text-sm text-muted-foreground font-light leading-relaxed">
          Prepare yourself for an extraordinary experience of innovation in motion. Get ready to explore the future of technology and art.
        </p>

        <div className="mt-4 w-8 h-8 rounded-full gradient-glow opacity-80 animate-pulse-gentle" />
      </div>
    </div>
  );
}
