'use client';

import React from "react"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface FormData {
  fullName: string;
  email: string;
  college: string;
  phone: string;
}

interface RegistrationFormProps {
  onSuccess?: () => void;
}

const STORAGE_KEY = 'kinetic_art_registration_draft';

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    college: '',
    phone: '',
  });

  const [error, setError] = useState('');
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  // Check if event has ended (event was on Feb 4-5, 2026)
  const checkRegistrationStatus = () => {
    const now = new Date();
    const eventEndDate = new Date('2026-02-05T16:30:00+05:30'); // Event ended on Feb 5, 2026 at 4:30 PM IST

    // Registration is closed if current time is after event end
    return now < eventEndDate;
  };

  // Check registration status on mount
  useEffect(() => {
    setIsRegistrationOpen(checkRegistrationStatus());
  }, []);

  // Load saved form data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      }
    } catch (err) {
      console.error('Failed to load saved form data:', err);
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    try {
      // Only save if at least one field has data
      if (formData.fullName || formData.email || formData.college || formData.phone) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      }
    } catch (err) {
      console.error('Failed to save form data:', err);
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // Only allow numbers and '+' character
    const filteredValue = value.replace(/[^0-9+]/g, '');
    setFormData((prev) => ({ ...prev, phone: filteredValue }));
    setError('');
  };

  const handleClear = () => {
    setFormData({ fullName: '', email: '', college: '', phone: '' });
    setError('');
    // Clear saved data from localStorage
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear saved form data:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Check if event has ended
    const now = new Date();
    const eventEndDate = new Date('2026-02-05T16:30:00+05:30'); // Event ended on Feb 5, 2026 at 4:30 PM IST

    if (now >= eventEndDate) {
      setError('Registration is now closed. The event concluded on February 5th, 2026.');
      return;
    }

    // Validate email format before proceeding
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Store form data for background processing
    const submissionData = { ...formData };

    // Save to localStorage as backup before clearing
    try {
      localStorage.setItem(STORAGE_KEY + '_pending', JSON.stringify(submissionData));
    } catch (err) {
      console.error('Failed to save pending data:', err);
    }

    // Immediately show success screen and clear form
    setFormData({ fullName: '', email: '', college: '', phone: '' });
    onSuccess?.();

    // Validate registration in the background
    (async () => {
      try {
        const { createClient } = await import('@/utils/supabase/client');
        const supabase = createClient();

        // Check if email already exists
        const { data: existingUser } = await supabase
          .from('participants')
          .select('id')
          .eq('email', submissionData.email)
          .maybeSingle();

        if (existingUser) {
          // Import toast dynamically
          const { toast } = await import('sonner');
          toast.error('Registration Failed', {
            description: 'This email is already registered. Please use a different email.',
            duration: 5000,
          });

          // Restore form data so user can edit
          setFormData(submissionData);

          // Clear pending data
          try {
            localStorage.removeItem(STORAGE_KEY + '_pending');
          } catch (err) {
            console.error('Failed to clear pending data:', err);
          }

          return;
        }

        const { data, error: supabaseError } = await supabase
          .from('participants')
          .insert([
            {
              name: submissionData.fullName,
              email: submissionData.email,
              college: submissionData.college,
              phone: submissionData.phone,
            },
          ])
          .select()
          .single();

        if (supabaseError) {
          // Import toast dynamically
          const { toast } = await import('sonner');
          toast.error('Registration Failed', {
            description: 'Failed to save your registration. Please try again.',
            duration: 5000,
            action: {
              label: 'Retry',
              onClick: () => {
                // Restore form data
                setFormData(submissionData);
              },
            },
          });

          console.error('Background registration error:', supabaseError);
          return;
        }

        // Success! Show confirmation toast
        const { toast } = await import('sonner');
        toast.success('Registration Confirmed!', {
          description: `Welcome, ${submissionData.fullName}! Check your email for confirmation.`,
          duration: 4000,
        });

        // Clear saved draft and pending data from localStorage
        try {
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem(STORAGE_KEY + '_pending');
        } catch (err) {
          console.error('Failed to clear saved form data:', err);
        }

        // Log submission
        console.log('[v0] Form submitted successfully:', submissionData);

        // Send confirmation email (don't block on this)
        try {
          const { error: funcError } = await supabase.functions.invoke('send-email', {
            body: {
              id: data.id,
              name: submissionData.fullName,
              email: submissionData.email,
              college: submissionData.college,
            },
          });
          if (funcError) {
            console.error('Failed to send confirmation email:', funcError);
          }
        } catch (emailErr) {
          console.error('Error invoking email function:', emailErr);
        }
      } catch (err: any) {
        // Import toast dynamically
        const { toast } = await import('sonner');
        toast.error('Network Error', {
          description: 'Could not connect to server. Please check your internet connection and try again.',
          duration: 6000,
          action: {
            label: 'Retry',
            onClick: () => {
              // Restore form data
              setFormData(submissionData);
            },
          },
        });

        console.error('[v0] Background registration error:', err);
      }
    })();
  };

  return (
    <Card className="w-full bg-card/50 elegant-border backdrop-blur-md border-2 elegant-shadow-lg">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Registration Closed Banner */}
        {!isRegistrationOpen && (
          <div className="mb-4 sm:mb-6 p-4 sm:p-6 rounded-lg sm:rounded-xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 border-2 border-primary/40 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex-shrink-0 self-center sm:self-auto">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 uppercase tracking-wide">
                  Event Has Concluded
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  The Kinetic Art event ended on <span className="text-primary font-semibold whitespace-nowrap">February 5th, 2026</span>
                </p>
                <p className="text-xs text-muted-foreground/80 mt-1 hidden sm:block">
                  Thank you to all participants! Certificates will be distributed soon.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Official Registration Section */}
        <div className="mt-8 pt-8 border-t border-white/10 opacity-40 grayscale pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* QR Code - Left on Desktop, Top on Mobile */}
            <div className="flex justify-center lg:justify-end order-2 lg:order-1">
              <a
                href="https://qrfy.io/O0wJlH95eT"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity group"
              >
                <img
                  src="/reg_form/off_qr_code.jpeg"
                  alt="Official Registration QR Code"
                  className="w-48 lg:w-56 rounded-lg border-2 border-white/20 elegant-shadow-lg cursor-pointer group-hover:border-primary/40 transition-all"
                />
              </a>
            </div>

            {/* Text Content - Right on Desktop, Bottom on Mobile */}
            <div className="text-center lg:text-left space-y-3 order-1 lg:order-2">
              <h3 className="text-lg lg:text-xl font-semibold tracking-wide text-white uppercase leading-relaxed">
                Official <span className="font-orbitron tracking-wide whitespace-nowrap"><img src="/techletics-logo.png" className="inline-block w-7" /><span className="text-[#c9a55c]">TECH</span>LETICS<span className="text-[#c9a55c]">'26</span></span>
                <br className="hidden lg:block" />
                <span className="lg:block"> Event Registration Form </span>
              </h3>
              <p className="text-sm text-muted-foreground">
                Scan the QR code or{' '}
                <a
                  href="https://qrfy.io/O0wJlH95eT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors underline font-semibold"
                >
                  click here
                </a>
                {' '}to register in the official form
              </p>
            </div>
          </div>
        </div>

        {/* Feedback Section Redirect */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="text-center space-y-4">
            <div>
              <p className="text-primary font-semibold text-sm mb-2 uppercase tracking-wider font-mono">Share Your Experience</p>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
                We'd Love to Hear Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Feedback</span>
              </h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Your thoughts and suggestions help us improve future events. Share your experience with us!
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  const feedbackSection = document.querySelector('#feedback-section');
                  if (feedbackSection) {
                    feedbackSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="relative inline-flex items-center gap-2 px-6 py-3 rounded-lg btn-gradient text-white font-bold uppercase tracking-wider transition-all hover:scale-105 group overflow-hidden"
              >
                <span className="relative z-10">Submit Feedback</span>
                <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>

                {/* Light sweep effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none">
                  <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
