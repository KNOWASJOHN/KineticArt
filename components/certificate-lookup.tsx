'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function CertificateLookup() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [emailPrefix, setEmailPrefix] = useState('');

    const handleLookup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // Validate email format
            if (!email.trim()) {
                setError('Please enter your email address');
                setLoading(false);
                return;
            }

            // Extract email prefix (before @gmail.com)
            const prefix = email.toLowerCase().split('@')[0];

            if (!prefix) {
                setError('Invalid email format');
                setLoading(false);
                return;
            }

            // Initialize Supabase client
            const supabase = createClient();

            // Construct the file path in Supabase Storage
            const fileName = `${prefix}.pdf`;

            // Check if file exists by attempting to download
            const { data: fileData, error: downloadError } = await supabase.storage
                .from('certificates')
                .download(fileName);

            if (downloadError || !fileData) {
                setError('Certificate not found. Please check your email address or contact the organizers.');
                setLoading(false);
                return;
            }

            // Create a blob URL for preview
            const blob = new Blob([fileData], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);

            setPreviewUrl(url);
            setEmailPrefix(prefix);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching certificate:', err);
            setError('An error occurred while fetching your certificate. Please try again.');
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (!previewUrl || !emailPrefix) return;

        const link = document.createElement('a');
        link.href = previewUrl;
        link.download = `certificate_${emailPrefix}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setSuccess('Certificate downloaded successfully!');
        setTimeout(() => {
            handleClosePreview();
        }, 2000);
    };

    const handleClosePreview = () => {
        if (previewUrl) {
            window.URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);
        setEmailPrefix('');
        setEmail('');
        setSuccess('');
    };

    return (
        <>
            <div className="bg-gradient-to-br from-card/50 via-card/40 to-card/50 backdrop-blur-md p-8 md:p-10 rounded-2xl border-2 border-primary/20 relative overflow-hidden shadow-2xl">
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-secondary/3 to-primary/3 opacity-60" />

                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                <div className="relative z-10 space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-3">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/30 mb-4">
                            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-secondary font-bold text-xs mb-2 uppercase tracking-widest font-mono">
                                Certificate Portal
                            </p>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
                                Download Your <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">Certificate</span>
                            </h2>
                            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                                Enter your registered email address to preview and download your official certificate of participation.
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLookup} className="space-y-6 max-w-xl mx-auto">
                        <div className="space-y-3">
                            <label htmlFor="certificate-email" className="block text-sm font-bold text-white uppercase tracking-wide">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-sm group-focus-within:blur-md transition-all opacity-0 group-focus-within:opacity-100" />
                                <input
                                    id="certificate-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your.email@gmail.com"
                                    className="relative w-full px-5 py-4 rounded-xl bg-black/60 border-2 border-primary/20 text-white placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:bg-black/80 transition-all text-base"
                                    disabled={loading}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-muted-foreground/60 group-focus-within:text-primary transition-colors"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border-2 border-red-500/30 backdrop-blur-sm animate-in slide-in-from-top-2 duration-300">
                                <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm text-red-300 font-medium">{error}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="relative w-full px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 hover:bg-pos-100 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-pos-0 overflow-hidden group shadow-lg hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {loading ? (
                                    <>
                                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        <span className="tracking-wide">SEARCHING...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span className="tracking-wide">FIND & PREVIEW CERTIFICATE</span>
                                    </>
                                )}
                            </span>

                            {/* Enhanced light sweep effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none">
                                <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                            </div>
                        </button>
                    </form>

                    {/* Info Note */}
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 backdrop-blur-sm max-w-xl mx-auto">
                        <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-sm text-muted-foreground leading-relaxed">
                            <p className="font-semibold text-white mb-1">Important Information</p>
                            <p>Use the same email address you registered with. If you encounter any issues, please contact the event organizers.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Modal */}
            {previewUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative w-full max-w-7xl h-[95vh] sm:h-[90vh] bg-gradient-to-br from-card/95 via-card/90 to-card/95 backdrop-blur-md rounded-lg sm:rounded-2xl border-2 border-primary/30 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-b border-primary/20 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 flex-shrink-0">
                            <div className="flex-1 min-w-0 pr-2">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
                                    Certificate Preview
                                </h3>
                                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1 hidden sm:block">
                                    Review your certificate before downloading
                                </p>
                            </div>
                            <button
                                onClick={handleClosePreview}
                                className="p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors group flex-shrink-0"
                                aria-label="Close preview"
                            >
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* PDF Preview */}
                        <div className="flex-1 overflow-auto bg-black/20 min-h-0">
                            <iframe
                                src={previewUrl}
                                className="w-full h-full min-h-[400px]"
                                title="Certificate Preview"
                            />
                        </div>

                        {/* Footer with Actions */}
                        <div className="p-3 sm:p-4 md:p-6 border-t border-primary/20 bg-gradient-to-r from-card/95 via-card/90 to-card/95 backdrop-blur-md flex-shrink-0">
                            {/* Success Message */}
                            {success && (
                                <div className="flex items-start gap-2 p-2 sm:p-3 rounded-lg bg-green-500/10 border border-green-500/30 mb-3 sm:mb-4">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-xs sm:text-sm text-green-300">{success}</p>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                <button
                                    onClick={handleClosePreview}
                                    className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base text-white bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 transition-all touch-manipulation"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="relative flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-primary to-secondary hover:scale-105 active:scale-95 transition-transform overflow-hidden group touch-manipulation"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span className="hidden xs:inline">Download Certificate</span>
                                        <span className="xs:hidden">Download</span>
                                    </span>

                                    {/* Light sweep effect */}
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none">
                                        <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
