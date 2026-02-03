'use client';

import React from "react"

import { useState } from 'react';
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

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    college: '',
    phone: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { createClient } = await import('@/utils/supabase/client');
      const supabase = createClient();

      // Check if email already exists
      const { data: existingUser } = await supabase
        .from('participants')
        .select('id')
        .eq('email', formData.email)
        .maybeSingle();

      if (existingUser) {
        throw new Error('This email is already registered.');
      }

      const { data, error: supabaseError } = await supabase
        .from('participants')
        .insert([
          {
            name: formData.fullName,
            email: formData.email,
            college: formData.college,
            phone: formData.phone,
          },
        ])
        .select()
        .single();

      if (supabaseError) throw supabaseError;

      // Log submission (in real app, would send to backend)
      console.log('[v0] Form submitted:', formData);

      // Send confirmation email
      try {
        const { error: funcError } = await supabase.functions.invoke('send-email', {
          body: {
            id: data.id,
            name: formData.fullName,
            email: formData.email,
            college: formData.college,
          },
        });
        if (funcError) {
          console.error('Failed to send confirmation email:', funcError);
          // We don't block success on email failure, just log it
        }
      } catch (emailErr) {
        console.error('Error invoking email function:', emailErr);
      }

      // Reset form and call success callback
      setFormData({ fullName: '', email: '', college: '', phone: '' });
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'Failed to register. Please try again.');
      console.error('[v0] Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full bg-card/50 elegant-border backdrop-blur-md border-2 elegant-shadow-lg">
      <div className="p-8">
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
              className="bg-white/5 border border-white/20 text-white placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all rounded-lg"
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
              className="bg-white/5 border border-white/20 text-white placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all rounded-lg"
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
              className="bg-white/5 border border-white/20 text-white placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all rounded-lg"
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
              className="bg-white/5 border border-white/20 text-white placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all rounded-lg"
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
              disabled={isLoading}
              className="flex-1 btn-gradient text-white font-bold py-3 rounded-lg disabled:opacity-50 transition-all uppercase tracking-wider"
            >
              {isLoading ? 'Registering...' : 'Register Now'}
            </Button>
            <Button
              type="button"
              onClick={handleClear}
              disabled={isLoading}
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 transition-all uppercase tracking-wider border border-white/20"
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
