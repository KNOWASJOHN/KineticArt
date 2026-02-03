'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FeedbackFormData {
    name: string;
    email: string;
    message: string;
}

export default function FeedbackSection() {
    const [formData, setFormData] = useState<FeedbackFormData>({
        name: '',
        email: '',
        message: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError('');
        setSuccess(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess(false);

        try {
            const { createClient } = await import('@/utils/supabase/client');
            const supabase = createClient();

            const { error: supabaseError } = await supabase
                .from('feedback')
                .insert([
                    {
                        name: formData.name || null,
                        email: formData.email || null,
                        message: formData.message,
                    },
                ]);

            if (supabaseError) throw supabaseError;

            // Reset form and show success
            setFormData({ name: '', email: '', message: '' });
            setSuccess(true);

            // Hide success message after 5 seconds
            setTimeout(() => setSuccess(false), 5000);
        } catch (err: any) {
            setError(err.message || 'Failed to submit feedback. Please try again.');
            console.error('Feedback submission error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-card/30 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl border border-white/10">
            <div
                className="group relative bg-black/50 backdrop-blur-sm rounded-lg border border-primary/20 p-3 sm:p-4 md:p-5 lg:p-6 transition-all duration-500 overflow-hidden hover:border-primary/50 hover:bg-black/70"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Header */}
                <div className="text-center space-y-1.5 sm:space-y-2 mb-4 sm:mb-5">
                    {/* Icon */}
                    <div className="flex justify-center mb-2 sm:mb-3">
                        <svg
                            className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                            />
                        </svg>
                    </div>

                    <p className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider font-mono">
                        Your Opinion Matters
                    </p>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                        Share Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Feedback</span>
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                        Help us improve! Share your thoughts and suggestions about the Kinetic Art Event
                    </p>
                </div>

                {/* Feedback Form */}
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
                    {/* Name (Optional) */}
                    <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest text-white/90">
                            Name <span className="text-muted-foreground text-[10px]">(Optional)</span>
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-white/5 border border-white/20 text-white placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all rounded-lg"
                        />
                    </div>

                    {/* Email (Optional) */}
                    <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-white/90">
                            Email <span className="text-muted-foreground text-[10px]">(Optional)</span>
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-white/5 border border-white/20 text-white placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all rounded-lg"
                        />
                    </div>

                    {/* Message (Required) */}
                    <div className="space-y-1.5">
                        <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-white/90">
                            Your Feedback <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id="message"
                            name="message"
                            placeholder="Share your thoughts, suggestions, or feedback..."
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="bg-white/5 border border-white/20 text-white placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all rounded-lg resize-none"
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-2.5 text-xs sm:text-sm text-destructive font-medium">
                            {error}
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="rounded-lg border border-primary/30 bg-primary/10 p-2.5 text-xs sm:text-sm text-primary font-medium">
                            Thank you for your feedback! We appreciate your input.
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full btn-gradient text-white font-bold py-2.5 sm:py-3 rounded-lg disabled:opacity-50 transition-all uppercase tracking-wider text-sm sm:text-base"
                    >
                        {isLoading ? 'Submitting...' : 'Submit Feedback'}
                    </Button>
                </form>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/0 transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                {/* Light sweep effect */}
                <div className={`absolute inset-0 transition-transform duration-1000 ease-in-out pointer-events-none ${isHovered ? 'translate-x-full' : '-translate-x-full group-hover:translate-x-full'}`}>
                    <div className="h-full w-3/4 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </div>
            </div>
        </div>
    );
}
