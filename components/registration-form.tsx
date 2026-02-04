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
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);

  // Check if registration is currently open based on time
  const checkRegistrationHours = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    const startTime = 9 * 60; // 9:00 AM
    const endTime = 16 * 60 + 30; // 4:30 PM

    return currentTimeInMinutes >= startTime && currentTimeInMinutes < endTime;
  };

  // Check registration hours on mount and every minute
  useEffect(() => {
    setIsRegistrationOpen(checkRegistrationHours());

    const interval = setInterval(() => {
      setIsRegistrationOpen(checkRegistrationHours());
    }, 60000); // Check every minute

    return () => clearInterval(interval);
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

    // Check if current time is within allowed registration hours (9:00 AM - 4:30 PM)
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    const startTime = 9 * 60; // 9:00 AM in minutes
    const endTime = 16 * 60 + 30; // 4:30 PM in minutes

    if (currentTimeInMinutes < startTime || currentTimeInMinutes >= endTime) {
      setError('Registration is only available between 9:00 AM and 4:30 PM. Please try again during these hours.');
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
          <div className="mb-4 sm:mb-6 p-4 sm:p-6 rounded-lg sm:rounded-xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 border-2 border-primary/40 backdrop-blur-sm animate-pulse-gentle">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex-shrink-0 self-center sm:self-auto">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 uppercase tracking-wide">
                  Registration Currently Closed
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Registration is only available between <span className="text-primary font-semibold whitespace-nowrap">9:00 AM</span> and <span className="text-primary font-semibold whitespace-nowrap">4:30 PM</span>
                </p>
                <p className="text-xs text-muted-foreground/80 mt-1 hidden sm:block">
                  Please return during these hours to complete your registration
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-wide text-white uppercase mb-2">
            Register Here
          </h2>
          <p className="text-sm text-muted-foreground">
            Secure your spot for an unforgettable experience
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-xs font-semibold uppercase tracking-widest text-white/90">
              Full Name
            </Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
              disabled={!isRegistrationOpen}
              className="bg-white/5 border border-white/20 text-white placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-white/90">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={!isRegistrationOpen}
              className="bg-white/5 border border-white/20 text-white placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* College */}
          <div className="space-y-2">
            <Label htmlFor="college" className="text-xs font-semibold uppercase tracking-widest text-white/90">
              College / School
            </Label>
            <Input
              id="college"
              name="college"
              type="text"
              placeholder="Your Institution"
              value={formData.college}
              onChange={handleChange}
              required
              disabled={!isRegistrationOpen}
              className="bg-white/5 border border-white/20 text-white placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-widest text-white/90">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={formData.phone}
              onChange={handlePhoneChange}
              required
              disabled={!isRegistrationOpen}
              className="bg-white/5 border border-white/20 text-white placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive font-medium">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-3">
            <Button
              type="submit"
              disabled={!isRegistrationOpen}
              className="flex-1 btn-gradient text-white font-bold py-3 rounded-lg transition-all uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Register Now
            </Button>
            <Button
              type="button"
              onClick={handleClear}
              disabled={!isRegistrationOpen}
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-lg transition-all uppercase tracking-wider border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground/80 pt-2">
            All registrations are secure and confidential
          </p>
        </form>

        {/* Official Registration Section */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="text-center space-y-4">
            <h2 className="text-md font-semibold tracking-wide text-white uppercase">
              Official <span className="font-orbitron tracking-wide"> <img src="/techletics-logo.png" className="inline-block w-7" /><span className="text-[#c9a55c]">TECH</span>LETICS<span className="text-[#c9a55c]">'26</span></span> - Event Registration Form
            </h2>
            <div className="flex justify-center">
              <a
                href="https://qrfy.io/O0wJlH95eT"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src="/reg_form/off_qr_code.jpeg"
                  alt="Official Registration QR Code"
                  className="w-40 rounded-lg border-2 border-white/20 elegant-shadow-lg cursor-pointer"
                />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              <a
                href="https://qrfy.io/O0wJlH95eT"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors underline"
              >
                Register in the official form
              </a>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
