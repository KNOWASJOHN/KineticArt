'use client';

export default function CertificateSection() {
    return (
        <div className="bg-gradient-to-br from-card/40 via-card/30 to-card/40 backdrop-blur-sm p-6 md:p-8 rounded-xl border-2 border-primary/30 relative overflow-hidden">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 opacity-50" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                {/* Certificate Video */}
                <div className="relative rounded-lg overflow-hidden bg-black/50 border-2 border-primary/30">
                    <video
                        src="/certificate.mp4"
                        poster="certificate.jpg"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto"
                    />
                </div>

                {/* Event Ended Message */}
                <div className="space-y-4 text-center md:text-left">
                    <div>
                        <p className="text-secondary font-semibold text-sm mb-2 uppercase tracking-wider font-mono">
                            Event Concluded
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                            Thank You for <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Participating!</span>
                        </h2>
                    </div>

                    <p className="text-base text-muted-foreground leading-relaxed">
                        The <img src="/kinetic.png" className="inline-block w-28 mx-1 pb-1" alt="Kinetic Art" /> event has successfully concluded on <span className="text-white font-semibold">February 5th, 2026</span>. We appreciate everyone who joined us for this incredible journey into the world of parallel computing and kinetic art.
                    </p>

                    <div className="pt-2 space-y-3">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span className="text-sm font-medium text-white">Certificates will be distributed soon</span>
                        </div>
                    </div>

                    <p className="text-sm text-muted-foreground/80 pt-2">
                        Stay tuned for updates from <a href="https://www.instagram.com/techletics_cce/"><span className="font-orbitron tracking-wide whitespace-nowrap"><img src="/techletics-logo.png" className="inline-block w-7" alt="Techletics" /><span className="text-[#c9a55c]">TECH</span>LETICS<span className="text-[#c9a55c]">'26</span></span></a>
                    </p>

                    {/* Instagram Link */}
                    <div className="pt-4">
                        <a
                            href="https://www.instagram.com/techletics_cce/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30 hover:border-pink-500/50 transition-all group overflow-hidden"
                        >
                            <svg
                                className="w-5 h-5 text-pink-400 group-hover:text-pink-300 transition-colors relative z-10"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                            <span className="text-sm font-medium text-white relative z-10">Follow us on Instagram</span>

                            {/* Light sweep effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none">
                                <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
