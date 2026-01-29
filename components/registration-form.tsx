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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Log submission (in real app, would send to backend)
      console.log('[v0] Form submitted:', formData);

      // Reset form and call success callback
      setFormData({ fullName: '', email: '', college: '', phone: '' });
      onSuccess?.();
    } catch (err) {
      setError('Failed to register. Please try again.');
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
              onChange={handleChange}
              required
              className="bg-white/5 border border-white/20 text-white placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all rounded-lg"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive font-medium">
              {error}
            </div>
          )}

          {/* Register Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full btn-gradient text-white font-bold py-3 rounded-lg disabled:opacity-50 transition-all uppercase tracking-wider"
          >
            {isLoading ? 'Registering...' : 'Register Now'}
          </Button>

          <p className="text-center text-xs text-muted-foreground/80 pt-2">
            All registrations are secure and confidential
          </p>
        </form>
      </div>
    </Card>
  );
}
